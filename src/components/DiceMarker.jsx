import React from "react";

const DiceMarker = ({ lastRoll, isWin }) => {
  if (lastRoll === null) return null;

  return (
    <div
      className="absolute top-1/2 -translate-y-6/6 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none transition-all duration-300 ease-out animate-in zoom-in-50"
      style={{ left: `${lastRoll}%` }}
    >
      <div
        className={`px-2 py-0.5 rounded-full text-[13px] font-black shadow-lg mb-1 ${
          isWin ? "bg-[#00e701] text-[#0f212e]" : "bg-[#e9113c] text-white"
        }`}
      >
        {lastRoll.toFixed(2)}
      </div>

      <img
        src="/images/dice.svg"
        alt="Dice marker"
        className="w-[70px] h-70px] drop-shadow-lg"
      />
    </div>
  );
};

export default DiceMarker;
