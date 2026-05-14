import { useState, useEffect } from "react";
import { PRICES_URL } from "@/constants.ts";

export interface Token {
  currency: string;
  price: number;
}

export const useTokenPrices = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(PRICES_URL);
        if (!response.ok) throw new Error("Failed to fetch prices");
        const data: Token[] = await response.json();

        const uniqueTokens = data.reduce((acc: Token[], curr) => {
          if (curr.price && !acc.find((t) => t.currency === curr.currency)) {
            acc.push({ currency: curr.currency, price: curr.price });
          }
          return acc;
        }, []);

        setTokens(uniqueTokens);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return { tokens, isLoading, error };
};
