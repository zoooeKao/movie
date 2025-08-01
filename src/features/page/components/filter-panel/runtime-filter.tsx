'use client';

import { DEFAULT_FILTERS, RUNTIME_TICKS } from '@/features/page/consts'
import { DiscoverMovieFilters } from '@/features/page/types'
import { Slider } from '@/components/ui/slider';


interface RuntimeFilterProps {
  filters: DiscoverMovieFilters;
  setFilters: (
    filters: DiscoverMovieFilters | ((prev: DiscoverMovieFilters) => DiscoverMovieFilters),
  ) => void;
}

export const RuntimeFilter = ({ filters, setFilters }: RuntimeFilterProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">片長（分鐘）</label>
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground font-mono text-sm">
            {filters.runtime.range[0]}
          </span>
          <span className="text-muted-foreground text-sm">-</span>
          <span className="text-muted-foreground font-mono text-sm">
            {filters.runtime.range[1]}
          </span>
        </div>
      </div>
      <div className="px-2">
        <Slider
          value={filters.runtime.range}
          onValueChange={value =>
            setFilters(prev => ({ 
              ...prev, 
              runtime: { ...prev.runtime, range: value as [number, number] } 
            }))
          }
          max={DEFAULT_FILTERS.runtime.range[1]}
          min={DEFAULT_FILTERS.runtime.range[0]}
          step={DEFAULT_FILTERS.runtime.step}
          className="w-full"
        />
        {/* 刻度標記 */}
        <div className="relative mt-2">
          <div className="flex justify-between">
            {RUNTIME_TICKS.map(tick => (
              <div key={tick} className="flex flex-col items-center">
                <div className="bg-muted-foreground/30 h-2 w-px"></div>
                <span className="text-muted-foreground mt-1 text-xs">{tick}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};