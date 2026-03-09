import "./App.css";
import React, { useState } from 'react';
import DualRangeSlider from './components/DualRangeSlider';
import OppositeDualRangeSlider from './components/OppositeDualRangeSlider';
import MultiRangeSlider from './components/MultiRangeSlider';
import BottomControlPanel from './components/BottomControlPanel';
import PrimeDiceSidebar from './components/PrimeDiceSidebar';

const App = () => {
  const [mode, setMode] = useState(0); 
  const [twoVals, setTwoVals] = useState([25, 75]);
  const [fourVals, setFourVals] = useState([12, 37, 62, 87]);

  const [lastRoll, setLastRoll] = useState(null);

  const handleBet = () => {
    const roll = (Math.random() * 100).toFixed(2);
    setLastRoll(parseFloat(roll));
  };

  return (
    <div className="flex min-h-screen bg-[#0f212e] font-sans">
      
      <div className="shrink-0 z-10 border-r border-[#1a2c38]">
        <PrimeDiceSidebar onBet={handleBet} /> 
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-10">
        
        <div className="w-full max-w-4xl relative">
          {mode === 0 && (
            <DualRangeSlider vals={twoVals} setVals={setTwoVals} lastRoll={lastRoll} />
          )}
          
          {/* Removed the broken comments here! */}
          {mode === 1 && (
            <OppositeDualRangeSlider vals={twoVals} setVals={setTwoVals} />
          )}
          
          {mode === 2 && (
            <MultiRangeSlider vals={fourVals} setVals={setFourVals} />
          )}
        </div>

        <BottomControlPanel 
          mode={mode} 
          setMode={setMode} 
          twoVals={twoVals}
          fourVals={fourVals}
        />

      </div>
    </div>
  );
};

export default App;