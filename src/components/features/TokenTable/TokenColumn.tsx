import { Token } from './types';
import { TokenCard } from './TokenCard';
import { Skeleton } from '@/components/ui/skeleton';

interface TokenColumnProps {
  title: string;
  tokens: Token[];
  isLoading: boolean;
}

export function TokenColumn({ title, tokens, isLoading }: TokenColumnProps) {
  return (
    <div className="flex flex-col h-full min-w-[340px] flex-1 p-2">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 px-2">
        {title}
        <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
            {tokens.length}
        </span>
      </h3>
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2 p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-12" />
                    </div>
                </div>
                <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                </div>
            </div>
          ))
        ) : (
          tokens.map((token) => (
            <TokenCard key={token.id} token={token} />
          ))
        )}
      </div>
    </div>
  );
}
