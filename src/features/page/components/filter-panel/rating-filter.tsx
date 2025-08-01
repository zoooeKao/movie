'use client';

import { DEFAULT_FILTERS, VOTE_AVERAGE_TICKS } from '@/features/page/consts'
import { DiscoverMovieFilters } from '@/features/page/types';
import { Slider } from '@/components/ui/slider';


interface RatingFilterProps {
  filters: DiscoverMovieFilters;
  setFilters: (
    filters: DiscoverMovieFilters | ((prev: DiscoverMovieFilters) => DiscoverMovieFilters),
  ) => void;
}

export const RatingFilter = ({ filters, setFilters }: RatingFilterProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">使用者評分</label>
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground font-mono text-sm">
            {filters.voteAverage.range[0]}
          </span>
          <span className="text-muted-foreground text-sm">-</span>
          <span className="text-muted-foreground font-mono text-sm">
            {filters.voteAverage.range[1]}
          </span>
        </div>
      </div>
      <div className="px-2">
        <Slider
          value={filters.voteAverage.range}
          onValueChange={value =>
            setFilters(prev => ({ 
              ...prev, 
              voteAverage: { ...prev.voteAverage, range: value as [number, number] } 
            }))
          }
          max={DEFAULT_FILTERS.voteAverage.range[1]}
          min={DEFAULT_FILTERS.voteAverage.range[0]}
          step={DEFAULT_FILTERS.voteAverage.step}
          className="w-full"
        />
        {/* 刻度標記 */}
        <div className="relative mt-2">
          <div className="flex justify-between">
            {VOTE_AVERAGE_TICKS.map(tick => (
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