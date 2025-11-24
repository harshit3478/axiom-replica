import { useEffect, useState } from "react";

export interface TokenData {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
    status: "new" | "final" | "migrated";
    updatedAt: number;
}

// Mock initial data
const INITIAL_TOKENS: TokenData[] = Array.from({ length: 20 }).map((_, i) => ({
    id: `token-${i}`,
    name: `Token ${i + 1}`,
    symbol: `TKN${i + 1}`,
    price: Math.random() * 100,
    change24h: (Math.random() * 20) - 10,
    volume24h: Math.random() * 1000000,
    marketCap: Math.random() * 10000000,
    status: i < 5 ? "new" : i < 15 ? "final" : "migrated",
    updatedAt: Date.now(),
}));

type Listener = (data: TokenData[]) => void;

class MockWebSocketService {
    private listeners: Listener[] = [];
    private tokens: TokenData[] = [...INITIAL_TOKENS];
    private intervalId: NodeJS.Timeout | null = null;

    connect() {
        if (this.intervalId) return;

        this.intervalId = setInterval(() => {
            this.updateRandomToken();
        }, 1000); // Update every second
    }

    disconnect() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    subscribe(listener: Listener) {
        this.listeners.push(listener);
        listener(this.tokens); // Send initial data
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private updateRandomToken() {
        const index = Math.floor(Math.random() * this.tokens.length);
        const token = this.tokens[index];
        const newPrice = token.price * (1 + (Math.random() * 0.02 - 0.01)); // +/- 1% change

        const updatedToken = {
            ...token,
            price: newPrice,
            updatedAt: Date.now(),
        };

        this.tokens[index] = updatedToken;
        this.notify();
    }

    private notify() {
        this.listeners.forEach((listener) => listener([...this.tokens]));
    }
}

export const mockSocket = new MockWebSocketService();

export function useTokenSocket() {
    const [data, setData] = useState<TokenData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        mockSocket.connect();
        const unsubscribe = mockSocket.subscribe((newData) => {
            setData(newData);
            setIsLoading(false);
        });
        return () => {
            unsubscribe();
            // We don't disconnect here to simulate a shared connection, 
            // but in a real app we might manage connection lifecycle differently.
        };
    }, []);

    return { data, isLoading };
}
