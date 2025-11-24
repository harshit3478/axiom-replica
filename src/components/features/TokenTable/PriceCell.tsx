import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface PriceCellProps {
  price: number;
  className?: string;
}

export function PriceCell({ price, className }: PriceCellProps) {
  const prevPriceRef = useRef(price);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [flash, setFlash] = useState<'green' | 'red' | null>(null);

  useEffect(() => {
    if (price > prevPriceRef.current) {
      setDirection('up');
      setFlash('green');
    } else if (price < prevPriceRef.current) {
      setDirection('down');
      setFlash('red');
    }

    prevPriceRef.current = price;

    const timer = setTimeout(() => {
      setFlash(null);
    }, 1000);

    return () => clearTimeout(timer);
  }, [price]);

  return (
    <div
      className={cn(
        "flex items-center gap-1 font-mono transition-colors duration-300",
        flash === 'green' && "animate-flash-green text-success",
        flash === 'red' && "animate-flash-red text-destructive",
        !flash && direction === 'up' && "text-success",
        !flash && direction === 'down' && "text-destructive",
        !flash && !direction && "text-foreground",
        className
      )}
    >
      {direction === 'up' && <ArrowUp className="h-3 w-3" />}
      {direction === 'down' && <ArrowDown className="h-3 w-3" />}
      <span>${price.toFixed(4)}</span>
    </div>
  );
}
