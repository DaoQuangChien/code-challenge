import type React from "react";
import { ICON_BASE } from "@/constants.ts";

interface SummaryRowProps {
  label: string;
  amount: string;
  symbol: string;
}
const SummaryRow: React.FC<SummaryRowProps> = (props) => {
  const { label, amount, symbol } = props;
  return (
    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
      <div>
        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
          {label}
        </p>
        <p className="text-xl font-bold text-white mt-1">
          {amount} {symbol}
        </p>
      </div>
      <img
        src={`${ICON_BASE}${symbol}.svg`}
        className="w-8 h-8 rounded-full shadow-sm"
        onError={(e) => {
          e.currentTarget.src = `${ICON_BASE}SWTH.svg`;
        }}
        alt={symbol}
      />
    </div>
  );
};

export default SummaryRow;
