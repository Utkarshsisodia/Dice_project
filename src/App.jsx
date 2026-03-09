import "./App.css";
import React, { useState } from 'react';
import DualRangeSlider from './components/DualRangeSlider';
import OppositeDualRangeSlider from './components/OppositeDualRangeSlider';
import MultiRangeSlider from './components/MultiRangeSlider';
import BottomControlPanel from './components/BottomControlPanel';

const App = () => {
  // 0: DualRange, 1: OppositeDualRange, 2: MultiRange
  const [mode, setMode] = useState(0); 

  // Store the values here so both the sliders and the control panel share the exact same data
  const [twoVals, setTwoVals] = useState([25, 75]);
  const [fourVals, setFourVals] = useState([12, 37, 62, 87]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f212e] p-8 font-sans gap-10">
      
      {/* Conditionally render the correct slider based on the current mode */}
      <div className="w-full max-w-4xl">
        {mode === 0 && (
          <DualRangeSlider vals={twoVals} setVals={setTwoVals} />
        )}
        
        {mode === 1 && (
          <OppositeDualRangeSlider vals={twoVals} setVals={setTwoVals} />
        )}
        
        {mode === 2 && (
          <MultiRangeSlider vals={fourVals} setVals={setFourVals} />
        )}
      </div>

      {/* The Control Panel always stays on screen, but updates its UI based on the mode */}
      <BottomControlPanel 
        mode={mode} 
        setMode={setMode} 
        twoVals={twoVals}
        fourVals={fourVals}
      />

    </div>
  );
};

export default App;