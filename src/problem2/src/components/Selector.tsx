import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Search, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ICON_BASE } from "@/constants.ts";

interface Token {
  currency: string;
  price: number;
}

interface SelectorProps {
  selected: string;
  tokens: Token[];
  onSelect: (symbol: string) => void;
}

const Selector: React.FC<SelectorProps> = ({ selected, tokens, onSelect }) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = tokens
    .filter((t) => t.currency.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 8);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-2xl text-white font-bold transition-all shrink-0 outline-none focus:ring-2 ring-blue-500/50">
          <img
            src={`${ICON_BASE}${selected}.svg`}
            className="w-5 h-5 rounded-full"
            onError={(e) => (e.currentTarget.src = `${ICON_BASE}SWTH.svg`)}
          />
          <span>{selected}</span>
          <ChevronDown
            size={14}
            className={cn("transition-transform", open && "rotate-180")}
          />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200"
          align="end"
          sideOffset={8}
        >
          <div className="relative mb-2">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={14}
            />
            <input
              autoFocus
              placeholder="Search name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filtered.map((token) => (
              <button
                key={token.currency}
                onClick={() => {
                  onSelect(token.currency);
                  setOpen(false);
                  setSearch("");
                }}
                className={cn(
                  "w-full flex items-center justify-between p-2 rounded-xl text-sm mb-1",
                  selected === token.currency
                    ? "bg-blue-600/20 text-blue-400"
                    : "hover:bg-slate-800 text-slate-300",
                )}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`${ICON_BASE}${token.currency}.svg`}
                    className="w-6 h-6"
                    onError={(e) =>
                      (e.currentTarget.src = `${ICON_BASE}SWTH.svg`)
                    }
                  />
                  <span className="font-medium">{token.currency}</span>
                </div>
                {selected === token.currency && <Check size={14} />}
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Selector;
