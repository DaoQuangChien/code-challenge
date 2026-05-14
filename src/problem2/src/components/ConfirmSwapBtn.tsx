import type React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowDownUp, X } from "lucide-react";
import SummaryRow from "./SummaryRow";

interface ConfirmSwapBtnProps {
  disabled: boolean;
  amount: string;
  convertedAmount: string;
  fromToken: string;
  toToken: string;
  exchangeRate: number;
  onClick: () => void;
}

const ConfirmSwapBtn: React.FC<ConfirmSwapBtnProps> = (props) => {
  const {
    disabled,
    amount,
    convertedAmount,
    fromToken,
    toToken,
    exchangeRate,
    onClick,
  } = props;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          disabled={disabled}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
        >
          Confirm Swap
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-90 bg-slate-900 border border-slate-800 rounded-4xl p-6 shadow-2xl z-50 animate-in zoom-in-95 duration-200"
          aria-describedby=""
        >
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-white font-bold text-lg">
              Transaction Details
            </Dialog.Title>
            <Dialog.Close className="text-slate-500 hover:text-white transition-colors">
              <X size={20} />
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            <SummaryRow label="From" amount={amount} symbol={fromToken} />
            <div className="flex justify-center">
              <ArrowDownUp size={16} className="text-slate-700" />
            </div>
            <SummaryRow
              label="To (Estimated)"
              amount={convertedAmount}
              symbol={toToken}
            />

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-medium tracking-tight">
                <span className="text-slate-500 uppercase">Rate</span>
                <span className="text-slate-300">
                  1 {fromToken} = {exchangeRate.toFixed(6)} {toToken}
                </span>
              </div>
            </div>
          </div>

          <Dialog.Close asChild>
            <button
              onClick={onClick}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all cursor-pointer"
            >
              Confirm Transaction
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConfirmSwapBtn;
