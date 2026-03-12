import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import DualRangeSlider from "./components/DualRangeSlider";
import OppositeDualRangeSlider from "./components/OppositeDualRangeSlider";
import MultiRangeSlider from "./components/MultiRangeSlider";
import BottomControlPanel from "./components/BottomControlPanel";
import PrimeDiceSidebar from "./components/PrimeDiceSidebar";

const App = () => {
  const [mode, setMode] = useState(0);
  const [twoVals, setTwoVals] = useState([25, 75]);
  const [fourVals, setFourVals] = useState([12, 37, 62, 87]);
  const [lastRoll, setLastRoll] = useState(null);

  const rollAudioRef = useRef(null);
  const winAudioRef = useRef(null);
  const betClickAudioRef = useRef(null);
  const spinTickAudioRef = useRef(null);

  useEffect(() => {
    rollAudioRef.current = new Audio("/sounds/roll.mp3");
    winAudioRef.current = new Audio("/sounds/win.mp3");
    betClickAudioRef.current = new Audio("/sounds/bet.mp3");
    spinTickAudioRef.current = new Audio("/sounds/tick.mp3");

    if (spinTickAudioRef.current) spinTickAudioRef.current.volume = 0.5;
    if (winAudioRef.current) winAudioRef.current.volume = 0.7;
  }, []);

  const handleBet = () => {
    if (betClickAudioRef.current) {
      betClickAudioRef.current.currentTime = 0;
      betClickAudioRef.current
        .play()
        .catch((e) => console.log("Audio play blocked:", e));
    }
    setLastRoll(null);

    for (let i = 0; i < 5; i++) {
      if (spinTickAudioRef.current) {
        setTimeout(() => {
          spinTickAudioRef.current.currentTime = 0;
          spinTickAudioRef.current
            .play()
            .catch((e) => console.log("Audio play blocked:", e));
        }, i * 70);
      }
    }

    setTimeout(() => {
      const rollStr = (Math.random() * 100).toFixed(2);
      const roll = parseFloat(rollStr);
      setLastRoll(roll);

      let isWin = false;
      if (mode === 0) {
        isWin = roll >= twoVals[0] && roll <= twoVals[1];
      } else if (mode === 1) {
        isWin = roll <= twoVals[0] || roll >= twoVals[1];
      } else if (mode === 2) {
        isWin =
          (roll >= fourVals[0] && roll <= fourVals[1]) ||
          (roll >= fourVals[2] && roll <= fourVals[3]);
      }

      if (isWin && winAudioRef.current) {
        winAudioRef.current.currentTime = 0;
        winAudioRef.current
          .play()
          .catch((e) => console.log("Audio play blocked:", e));
      }
    }, 350);
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-[#0f212e] p-4 sm:p-6 xl:p-10 w-full overflow-x-hidden box-border">
      <div className="flex flex-col xl:flex-row items-stretch w-full max-w-[1250px] gap-6 xl:gap-8">
        <div className="w-full xl:w-[320px] shrink-0 order-2 xl:order-1">
          <PrimeDiceSidebar onBet={handleBet} />
        </div>

        <div className="flex-1 flex flex-col w-full order-1 xl:order-2">
          <div className="flex-1 flex flex-col justify-center items-center w-full px-4 sm:px-8 xl:px-12 min-h-[350px] xl:min-h-[500px]">
            <div className="w-full">
              {mode === 0 && (
                <DualRangeSlider
                  vals={twoVals}
                  setVals={setTwoVals}
                  lastRoll={lastRoll}
                />
              )}
              {mode === 1 && (
                <OppositeDualRangeSlider
                  vals={twoVals}
                  setVals={setTwoVals}
                  lastRoll={lastRoll}
                />
              )}
              {mode === 2 && (
                <MultiRangeSlider
                  vals={fourVals}
                  setVals={setFourVals}
                  lastRoll={lastRoll}
                />
              )}
            </div>
          </div>

          <div className="w-full mt-6 xl:mt-8">
            <BottomControlPanel
              mode={mode}
              setMode={setMode}
              twoVals={twoVals}
              fourVals={fourVals}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
