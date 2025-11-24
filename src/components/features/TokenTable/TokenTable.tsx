"use client";

import { useState } from 'react';
import { useTokenData } from './useTokenData';
import { TokenRow } from './TokenRow';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpDown } from 'lucide-react';
import { Token } from './types';

type FilterType = 'all' | 'new' | 'final_stretch' | 'migrated';
type SortKey = keyof Token;
type SortDirection = 'asc' | 'desc';

export function TokenTable() {
  const { tokens, isLoading } = useTokenData();
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortKey, setSortKey] = useState<SortKey>('marketCap');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const filteredTokens = tokens.filter(token => {
    if (filter === 'all') return true;
    return token.status === filter;
  });

  const sortedTokens = [...filteredTokens].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  return (
    <Card className="w-full bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Token Discovery</CardTitle>
        <div className="flex gap-2">
            {(['all', 'new', 'final_stretch', 'migrated'] as const).map((f) => (
                <Button 
                    key={f}
                    variant={filter === f ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setFilter(f)}
                    className="capitalize"
                >
                    {f.replace('_', ' ')}
                </Button>
            ))}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                    <Button variant="ghost" onClick={() => handleSort('name')} className="h-8 px-2 -ml-2">
                        Token <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </TableHead>
                <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('price')} className="h-8 px-2 -ml-2">
                        Price <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </TableHead>
                <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('priceChange24h')} className="h-8 px-2 -ml-2">
                        24h Change <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </TableHead>
                <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('volume24h')} className="h-8 px-2 -ml-2">
                        Volume <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </TableHead>
                <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('liquidity')} className="h-8 px-2 -ml-2">
                        Liquidity <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
                  </TableRow>
                ))
              ) : (
                sortedTokens.map((token) => (
                  <TokenRow key={token.id} token={token} />
                ))
              )}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
