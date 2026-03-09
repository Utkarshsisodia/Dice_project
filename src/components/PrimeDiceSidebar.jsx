import React, { useState } from "react";

const PrimeDiceSidebar = ({onBet}) => {
  const [activeTab, setActiveTab] = useState("Manual");
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [winAction, setWinAction] = useState("reset");
  const [lossAction, setLossAction] = useState("reset");

  return (
    <div className="w-80 bg-[#0f212e] p-4 flex flex-col gap-4 font-sans text-sm select-none min-h-[600px] rounded-sm shadow-xl border-r border-[#1a2c38]">
      <div className="flex bg-[#1a2c38] rounded-full p-1 shadow-inner border border-[#213743]">
        {["Manual", "Auto", "Strategy"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 flex justify-center items-center rounded-full transition-all duration-200 ${
              activeTab === tab
                ? "bg-[#4d7187] text-white shadow-md"
                : "text-[#b1c5d4] hover:text-white hover:bg-[#213743]"
            }`}
          >
            {tab === "Strategy" ? (
              <div className="relative w-4 h-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className={`absolute inset-0 w-full h-full fill-none stroke-[3] stroke-current ${activeTab === "Strategy" ? "text-white" : "text-[#b1c5d4]"}`}
                >
                  <path
                    d="M4 12c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8c-2.21 0-4.21.895-5.657 2.343M2 2v6h6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[9px] font-black z-10 pt-0.5">A</span>
              </div>
            ) : (
              <span className="text-[11px] font-bold">{tab}</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-[11px] font-bold text-[#b1c5d4] uppercase tracking-tighter">
          <span>Bet Amount</span>
          <span>$0.00</span>
        </div>
        <div className="flex items-center bg-[#2f4553] rounded border-2 border-[#2f4553] focus-within:border-[#557b92] p-1 transition-all">
          <span className="pl-2 text-[#f3ba2f] font-bold text-lg leading-none">
            ₿
          </span>
          <input
            type="number"
            step="0.00000001"
            min="0"
            defaultValue="0.00000000"
            className="w-full bg-transparent text-white px-2 outline-none font-bold text-sm   "
          />
          <div className="flex gap-0.5 pr-0.5">
            <button className="bg-[#0f212e] hover:bg-[#1a2c38] text-[#b1c5d4] px-3 py-1.5 rounded-l text-[10px] font-black uppercase">
              ½
            </button>
            <div className="w-[2px] bg-[#2f4553]"></div>
            <button className="bg-[#0f212e] hover:bg-[#1a2c38] text-[#b1c5d4] px-3 py-1.5 rounded-r text-[10px] font-black uppercase">
              2×
            </button>
          </div>
        </div>
      </div>

      {activeTab === "Manual" && (
        <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex justify-between text-[11px] font-bold text-[#b1c5d4] uppercase tracking-tighter">
            <span>Profit on Win</span>
            <span>$0.00</span>
          </div>
          <div className="flex items-center bg-[#2f4553] rounded border-2 border-[#2f4553] focus-within:border-[#557b92] p-1 transition-all">
            <span className="pl-2 text-[#f3ba2f] font-bold text-lg leading-none">
              ₿
            </span>
            <input
              type="text"
              disabled
              defaultValue="0.00000000"
              className="w-full bg-transparent text-white px-2 outline-none font-bold text-sm"
            />
          </div>
        </div>
      )}

      {activeTab === "Auto" && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-[#b1c5d4] uppercase tracking-tighter">
              Number of Bets
            </span>
            <div className="bg-[#2f4553] rounded border-2 border-[#2f4553] p-2 flex items-center focus-within:border-[#557b92]">
              <input
                type="number"
                className="w-full bg-transparent text-white outline-none font-bold"
                placeholder="0"
              />
              <span className="text-[#b1c5d4] text-[10px] font-black px-1 select-none italic">
                ∞
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsAdvanced(!isAdvanced)}
            className="w-full bg-[#2f4553] hover:bg-[#3d5a6d] text-white py-2.5 px-3 rounded text-[11px] font-bold flex justify-between items-center transition-all border-b-[3px] border-[#1a2c38] active:border-b-0 active:translate-y-[1px]"
          >
            <span className="uppercase tracking-wider">Advanced Controls</span>
            <span
              className={`transition-transform duration-300 text-sm ${isAdvanced ? "rotate-180" : ""}`}
            >
              ▾
            </span>
          </button>

          {isAdvanced && (
            <div className="flex flex-col gap-4 animate-in slide-in-from-top-2 duration-300">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-[#b1c5d4] uppercase">
                    On Win
                  </span>
                  <div className="flex bg-[#0f212e] rounded p-1 gap-1 h-9">
                    <button
                      onClick={() => setWinAction("reset")}
                      className={`flex-1 text-[10px] font-bold rounded transition-all ${winAction === "reset" ? "bg-[#2f4553] text-white border-b-2 border-[#1fff20]" : "text-[#b1c5d4]"}`}
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setWinAction("increase")}
                      className={`flex-1 text-[10px] font-bold rounded transition-all ${winAction === "increase" ? "bg-[#2f4553] text-white border-b-2 border-[#1fff20]" : "text-[#b1c5d4]"}`}
                    >
                      Increase
                    </button>
                  </div>

                  <div
                    className={`bg-[#2f4553] rounded border-2 border-[#2f4553] flex items-center px-2 py-1.5 transition-opacity ${winAction === "increase" ? "opacity-100" : "opacity-40 pointer-events-none"}`}
                  >
                    <span className="text-[10px] text-[#b1c5d4] font-bold pr-1">
                      %
                    </span>
                    <input
                      type="number"
                      defaultValue="0"
                      className="bg-transparent text-white text-xs outline-none font-bold w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-[#b1c5d4] uppercase">
                    On Loss
                  </span>
                  <div className="flex bg-[#0f212e] rounded p-1 gap-1 h-9">
                    <button
                      onClick={() => setLossAction("reset")}
                      className={`flex-1 text-[10px] font-bold rounded transition-all ${lossAction === "reset" ? "bg-[#2f4553] text-white border-b-2 border-[#1fff20]" : "text-[#b1c5d4]"}`}
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setLossAction("increase")}
                      className={`flex-1 text-[10px] font-bold rounded transition-all ${lossAction === "increase" ? "bg-[#2f4553] text-white border-b-2 border-[#1fff20]" : "text-[#b1c5d4]"}`}
                    >
                      Increase
                    </button>
                  </div>

                  <div
                    className={`bg-[#2f4553] rounded border-2 border-[#2f4553] flex items-center px-2 py-1.5 transition-opacity ${lossAction === "increase" ? "opacity-100" : "opacity-40 pointer-events-none"}`}
                  >
                    <span className="text-[10px] text-[#b1c5d4] font-bold pr-1">
                      %
                    </span>
                    <input
                      type="number"
                      defaultValue="0"
                      className="bg-transparent text-white text-xs outline-none font-bold w-full"
                    />
                  </div>
                </div>
              </div>

              {["Stop on Profit", "Stop on Loss"].map((label) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-[#b1c5d4] uppercase tracking-tighter">
                    {label}
                  </span>
                  <div className="bg-[#2f4553] rounded border-2 border-[#2f4553] p-2 flex items-center">
                    <span className="pr-1 text-[#f3ba2f] font-bold text-[10px]">
                      ₿
                    </span>
                    <input
                      type="number"
                      step="0.00000001"
                      min="0"
                      defaultValue="0.00000000"
                      className="bg-transparent text-white outline-none text-xs w-full font-bold"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "Strategy" && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-[#b1c5d4] uppercase tracking-tighter">
              Number of Bets
            </span>
            <div className="bg-[#2f4553] rounded border-2 border-[#2f4553] p-2 flex items-center focus-within:border-[#557b92]">
              <input
                type="number"
                className="w-full bg-transparent text-white outline-none font-bold"
                placeholder="0"
              />
              <span className="text-[#b1c5d4] text-[10px] font-black px-1 select-none italic">
                ∞
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-[#b1c5d4] uppercase tracking-tighter">
             Select Strategy
            </span>
            <div className="relative">
              <select className="w-full bg-[#2f4553] text-white font-bold text-sm rounded border-2 border-[#2f4553] px-3 py-2.5 outline-none appearance-none cursor-pointer hover:border-[#557b92] transition-colors">
                <option>Martingale</option>
                <option>Delayed Martingale</option>
                <option>Paroli</option>
                <option>D'Alembert</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#b1c5d4]">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="currentColor"
                >
                  <path d="M0.833333 0.666667L5 4.83333L9.16667 0.666667H0.833333Z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2">
            <button className="w-full py-2 px-3 text-[10px] font-bold uppercase tracking-wider rounded bg-[#2f4553] hover:bg-[#3d5a6d] text-[#b1c5d4] hover:text-white transition-colors">
              Create
            </button>
            <button className="w-full py-2 px-3 text-[10px] font-bold uppercase tracking-wider rounded bg-[#2f4553] hover:bg-[#3d5a6d] text-[#b1c5d4] hover:text-white transition-colors">
              Edit
            </button>
            <button className="w-full py-2 px-3 text-[10px] font-bold uppercase tracking-wider rounded bg-[#2f4553] hover:bg-[#3d5a6d] text-red-500 hover:text-red-400 transition-colors">
              Delete
            </button>
          </div>
          </div>
        </div>
      )}

      <div className="mt-auto pt-6">
        <button onClick={onBet} className="w-full bg-[#1fff20] hover:bg-[#42ff43] text-black font-black py-4 rounded transition-all shadow-[0_4px_0_0_#17b918] active:translate-y-[3px] active:shadow-none uppercase tracking-[0.15em] text-sm">
          {activeTab === "Manual"
            ? "Bet"
            : activeTab === "Auto"
              ? "Start Autobet"
              : "Run Strategy"}
        </button>
      </div>
    </div>
  );
};

export default PrimeDiceSidebar;
