import { memo } from 'react';
import { Token } from './types';
import { PriceCell } from './PriceCell';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const TokenRow = memo(function TokenRow({ token }: { token: Token }) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 hover:opacity-80 transition-opacity text-left">
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                            {token.symbol[0]}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium">{token.name}</span>
                            <span className="text-xs text-muted-foreground">{token.symbol}</span>
                        </div>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">{token.name} ({token.symbol})</h4>
                            <p className="text-sm text-muted-foreground">
                                Created at: {new Date(token.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <span className="text-sm">Market Cap</span>
                                <span className="col-span-2 text-sm font-medium">${token.marketCap.toLocaleString()}</span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <span className="text-sm">Liquidity</span>
                                <span className="col-span-2 text-sm font-medium">${token.liquidity.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
      </TableCell>
      <TableCell>
        <PriceCell price={token.price} />
      </TableCell>
      <TableCell>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={token.priceChange24h >= 0 ? "text-success cursor-help" : "text-destructive cursor-help"}>
                        {token.priceChange24h > 0 ? "+" : ""}{token.priceChange24h.toFixed(2)}%
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>24h Price Change</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        ${(token.volume24h / 1000).toFixed(1)}k
      </TableCell>
      <TableCell>
        ${(token.liquidity / 1000).toFixed(1)}k
      </TableCell>
      <TableCell>
        <Badge variant={token.status === 'new' ? 'default' : token.status === 'final_stretch' ? 'warning' : 'secondary'}>
            {token.status.replace('_', ' ')}
        </Badge>
      </TableCell>
    </TableRow>
  );
});
