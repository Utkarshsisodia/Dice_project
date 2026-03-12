import React from "react";

const BottomControlPanel = ({ mode, setMode, twoVals, fourVals }) => {
  const activeBtnStyle =
    "flex-1 md:w-14 h-full bg-[#2f4553] rounded-[3px] text-[#b1bad3] shadow-sm flex justify-center items-center transition-colors";
  const inactiveBtnStyle =
    "flex-1 md:w-14 h-full rounded-[3px] text-[#557086] hover:bg-[#2f4553]/40 flex justify-center items-center transition-colors";
  const inputBaseStyle =
    "h-[42px] bg-[#0f212e] border border-[#2f4553] rounded-[4px] text-white font-bold text-[14px] px-2 focus:outline-none focus:border-[#557086] hover:border-[#557086] focus:bg-[#1a2c38] transition-colors pointer-events-none min-w-0";

  const currentVals = mode === 2 ? fourVals : twoVals;

  let winChance = 0;
  if (mode === 0) winChance = twoVals[1] - twoVals[0];
  else if (mode === 1) winChance = twoVals[0] + (100 - twoVals[1]);
  else if (mode === 2)
    winChance = fourVals[1] - fourVals[0] + (fourVals[3] - fourVals[2]);

  const multiplier = winChance > 0 ? 99 / winChance : 0;

  return (
    <div className="w-full bg-[#1a2c38] px-4 py-4 md:px-6 rounded-lg flex flex-col md:flex-row flex-wrap xl:flex-nowrap items-stretch md:items-end justify-between gap-4 md:gap-5 shadow-lg border border-[#2f4553]/30 box-border">
      <div className="flex items-center bg-[#0f212e] rounded-[4px] p-1 h-[42px] gap-1 shadow-inner w-full md:w-auto shrink-0">
        <button
          onClick={() => setMode(0)}
          className={mode === 0 ? activeBtnStyle : inactiveBtnStyle}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 md:w-6 md:h-6 fill-current stroke-current"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <circle cx="6" cy="12" r="1.5" stroke="none" />
            <circle cx="18" cy="12" r="1.5" stroke="none" />
            <line x1="8" y1="12" x2="16" y2="12" fill="none" />
          </svg>
        </button>
        <button
          onClick={() => setMode(1)}
          className={mode === 1 ? activeBtnStyle : inactiveBtnStyle}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 md:w-6 md:h-6 fill-current stroke-current"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="2" y1="12" x2="6" y2="12" fill="none" />
            <circle cx="8" cy="12" r="1.5" stroke="none" />
            <circle cx="16" cy="12" r="1.5" stroke="none" />
            <line x1="18" y1="12" x2="22" y2="12" fill="none" />
          </svg>
        </button>
        <button
          onClick={() => setMode(2)}
          className={mode === 2 ? activeBtnStyle : inactiveBtnStyle}
        >
          <svg
            viewBox="0 0 32 24"
            className="w-7 h-5 md:w-8 md:h-6 fill-current stroke-current"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <circle cx="4" cy="12" r="1.5" stroke="none" />
            <circle cx="12" cy="12" r="1.5" stroke="none" />
            <circle cx="20" cy="12" r="1.5" stroke="none" />
            <circle cx="28" cy="12" r="1.5" stroke="none" />
            <line x1="6" y1="12" x2="10" y2="12" fill="none" />
            <line x1="22" y1="12" x2="26" y2="12" fill="none" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-1.5 flex-1 w-full md:w-auto min-w-[200px]">
        <label className="text-[#b1bad3] text-[13px] font-bold tracking-wide hidden md:block">
          {mode === 0 && "Roll Between"}
          {mode === 1 && "Roll Outside"}
          {mode === 2 && "Roll Between Two"}
        </label>

        <div className="flex items-center gap-2 w-full">
          {(mode === 0 || mode === 1) && (
            <>
              <input
                readOnly
                value={currentVals[0].toFixed(2)}
                className={`${inputBaseStyle} flex-1 w-full text-center`}
              />
              <span className="text-[#8b9cb6] font-bold text-sm shrink-0">
                &
              </span>
              <input
                readOnly
                value={currentVals[1].toFixed(2)}
                className={`${inputBaseStyle} flex-1 w-full text-center`}
              />
            </>
          )}

          {mode === 2 && (
            <>
              <input
                readOnly
                value={currentVals[0].toFixed(2)}
                className={`${inputBaseStyle} flex-1 w-full text-center px-1 text-[13px]`}
              />
              <span className="text-[#8b9cb6] font-bold text-sm shrink-0">
                &
              </span>
              <input
                readOnly
                value={currentVals[1].toFixed(2)}
                className={`${inputBaseStyle} flex-1 w-full text-center px-1 text-[13px]`}
              />
              <div className="hidden sm:block w-1 shrink-0" />
              <input
                readOnly
                value={currentVals[2].toFixed(2)}
                className={`${inputBaseStyle} flex-1 w-full text-center px-1 text-[13px]`}
              />
              <span className="text-[#8b9cb6] font-bold text-sm shrink-0">
                &
              </span>
              <input
                readOnly
                value={currentVals[3].toFixed(2)}
                className={`${inputBaseStyle} flex-1 w-full text-center px-1 text-[13px]`}
              />
            </>
          )}
        </div>
      </div>

      <div className="flex w-full md:w-auto gap-3 shrink-0">
        <div className="flex flex-col gap-1.5 flex-1 md:w-[120px]">
          <label className="text-[#b1bad3] text-[13px] font-bold tracking-wide">
            Multiplier
          </label>
          <div className="relative w-full">
            <input
              readOnly
              value={multiplier.toFixed(4)}
              className={`${inputBaseStyle} w-full pl-2 pr-6 text-left`}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#b1bad3] font-bold text-[14px] pointer-events-none">
              ×
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-1 md:w-[120px]">
          <label className="text-[#b1bad3] text-[13px] font-bold tracking-wide">
            Win Chance
          </label>
          <div className="relative w-full">
            <input
              readOnly
              value={winChance.toFixed(4)}
              className={`${inputBaseStyle} w-full pl-2 pr-6 text-left`}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#b1bad3] font-bold text-[13px] pointer-events-none">
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomControlPanel;
