import React, { useState, useRef, useEffect, useCallback } from 'react';

const MultiRangeSlider = ({ vals, setVals, lastRoll }) => {
  const trackRef = useRef(null);
  const audioCtxRef = useRef(null);
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
      if (dragging === null || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      let rawPercent = ((e.clientX - rect.left) / rect.width) * 100;
      let percent = Math.round(rawPercent / step) * step;
      percent = Math.max(MIN_LIMIT, Math.min(MAX_LIMIT, percent));

      // Handle dragging logic for all 4 thumbs preventing overlaps
      let newVals = [...vals];
      if (dragging === 0) newVals[0] = Math.min(percent, newVals[1]);
      if (dragging === 1) newVals[1] = Math.max(newVals[0], Math.min(percent, newVals[2]));
      if (dragging === 2) newVals[2] = Math.max(newVals[1], Math.min(percent, newVals[3]));
      if (dragging === 3) newVals[3] = Math.max(newVals[2], Math.min(percent, MAX_LIMIT));

      if (newVals[dragging] !== vals[dragging]) {
        setVals(newVals);
        playTickSound();
      }
    },
    // FIXED Dependency Array
    [dragging, vals, setVals, step, playTickSound]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    if (dragging !== null) {
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

  const isWin = lastRoll !== null && (
    (lastRoll >= vals[0] && lastRoll <= vals[1]) || 
    (lastRoll >= vals[2] && lastRoll <= vals[3])
  );

  return (
    <div className="w-full relative mt-10 touch-none select-none">
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
            
            {/* Red Base Line */}
            <div className="absolute inset-0 bg-[#e9113c] rounded-full shadow-sm"></div>

            {/* Green Segment 1 */}
            <div
              className="absolute top-0 bottom-0 bg-[#00e701] shadow-sm"
              style={{
                left: `${vals[0]}%`,
                width: `${vals[1] - vals[0]}%`,
              }}
            ></div>

            {/* Green Segment 2 */}
            <div
              className="absolute top-0 bottom-0 bg-[#00e701] shadow-sm"
              style={{
                left: `${vals[2]}%`,
                width: `${vals[3] - vals[2]}%`,
              }}
            ></div>

            {lastRoll !== null && (
              <div 
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none transition-all duration-300 ease-out animate-in zoom-in-50"
                style={{ left: `${lastRoll}%` }}
              >
                <div 
                  className={`
                    px-2.5 py-1.5 rounded-md text-[13px] font-black shadow-xl border-x border-t border-b-[3px] 
                    ${isWin 
                      ? 'bg-[#00e701] border-b-[#00b801] border-t-[#33ff34] border-x-[#00d001] text-[#0f212e]' 
                      : 'bg-[#e9113c] border-b-[#b80020] border-t-[#ff4d6a] border-x-[#d00018] text-white'
                    }
                  `}
                >
                  {lastRoll.toFixed(2)}
                </div>
                <div className={`w-0 h-0 mb-14 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent ${isWin ? 'border-t-[#00b801]' : 'border-t-[#b80020]'}`}></div>
              </div>
            )}

            {/* Map over the 4 values to render thumbs dynamically */}
            {vals.map((val, index) => {
              const isLeftPointer = index % 2 === 0;

              return (
                <div
                  key={index}
                  onPointerDown={(e) => { e.stopPropagation(); setDragging(index); }}
                  className={`group absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[34px] h-[34px] bg-[#5185ea] rounded-md flex justify-center items-center cursor-pointer z-20 shadow-lg transition duration-75 ${dragging === index ? 'brightness-110 scale-105' : 'hover:brightness-110'}`}
                  style={{ left: `${val}%` }}
                >
                  <div className={`absolute bottom-[85px] left-1/2 -translate-x-1/2 bg-[#364c59] px-3 py-1.5 rounded text-sm font-bold text-white shadow-xl pointer-events-none transition-all duration-200 ease-out z-30 ${dragging === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                    {val.toFixed(2)}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-[#364c59]"></div>
                  </div>

                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    className={isLeftPointer ? "translate-x-[-1px]" : "translate-x-[1px]"}
                  >
                    <polygon 
                      points={isLeftPointer ? "16,4 6,12 16,20" : "8,4 18,12 8,20"} 
                      fill="white" 
                    />
                  </svg>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;