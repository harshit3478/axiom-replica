import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Token } from './types';
import { generateMockTokens } from './mockData';

export function useTokenData() {
    const queryClient = useQueryClient();

    const { data: tokens = [], isLoading } = useQuery<Token[]>({
        queryKey: ['tokens'],
        queryFn: async () => {
            return generateMockTokens(30);
        },
    });

    useEffect(() => {
        const interval = setInterval(() => {
            queryClient.setQueryData<Token[]>(['tokens'], (oldTokens) => {
                if (!oldTokens) return oldTokens;

                return oldTokens.map((token) => {
                    // Randomly update various fields to simulate real-time changes
                    const priceChange = (Math.random() - 0.5) * 2;
                    const newPrice = Math.max(0.01, token.price + priceChange);

                    // Sometimes update holders
                    const holdersChange = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;

                    // Sometimes update transactions
                    const addBuy = Math.random() > 0.8 ? 1 : 0;
                    const addSell = Math.random() > 0.8 ? 1 : 0;

                    // Update volume
                    const volumeChange = (Math.random() - 0.5) * 1000;

                    // Update bonding progress for final_stretch tokens
                    const bondingChange = token.bondingProgress !== undefined
                        ? Math.min(100, token.bondingProgress + Math.random() * 0.5)
                        : undefined;

                    return {
                        ...token,
                        price: newPrice,
                        holders: Math.max(0, token.holders + holdersChange),
                        txBuyCount: token.txBuyCount + addBuy,
                        txSellCount: token.txSellCount + addSell,
                        volume24h: Math.max(0, token.volume24h + volumeChange),
                        marketCap: token.marketCap + (Math.random() - 0.5) * 1000,
                        bondingProgress: bondingChange,
                    };
                });
            });
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [queryClient]);

    return { tokens, isLoading };
}
