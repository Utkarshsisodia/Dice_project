import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import DualRangeSlider from "./components/DualRangeSlider";
import OppositeDualRangeSlider from "./components/OppositeDualRangeSlider";
import MultiRangeSlider from "./components/MultiRangeSlider";
import BottomControlPanel from "./components/BottomControlPanel";
import PrimeDiceSidebar from "./components/PrimeDiceSidebar";

const App = () => {
  // 0: DualRange, 1: OppositeDualRange, 2: MultiRange
  const [mode, setMode] = useState(0);

  // Central state for all slider values
  const [twoVals, setTwoVals] = useState([25, 75]);
  const [fourVals, setFourVals] = useState([12, 37, 62, 87]);

  // State to store the result of the dice roll
  const [lastRoll, setLastRoll] = useState(null);

  // --- AUDIO SETUP WITH ACTUAL SOUND FILES ---
  // Using refs pre-loads the audio so it plays instantly when called
  const rollAudioRef = useRef(null);
  const winAudioRef = useRef(null);
  const betClickAudioRef = useRef(null);
  const spinTickAudioRef = useRef(null);

  // Load the actual sound files on mount
  useEffect(() => {
    // These paths look inside your public/ folder automatically
    rollAudioRef.current = new Audio("/sounds/roll.mp3");
    winAudioRef.current = new Audio("/sounds/win.mp3");
    betClickAudioRef.current = new Audio("/sounds/bet.mp3");
    spinTickAudioRef.current = new Audio("/sounds/tick.mp3");

    // Optional volume adjustments (0.0 to 1.0)
    if (spinTickAudioRef.current) spinTickAudioRef.current.volume = 0.5;
    if (winAudioRef.current) winAudioRef.current.volume = 0.7;
    
  }, []);

  const handleBet = () => {
    // 1. SOUND: Immediate "Bet" button click sound
    if (betClickAudioRef.current) {
      betClickAudioRef.current.currentTime = 0; // Reset to start just in case
      betClickAudioRef.current.play().catch(e => console.log("Audio play blocked:", e));
    }

    // 2. Hide previous result to make the dice "spin"
    setLastRoll(null);

    // 3. SOUND: Create the rapid-fire "slot machine spinning" tick sequence
    // This loop plays 5 ticks in very rapid succession.
    for (let i = 0; i < 5; i++) {
      if (spinTickAudioRef.current) {
        setTimeout(() => {
          spinTickAudioRef.current.currentTime = 0;
          spinTickAudioRef.current.play().catch(e => console.log("Audio play blocked:", e));
        }, i * 70); // 70ms spacing gives a fast mechanical clatter
      }
    }

    // 4. Set a delay matching the spinning animation/sounds
    // This 350ms delay perfectly matches the 5 ticks at 70ms spacing.
    setTimeout(() => {
      // Generate a random number between 0 and 100 with 2 decimal places
      const rollStr = (Math.random() * 100).toFixed(2);
      const roll = parseFloat(rollStr);
      setLastRoll(roll);

      // Determine if the roll is a Win based on the current mode
      let isWin = false;
      if (mode === 0) {
        // Roll Between
        isWin = roll >= twoVals[0] && roll <= twoVals[1];
      } else if (mode === 1) {
        // Roll Outside
        isWin = roll <= twoVals[0] || roll >= twoVals[1];
      } else if (mode === 2) {
        // Multi-Range
        isWin = (roll >= fourVals[0] && roll <= fourVals[1]) || (roll >= fourVals[2] && roll <= fourVals[3]);
      }

      // 5. SOUND: satisfying "TING!" bell sound if they won
      if (isWin && winAudioRef.current) {
        winAudioRef.current.currentTime = 0;
        winAudioRef.current.play().catch(e => console.log("Audio play blocked:", e));
      }
    }, 350); 
  };

  return (
    <div className="flex justify-center min-h-screen bg-[#0f212e] p-8 gap-5">
      <PrimeDiceSidebar onBet={handleBet}/>
      <div className="flex flex-col items-center justify-around pt-35">
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