'use client';

import { useState } from 'react'
import { DiscoverMovieFilters } from '@/features/page/types'
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react'
import { Genre } from '@/types/movie'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateFilter } from './date-filter';
import { GenreFilter } from './genre-filter';
import { RatingFilter } from './rating-filter';
import { RuntimeFilter } from './runtime-filter';


interface FilterPanelProps {
  genres: Genre[]
  filters: DiscoverMovieFilters
  setFilters: (
    filters: DiscoverMovieFilters | ((prev: DiscoverMovieFilters) => DiscoverMovieFilters),
  ) => void
  isLoading: boolean
  onReset?: () => void
  onSearch: () => void
}

export const FilterPanel = ({
  genres,
  filters,
  setFilters,
  isLoading,
  onReset,
  onSearch,
}: FilterPanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev)
  }

  return (
    <Card className="py-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={toggleCollapse}>
            <CardTitle className="text-lg">篩選器</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0"
              aria-label={isCollapsed ? '展開篩選器' : '收合篩選器'}
            >
              {isCollapsed ? (
                <ChevronDown className="h-10 w-10 p-0" />
              ) : (
                <ChevronUp className="h-10 w-10 p-0" />
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
          <GenreFilter genres={genres} filters={filters} setFilters={setFilters} />

          {/* 搜尋按鈕 */}
          <Button onClick={onSearch} className="w-full" disabled={isLoading}>
            {isLoading ? '搜尋中...' : '搜尋電影'}
          </Button>
        </CardContent>
      )}
    </Card>
  )
}
