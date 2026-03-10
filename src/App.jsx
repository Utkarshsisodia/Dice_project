import "./App.css";
import React, { useState } from "react";
import DualRangeSlider from "./components/DualRangeSlider";
import OppositeDualRangeSlider from "./components/OppositeDualRangeSlider";
import MultiRangeSlider from "./components/MultiRangeSlider";
import BottomControlPanel from "./components/BottomControlPanel";
import PrimeDiceSidebar from "./components/PrimeDiceSidebar";

const App = () => {
  // 0: DualRange, 1: OppositeDualRange, 2: MultiRange
  const [mode, setMode] = useState(0);

  // Store the values here so both the sliders and the control panel share the exact same data
  const [twoVals, setTwoVals] = useState([25, 75]);
  const [fourVals, setFourVals] = useState([12, 37, 62, 87]);

  // NEW: State to store the result of the dice roll
  const [lastRoll, setLastRoll] = useState(null);

  // NEW: Function to generate a random roll from 0.00 to 100.00
  const handleBet = () => {
    // Generate a random number between 0 and 100 with 2 decimal places
    const roll = (Math.random() * 100).toFixed(2);
    setLastRoll(parseFloat(roll));
  };

  return (
    <div className="flex justify-center min-h-screen bg-[#0f212e] p-8 gap-5">
      <PrimeDiceSidebar onBet={handleBet}/>
      <div className=" flex flex-col items-center justify-around pt-35">
        {/* Conditionally render the correct slider based on the current mode */}
        <div className="w-full max-w-3xl ml-5">
          {mode === 0 && (
            <DualRangeSlider vals={twoVals} setVals={setTwoVals} lastRoll={lastRoll}/>
          )}

          {mode === 1 && (
            <OppositeDualRangeSlider vals={twoVals} setVals={setTwoVals} lastRoll={lastRoll}/>
          )}

          {mode === 2 && (
            <MultiRangeSlider vals={fourVals} setVals={setFourVals} lastRoll={lastRoll}/>
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
    </div>
  );
};

export default App;
