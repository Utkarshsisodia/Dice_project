import React from 'react';

const BottomControlPanel = ({ mode, setMode, twoVals, fourVals }) => {
  const activeBtnStyle = "w-12 h-full bg-[#2f4553] rounded-[3px] text-[#b1bad3] shadow-sm flex justify-center items-center transition-colors";
  const inactiveBtnStyle = "w-12 h-full rounded-[3px] text-[#557086] hover:bg-[#2f4553]/40 flex justify-center items-center transition-colors";
  const inputBaseStyle = "h-[42px] bg-[#0f212e] border border-[#2f4553] rounded-[4px] text-white font-bold text-[14px] px-3 focus:outline-none focus:border-[#557086] hover:border-[#557086] focus:bg-[#1a2c38] transition-colors pointer-events-none";

  const currentVals = mode === 2 ? fourVals : twoVals;

  // --- DYNAMIC MATH CALCULATIONS ---
  let winChance = 0;

  if (mode === 0) {
    // Mode 0 (Roll Between): Green is the area BETWEEN the two thumbs
    winChance = twoVals[1] - twoVals[0];
  } else if (mode === 1) {
    // Mode 1 (Roll Outside): Green is the area OUTSIDE the two thumbs
    winChance = twoVals[0] + (100 - twoVals[1]);
  } else if (mode === 2) {
    // Mode 2 (Roll Between Two): Green is the two separate areas between the 4 thumbs
    winChance = (fourVals[1] - fourVals[0]) + (fourVals[3] - fourVals[2]);
  }

  // Calculate Multiplier based on a 1% house edge (99 / win chance)
  // Ensure we don't divide by zero if the user somehow drags thumbs on top of each other
  const multiplier = winChance > 0 ? (99 / winChance) : 0;

  return (
    <div className="bg-[#1a2c38] px-5 py-4 rounded-lg flex items-end gap-5 shadow-lg border border-[#2f4553]/30">
      
      {/* Mode Switcher Buttons */}
      <div className="flex items-center bg-[#0f212e] rounded-[4px] p-1 h-[42px] gap-1 shadow-inner">
        <button onClick={() => setMode(0)} className={mode === 0 ? activeBtnStyle : inactiveBtnStyle}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current stroke-current" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="6" cy="12" r="1.5" stroke="none" />
            <circle cx="18" cy="12" r="1.5" stroke="none" />
            <line x1="8" y1="12" x2="16" y2="12" fill="none" />
          </svg>
        </button>
        
        <button onClick={() => setMode(1)} className={mode === 1 ? activeBtnStyle : inactiveBtnStyle}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current stroke-current" strokeWidth="1.5" strokeLinecap="round">
            <line x1="2" y1="12" x2="6" y2="12" fill="none" />
            <circle cx="8" cy="12" r="1.5" stroke="none" />
            <circle cx="16" cy="12" r="1.5" stroke="none" />
            <line x1="18" y1="12" x2="22" y2="12" fill="none" />
          </svg>
        </button>
        
        <button onClick={() => setMode(2)} className={mode === 2 ? activeBtnStyle : inactiveBtnStyle}>
          <svg viewBox="0 0 32 24" className="w-8 h-6 fill-current stroke-current" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="4" cy="12" r="1.5" stroke="none" />
            <circle cx="12" cy="12" r="1.5" stroke="none" />
            <circle cx="20" cy="12" r="1.5" stroke="none" />
            <circle cx="28" cy="12" r="1.5" stroke="none" />
            <line x1="6" y1="12" x2="10" y2="12" fill="none" />
            <line x1="22" y1="12" x2="26" y2="12" fill="none" />
          </svg>
        </button>
      </div>

      {/* Dynamic Inputs Section */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#b1bad3] text-[13px] font-bold tracking-wide">
          {mode === 0 && "Roll Between"}
          {mode === 1 && "Roll Outside"}
          {mode === 2 && "Roll Between Two"}
        </label>
        
        <div className="flex items-center gap-2">
          {(mode === 0 || mode === 1) && (
            <>
              <input readOnly value={currentVals[0].toFixed(2)} className={`${inputBaseStyle} w-[94px]`} />
              <span className="text-[#8b9cb6] font-bold text-sm">&</span>
              <input readOnly value={currentVals[1].toFixed(2)} className={`${inputBaseStyle} w-[94px]`} />
            </>
          )}

          {mode === 2 && (
            <>
              <input readOnly value={currentVals[0].toFixed(2)} className={`${inputBaseStyle} w-[74px]`} />
              <span className="text-[#8b9cb6] font-bold text-sm">&</span>
              <input readOnly value={currentVals[1].toFixed(2)} className={`${inputBaseStyle} w-[74px]`} />
              <div className="w-1" />
              <input readOnly value={currentVals[2].toFixed(2)} className={`${inputBaseStyle} w-[74px]`} />
              <span className="text-[#8b9cb6] font-bold text-sm">&</span>
              <input readOnly value={currentVals[3].toFixed(2)} className={`${inputBaseStyle} w-[74px]`} />
            </>
          )}
        </div>
      </div>

      {/* DYNAMIC Multiplier */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#b1bad3] text-[13px] font-bold tracking-wide">Multiplier</label>
        <div className="relative w-[114px]">
          {/* Changed to dynamically render the multiplier rounded to 4 decimal places */}
          <input readOnly value={multiplier.toFixed(4)} className={`${inputBaseStyle} w-full pl-3 pr-8`} />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b1bad3] font-bold text-[15px] pointer-events-none">×</span>
        </div>
      </div>

      {/* DYNAMIC Win Chance */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#b1bad3] text-[13px] font-bold tracking-wide">Win Chance</label>
        <div className="relative w-[114px]">
          {/* Changed to dynamically render the win chance rounded to 4 decimal places */}
          <input readOnly value={winChance.toFixed(4)} className={`${inputBaseStyle} w-full pl-3 pr-8`} />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b1bad3] font-bold text-[14px] pointer-events-none">%</span>
        </div>
      </div>

    </div>
  );
};

export default BottomControlPanel;