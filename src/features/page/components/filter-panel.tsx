'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { DiscoverMovieFilters, Genre } from '@/types/movie';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateFilter, GenreFilter, RatingFilter, RuntimeFilter } from './filter-panel/index';

interface FilterPanelProps {
  genres: Genre[];
  filters: DiscoverMovieFilters;
  setFilters: (
    filters: DiscoverMovieFilters | ((prev: DiscoverMovieFilters) => DiscoverMovieFilters),
  ) => void;
  isLoading: boolean;
  onGenreToggle: (genreId: number) => void;
  onReset?: () => void;
  onSearch: () => void;
}

export const FilterPanel = ({
  genres,
  filters,
  setFilters,
  isLoading,
  onGenreToggle,
  onReset,
  onSearch,
}: FilterPanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">篩選器</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapse}
              className="h-6 w-6 p-0"
              aria-label={isCollapsed ? '展開篩選器' : '收合篩選器'}
            >
              {isCollapsed ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
          </div>
          {onReset && (
            <Button variant="outline" size="sm" onClick={onReset} className="h-8 px-2 text-xs">
              <RotateCcw className="mr-1 h-3 w-3" />
              重置
            </Button>
          )}
        </div>
      </CardHeader>
      {!isCollapsed && (
        <CardContent className="space-y-6">
          {/* 使用者評分 */}
          <RatingFilter filters={filters} setFilters={setFilters} />

          {/* 片長 */}
          <RuntimeFilter filters={filters} setFilters={setFilters} />

          {/* 發佈日期 */}
          <DateFilter filters={filters} setFilters={setFilters} />

          {/* 類型 */}
          <GenreFilter genres={genres} filters={filters} onGenreToggle={onGenreToggle} />

          {/* 搜尋按鈕 */}
          <Button onClick={onSearch} className="w-full" disabled={isLoading}>
            {isLoading ? '搜尋中...' : '搜尋電影'}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};