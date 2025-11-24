import { memo, useState } from 'react';
import { Token } from './types';
import { AnimatedBorder } from './AnimatedBorder';
import { useTimeAgo } from '@/hooks/useTimeAgo';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { 
  Copy, 
  Search, 
  Users, 
  Zap, 
  EyeOff, 
  Globe,
  ExternalLink,
  ChefHat,
  Crosshair,
  Ghost,
  Box,
  TrendingUp,
  Settings,
  Pill
} from 'lucide-react';

export const TokenCard = memo(function TokenCard({ token }: { token: Token }) {
  const [isHovered, setIsHovered] = useState(false);
  const timeAgo = useTimeAgo(token.createdAt);
  const animatedMC = useAnimatedNumber(token.marketCap, 300);
  const animatedVol = useAnimatedNumber(token.volume24h, 300);
  const animatedHolders = useAnimatedNumber(token.holders, 300);
  
  const totalTx = token.txBuyCount + token.txSellCount;
  const buyPercentage = totalTx > 0 ? (token.txBuyCount / totalTx) * 100 : 50;
  
  // Precise MC color logic based on screenshots
  // New Pairs (Vortex1) had White MC. Final Stretch (STEEZUS) had Blue MC.
  const getMCColor = () => {
    if (token.status === 'final_stretch') return 'text-primaryBlue';
    return 'text-foreground'; // Default white/light
  };

  // Border color logic
  const getBorderColor = () => {
    if (token.status === 'new') return 'rgb(34, 197, 94)'; // pump green
    if (token.status === 'final_stretch') return 'rgb(234, 179, 8)'; // yellow
    return 'rgb(147, 51, 234)'; // purple
  };

  return (
    <div 
      className="relative w-full h-[116px] mb-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-card border-b border-border/50 hover:bg-[#1a1d24] transition-colors duration-200 cursor-pointer overflow-hidden">
        
        {/* Hover Buttons - Top Left (Fade in) */}
        <div className={`absolute top-1.5 left-1.5 z-50 flex flex-col gap-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="w-6 h-6 flex items-center justify-center rounded bg-muted/90 border border-border hover:text-primaryBlue hover:bg-muted transition-colors">
            <EyeOff className="w-3.5 h-3.5" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center rounded bg-muted/90 border border-border hover:text-primaryBlue hover:bg-muted transition-colors">
            <ChefHat className="w-3 h-3" />
          </button>
        </div>

        {/* Quick Buy Button - Bottom Right (Fade in) */}
        <div className={`absolute bottom-3 right-3 z-20 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="flex items-center gap-1 px-2 h-6 rounded-full bg-primaryBlue hover:bg-primaryBlueHover text-black font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-bold">0 SOL</span>
          </button>
        </div>

        <div className="flex flex-row w-full h-full">
          {/* Left: Image Section */}
          <div className="relative w-[74px] h-[74px] m-3 shrink-0">
            {/* Image Container */}
            <div className="relative w-full h-full rounded-[4px] overflow-hidden bg-secondary/20 border border-border/30 group/image">
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-foreground/60">
                {token.symbol[0]}
              </div>
              {/* Hover overlay */}
              <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <Search className="w-5 h-5 text-white" />
              </div>
            </div>
            
            {/* Platform Badge (Bottom Right of Image) */}
            <div className="absolute -bottom-1 -right-1 rounded-full p-0.5 bg-card">
               <Pill className="w-4 h-4 text-pump fill-pump/20" />
            </div>
            
            {/* Animated Border */}
            <AnimatedBorder color={getBorderColor()} />
          </div>

          {/* Right: Content Section */}
          <div className="flex flex-col flex-1 py-3 pr-3 overflow-hidden gap-0.5">
            {/* Row 1: Name & Copy */}
            <div className="flex items-center gap-1 min-w-0 h-5">
              <span className="text-base font-bold truncate tracking-tight max-w-[100px] text-foreground">
                {token.symbol}
              </span>
              <span className="text-base font-normal truncate text-muted-foreground max-w-[80px]">
                {token.name}
              </span>
              <button className="text-muted-foreground hover:text-primaryBlue transition-colors shrink-0 ml-auto">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Row 2: Time & Actions */}
            <div className="flex items-center gap-2.5 h-[18px]">
              {/* Time is always green in screenshots */}
              <span className="text-sm font-medium text-success">
                {timeAgo}
              </span>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                {/* Icons vary by status/data */}
                {token.status === 'final_stretch' && (
                  <>
                    <Globe className="w-3.5 h-3.5 hover:text-primaryBlue cursor-pointer" />
                    <Pill className="w-3.5 h-3.5 hover:text-primaryBlue cursor-pointer" />
                  </>
                )}
                <Search className="w-3.5 h-3.5 hover:text-primaryBlue cursor-pointer" />
                
                <div className="flex items-center gap-0.5 ml-1">
                  <Users className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium text-foreground">{Math.floor(animatedHolders)}</span>
                </div>
                
                {token.status === 'final_stretch' && (
                  <div className="flex items-center gap-0.5">
                    <Settings className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium text-foreground">0</span>
                  </div>
                )}
              </div>
            </div>

            {/* Row 3: Badges */}
            <div className="flex items-center gap-1 mt-auto flex-wrap">
              {/* User % Badge */}
              <div className="flex items-center gap-0.5 px-1.5 h-5 rounded-[4px] bg-[#1e293b] border border-border/20">
                <Users className="w-2.5 h-2.5 text-success" />
                <span className="text-[10px] font-medium text-success">{token.userPercentage.toFixed(0)}%</span>
              </div>
              
              {/* DS Badge */}
              <div className="flex items-center gap-0.5 px-1.5 h-5 rounded-[4px] bg-[#1e293b] border border-border/20">
                <Zap className="w-2.5 h-2.5 text-foreground" />
                <span className="text-[10px] font-medium text-foreground">DS</span>
              </div>

              {/* Extra badges for Final Stretch/Migrated */}
              {token.status !== 'new' && (
                <>
                  <div className="flex items-center gap-0.5 px-1.5 h-5 rounded-[4px] bg-[#1e293b] border border-border/20">
                    <Crosshair className="w-2.5 h-2.5 text-success" />
                    <span className="text-[10px] font-medium text-success">{token.targetPercentage.toFixed(0)}%</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Absolute: Top Right Stats */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-0">
            <div className="flex items-end gap-1.5">
              <span className="text-[11px] font-medium text-muted-foreground/60">MC</span>
              <span className={`text-base font-bold ${getMCColor()}`}>
                ${(animatedMC / 1000).toFixed(2)}K
              </span>
            </div>
            <div className="flex items-end gap-1.5">
              <span className="text-[11px] font-medium text-muted-foreground/60">V</span>
              <span className="text-base font-medium text-foreground">
                ${Math.floor(animatedVol)}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] font-medium text-muted-foreground/60">F</span>
              <span className="text-xs font-medium text-foreground flex items-center gap-0.5">
                {token.feeValue.toFixed(3)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-medium text-muted-foreground/60">TX</span>
              {/* TX Bar */}
              <div className="w-8 h-[3px] bg-border/30 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-success" 
                  style={{ width: `${buyPercentage}%` }}
                />
                <div 
                  className="h-full bg-destructive" 
                  style={{ width: `${100 - buyPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bonding Bar (Final Stretch only) */}
        {token.status === 'final_stretch' && token.bondingProgress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary/30">
            <div 
              className="h-full bg-gradient-to-r from-pump to-primaryBlue transition-all duration-500"
              style={{ width: `${token.bondingProgress}%` }}
            />
            {/* Bonding Tooltip (Simulated as per screenshot) */}
            {isHovered && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-destructive/90 text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap z-50">
                    Bonding: {token.bondingProgress.toFixed(2)}%
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});
