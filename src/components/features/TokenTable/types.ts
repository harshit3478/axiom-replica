export interface Token {
    id: string;
    name: string;
    symbol: string;
    price: number;
    priceChange24h: number;
    volume24h: number;
    liquidity: number;
    marketCap: number;
    createdAt: string;
    status: 'new' | 'final_stretch' | 'migrated';
    logoUrl?: string;

    // Social & Links
    websiteUrl?: string;
    twitterHandle?: string;
    pumpUrl?: string;

    // Metrics
    holders: number;
    proTraders: number;
    txBuyCount: number;
    txSellCount: number;

    // Bonding (for final_stretch)
    bondingProgress?: number;

    // Percentages
    userPercentage: number;
    targetPercentage: number;
    ghostPercentage: number;
    bundlePercentage: number;

    // Fee/Floor
    feeValue: number;
}

export interface TokenTableProps {
    initialTokens?: Token[];
}
