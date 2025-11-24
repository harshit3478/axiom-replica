"use client";

import { useTokenData } from './useTokenData';
import { TokenColumn } from './TokenColumn';

export function TokenBoard() {
  const { tokens, isLoading } = useTokenData();

  const newPairs = tokens.filter(t => t.status === 'new');
  const finalStretch = tokens.filter(t => t.status === 'final_stretch');
  const migrated = tokens.filter(t => t.status === 'migrated');

  return (
    <div className="w-full h-[calc(100vh-120px)] flex gap-4 overflow-x-auto pb-4">
      <TokenColumn 
        title="New Pairs" 
        tokens={newPairs} 
        isLoading={isLoading} 
      />
      <TokenColumn 
        title="Final Stretch" 
        tokens={finalStretch} 
        isLoading={isLoading} 
      />
      <TokenColumn 
        title="Migrated" 
        tokens={migrated} 
        isLoading={isLoading} 
      />
    </div>
  );
}
