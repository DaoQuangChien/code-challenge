import React from "react";
import Selector from "./Selector";

interface Token {
  currency: string;
  price: number;
}

interface TokenInputProps {
  label: string;
  value: string;
  tokens: Token[];
  selectedToken: string;
  readOnly?: boolean;
  onAmountChange?: (val: string) => void;
  onTokenSelect: (symbol: string) => void;
}

const TokenInput: React.FC<TokenInputProps> = ({
  label,
  value,
  tokens,
  selectedToken,
  readOnly,
  onAmountChange,
  onTokenSelect,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      onAmountChange?.(val);
    }
  };

  return (
    <div className="bg-slate-950/50 p-4 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors group">
      <label className="text-xs text-slate-500 font-medium ml-1 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex items-center gap-3 mt-2">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          readOnly={readOnly}
          onChange={handleInputChange}
          placeholder="0.00"
          className="bg-transparent text-3xl font-semibold text-white w-full outline-none placeholder:text-slate-800 disabled:opacity-50"
        />
        <Selector
          selected={selectedToken}
          tokens={tokens}
          onSelect={onTokenSelect}
        />
      </div>
    </div>
  );
};

export default TokenInput;
