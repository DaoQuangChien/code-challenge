import { useState, useMemo } from "react";
import { ArrowDownUp, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import TokenInput from "@/components/TokenInput";
import { useTokenPrices } from "@/hooks/useTokenPrices";
import ConfirmSwapBtn from "./components/ConfirmSwapBtn";

export default function App() {
  const { tokens, isLoading, error: fetchError } = useTokenPrices();
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const exchangeRate = useMemo(() => {
    const pFrom = tokens.find((t) => t.currency === fromToken)?.price || 0;
    const pTo = tokens.find((t) => t.currency === toToken)?.price || 0;
    return pFrom && pTo ? pFrom / pTo : 0;
  }, [fromToken, toToken, tokens]);

  const convertedAmount = amount
    ? (parseFloat(amount) * exchangeRate).toFixed(6)
    : "0";

  const handleConfirmSwap = () => {
    // Mocking a successful transaction
    setIsSuccess(true);
    setAmount("");
    setTimeout(() => setIsSuccess(false), 3000);
  };

  if (isLoading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-950 gap-4">
        <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
        <p className="text-slate-400 animate-pulse font-medium">
          Fetching market prices...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-2xl relative">
        <h1 className="text-white font-bold text-xl mb-6 px-2">Swap Assets</h1>

        {fetchError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle size={16} /> {fetchError}
          </div>
        )}

        {isSuccess && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 animate-in fade-in slide-in-from-top-4 shadow-xl shadow-green-900/20">
            <CheckCircle2 size={18} />{" "}
            <span className="text-sm font-bold">Swap Successful!</span>
          </div>
        )}

        <div className="flex flex-col gap-1 relative">
          <TokenInput
            label="You pay"
            value={amount}
            selectedToken={fromToken}
            tokens={tokens}
            onAmountChange={setAmount}
            onTokenSelect={setFromToken}
          />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => {
                setFromToken(toToken);
                setToToken(fromToken);
              }}
              className="bg-slate-900 border-[6px] border-slate-950 p-2.5 rounded-2xl text-blue-400 hover:scale-110 active:scale-95 transition-all shadow-2xl cursor-pointer"
            >
              <ArrowDownUp size={20} strokeWidth={2.5} />
            </button>
          </div>

          <TokenInput
            label="You receive (Est.)"
            value={convertedAmount}
            selectedToken={toToken}
            tokens={tokens}
            readOnly
            onTokenSelect={setToToken}
          />
        </div>

        <ConfirmSwapBtn
          disabled={!amount || parseFloat(amount) <= 0 || !!fetchError}
          amount={amount}
          convertedAmount={convertedAmount}
          fromToken={fromToken}
          toToken={toToken}
          exchangeRate={exchangeRate}
          onClick={handleConfirmSwap}
        />
      </div>
    </div>
  );
}
