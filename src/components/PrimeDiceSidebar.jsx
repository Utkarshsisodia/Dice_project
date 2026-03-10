import React from "react";

const PrimeDiceSidebar = ({ onBet }) => {
  return (
    // Sidebar Container
    <div className="w-[300px] bg-[#1a2c38] p-4 flex flex-col gap-5 font-sans select-none rounded-lg shadow-lg border border-[#2f4553]/30">
      {/* Top Toggle: Manual / Auto / Script */}
      <div className="bg-[#0f212e] p-1 rounded-full flex items-center h-[46px] shadow-inner">
        <button className="flex-1 h-full bg-[#2f4553] text-white font-bold text-[14px] rounded-full shadow-sm transition-colors">
          Manual
        </button>
        <button className="flex-1 h-full text-[#b1bad3] font-bold text-[14px] hover:text-white transition-colors">
          Auto
        </button>
        <button className="w-[46px] h-full flex items-center justify-center text-[#b1bad3] hover:text-white transition-colors">
          {/* Custom Strategy/Script Icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-transparent stroke-current stroke-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19l8-8 3 3 5-5" />
            <path d="M16 9h4v4" />
          </svg>
        </button>
      </div>

      {/* Bet Amount Section */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center px-1">
          <label className="text-[#b1bad3] text-[13px] font-bold tracking-wide">
            Bet Amount
          </label>
          <span className="text-[#b1bad3] text-[13px] font-bold tracking-wide">
            $0.00
          </span>
        </div>

        {/* Outer Wrapper for Input + Quick Actions */}
        <div className="flex h-[42px] bg-[#2f4553] p-[2px] rounded-[4px] border border-transparent focus-within:border-[#557086] transition-colors">
          {/* Inner Input Area */}
          <div className="flex-1 flex items-center bg-[#0f212e] px-3 rounded-l-[3px] gap-2">
            <input
              type="number"
              defaultValue="0.00000000"
              className="bg-transparent text-white font-bold text-[14px] w-full outline-none"
            />
            {/* Bitcoin Icon */}
            <div className="w-[18px] h-[18px] bg-[#f7931a] rounded-full flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] fill-white">
                <path d="M14.017 10.66c1.29-0.428 2.227-1.343 2.227-2.903 0-2.333-1.854-3.153-4.48-3.153h-3.84v-2.618h-1.921v2.618h-1.28v1.921h1.28v10.47h-1.28v1.921h1.28v2.618h1.921v-2.618h4.48c2.81 0 4.8-1.047 4.8-3.674 0-2.113-1.442-3.152-3.2-3.582zm-2.497-3.152h-1.92v-2.56h1.92c1.28 0 1.92 0.64 1.92 1.28 0 0.638-0.64 1.28-1.92 1.28zm0.64 7.68h-2.56v-3.2h2.56c1.6 0 2.24 0.64 2.24 1.6 0 0.96-0.64 1.6-2.24 1.6z" />
              </svg>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center">
            <button className="px-3 h-full text-[#b1bad3] font-bold text-[14px] hover:bg-[#1a2c38] transition-colors border-r border-[#1a2c38] flex items-center justify-center">
              ½
            </button>
            <button className="px-3 h-full text-[#b1bad3] font-bold text-[14px] hover:bg-[#1a2c38] rounded-r-[3px] transition-colors flex items-center justify-center">
              2×
            </button>
          </div>
        </div>
      </div>

      {/* Main Bet Button */}
      <button onClick={onBet} className="w-full h-[50px] bg-[#1e81ff] hover:bg-[#4ea0ff] active:scale-[0.98] rounded-[4px] text-white font-bold text-[15px] tracking-wide transition-all mt-1">
        Bet
      </button>

      {/* Profit on Win Section */}
      <div className="flex flex-col gap-1.5 mt-1">
        <div className="flex justify-between items-center px-1">
          <label className="text-[#b1bad3] text-[13px] font-bold tracking-wide">
            Profit on Win
          </label>
          <span className="text-[#b1bad3] text-[13px] font-bold tracking-wide">
            $0.00
          </span>
        </div>

        <div className="flex items-center bg-[#0f212e] h-[42px] px-3 rounded-[4px] border border-[#2f4553] gap-2">
          <input
            type="text"
            readOnly
            defaultValue="0.00000000"
            className="bg-transparent text-white font-bold text-[14px] w-full outline-none pointer-events-none"
          />
          {/* Bitcoin Icon */}
          <div className="w-[18px] h-[18px] bg-[#f7931a] rounded-full flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] fill-white">
              <path d="M14.017 10.66c1.29-0.428 2.227-1.343 2.227-2.903 0-2.333-1.854-3.153-4.48-3.153h-3.84v-2.618h-1.921v2.618h-1.28v1.921h1.28v10.47h-1.28v1.921h1.28v2.618h1.921v-2.618h4.48c2.81 0 4.8-1.047 4.8-3.674 0-2.113-1.442-3.152-3.2-3.582zm-2.497-3.152h-1.92v-2.56h1.92c1.28 0 1.92 0.64 1.92 1.28 0 0.638-0.64 1.28-1.92 1.28zm0.64 7.68h-2.56v-3.2h2.56c1.6 0 2.24 0.64 2.24 1.6 0 0.96-0.64 1.6-2.24 1.6z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimeDiceSidebar;
