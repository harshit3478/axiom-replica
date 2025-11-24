import { Token } from './types';

const NAMES = ['Axiom', 'Pulse', 'Nebula', 'Quasar', 'Vortex', 'Zenith', 'Apex', 'Nova', 'Flux', 'Orbit'];
const SYMBOLS = ['AXM', 'PLS', 'NEB', 'QSR', 'VTX', 'ZEN', 'APX', 'NVA', 'FLX', 'ORB'];

export function generateMockTokens(count: number): Token[] {
    return Array.from({ length: count }).map((_, i) => {
        const name = NAMES[i % NAMES.length] + (Math.floor(i / NAMES.length) || '');
        const symbol = SYMBOLS[i % SYMBOLS.length];
        const price = Math.random() * 100;
        const status = i % 3 === 0 ? 'new' : i % 3 === 1 ? 'final_stretch' : 'migrated';

        return {
            id: `token-${i}`,
            name,
            symbol,
            price,
            priceChange24h: (Math.random() * 20) - 10, // -10% to +10%
            volume24h: Math.random() * 1000000,
            liquidity: Math.random() * 500000,
            marketCap: Math.random() * 10000000,
            createdAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
            status,

            // Social & Links
            websiteUrl: Math.random() > 0.5 ? 'https://example.com' : undefined,
            twitterHandle: Math.random() > 0.5 ? symbol.toLowerCase() : undefined,
            pumpUrl: 'https://pump.fun',

            // Metrics
            holders: Math.floor(Math.random() * 100),
            proTraders: Math.floor(Math.random() * 20),
            txBuyCount: Math.floor(Math.random() * 50),
            txSellCount: Math.floor(Math.random() * 50),

            // Bonding (for final_stretch)
            bondingProgress: status === 'final_stretch' ? Math.random() * 100 : undefined,

            // Percentages
            userPercentage: Math.random() * 10,
            targetPercentage: Math.random() * 10,
            ghostPercentage: Math.random() * 10,
            bundlePercentage: Math.random() * 10,

            // Fee/Floor
            feeValue: Math.random() * 0.1,
        };
    });
}
