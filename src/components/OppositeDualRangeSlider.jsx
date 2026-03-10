import React, { useState, useRef, useEffect, useCallback } from 'react';
import DiceMarker from './DiceMarker';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const OppositeDualRangeSlider = ({ vals, setVals, lastRoll }) => {
  const minVal = vals[0];
  const maxVal = vals[1];
  
  const trackRef = useRef(null);
  const audioCtxRef = useRef(null);
  const diceRef = useRef(null);
  const [dragging, setDragging] = useState(null);

  const marks = [0, 25, 50, 75, 100];
  const step = 1; 
  const MIN_LIMIT = 2;
  const MAX_LIMIT = 100;

  const playTickSound = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(3500, ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.03); 

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {
      console.error("Audio playback failed:", e);
    }
  }, []);

  const handlePointerMove = useCallback(
    (e) => {
      if (!dragging || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      let rawPercent = ((e.clientX - rect.left) / rect.width) * 100;
      let percent = Math.round(rawPercent / step) * step;
      percent = Math.max(MIN_LIMIT, Math.min(MAX_LIMIT, percent));

      if (dragging === 'left') {
        const newVal = Math.min(percent, maxVal);
        if (newVal !== minVal) {
          setVals([newVal, maxVal]);
          playTickSound();
        }
      } else if (dragging === 'right') {
        const newVal = Math.max(percent, minVal);
        if (newVal !== maxVal) {
          setVals([minVal, newVal]);
          playTickSound();
        }
      }
    },
    // FIXED Dependency Array
    [dragging, minVal, maxVal, setVals, step, playTickSound]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    } else {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragging, handlePointerMove, handlePointerUp]);

  const isWin = lastRoll !== null && (lastRoll <= minVal || lastRoll >= maxVal);
  return (
    <div className="w-full relative mt-10 touch-none select-none">
      {/* CSS For the Sober Fade Animation */}
      <style>{`
        .dice-fade-enter {
          opacity: 0;
        }
        .dice-fade-enter-active {
          opacity: 1;
          transition: opacity 250ms ease-out;
        }
        .dice-fade-exit {
          opacity: 1;
        }
        .dice-fade-exit-active {
          opacity: 0;
          transition: opacity 200ms ease-in;
        }
      `}</style>
      <div className="relative w-full h-[44px] bg-[#2f4553] rounded-full shadow-sm">
        <div className="absolute inset-y-0 left-[22px] right-[22px]">
          
          <div className="absolute top-[12px] bottom-[12px] left-[-6px] right-[-6px] bg-[#0f212e] rounded-full shadow-inner"></div>

          <div className="absolute top-0 left-0 w-full pointer-events-none">
            {marks.map((mark) => (
              <div key={mark} className="absolute top-0 -translate-x-1/2" style={{ left: `${mark}%` }}>
                <span className="absolute bottom-[14px] left-1/2 -translate-x-1/2 text-white font-bold text-sm tracking-wide">
                  {mark}
                </span>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent border-b-[#2f4553]"></div>
              </div>
            ))}
          </div>

          <div ref={trackRef} className="absolute top-[18px] left-0 right-0 h-[8px] rounded-full">
            
            {/* Green Base Line */}
            <div className="absolute inset-0 bg-[#00e701] rounded-full shadow-sm"></div>

            {/* Red Active Range Line */}
            <div
              className="absolute top-0 bottom-0 bg-[#e9113c] shadow-sm"
              style={{
                left: `${minVal}%`,
                width: `${maxVal - minVal}%`,
              }}
            ></div>

            <TransitionGroup component={null}>
              {lastRoll !== null && (
                <CSSTransition 
                  key={lastRoll} 
                  nodeRef={diceRef} 
                  timeout={250} 
                  classNames="dice-fade"
                  unmountOnExit /* ADDED: This cleans up the DOM after fading out */
                >
                  <div ref={diceRef} className="absolute inset-0 pointer-events-none z-40">
                    <DiceMarker lastRoll={lastRoll} isWin={isWin} />
                  </div>
                </CSSTransition>
              )}
            </TransitionGroup>

            {/* Left Thumb (Points Right) */}
            <div
              onPointerDown={(e) => { e.stopPropagation(); setDragging('left'); }}
              className={`group absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[34px] h-[34px] bg-[#5185ea] rounded-md flex justify-center items-center cursor-pointer z-20 shadow-lg transition duration-75 ${dragging === 'left' ? 'brightness-110 scale-105' : 'hover:brightness-110'}`}
              style={{ left: `${minVal}%` }}
            >
              <div className={`absolute bottom-[85px] left-1/2 -translate-x-1/2 bg-[#364c59] px-3 py-1.5 rounded text-sm font-bold text-white shadow-xl pointer-events-none transition-all duration-200 ease-out z-30 ${dragging === 'left' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                {minVal.toFixed(2)}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-[#364c59]"></div>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" className="translate-x-[1px]">
                <polygon points="8,4 18,12 8,20" fill="white" />
              </svg>
            </div>

            {/* Right Thumb (Points Left) */}
            <div
              onPointerDown={(e) => { e.stopPropagation(); setDragging('right'); }}
              className={`group absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[34px] h-[34px] bg-[#5185ea] rounded-md flex justify-center items-center cursor-pointer z-20 shadow-lg transition duration-75 ${dragging === 'right' ? 'brightness-110 scale-105' : 'hover:brightness-110'}`}
              style={{ left: `${maxVal}%` }}
            >
              <div className={`absolute bottom-[85px] left-1/2 -translate-x-1/2 bg-[#364c59] px-3 py-1.5 rounded text-sm font-bold text-white shadow-xl pointer-events-none transition-all duration-200 ease-out z-30 ${dragging === 'right' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                {maxVal.toFixed(2)}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-[#364c59]"></div>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" className="translate-x-[-1px]">
                <polygon points="16,4 6,12 16,20" fill="white" />
              </svg>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OppositeDualRangeSlider;