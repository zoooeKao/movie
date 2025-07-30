'use client';

import { FilterPanel } from '@/features/page/components/filter-panel';
import { MovieList } from '@/features/page/components/movie-list';
import { useFilterState } from '@/features/page/hooks/use-filter-state';
import { MoviesResponse } from '@/types/movie';
import { EmptyState } from '@/components/empty-state';
import { ErrorMessage } from '@/components/error-message';
import { LoadingSpinner } from '@/components/loading-spinner';


interface SearchMoviesProps {
  initialMovies: MoviesResponse;
}

export const SearchMovies = ({ initialMovies }: SearchMoviesProps) => {
  const {
    filters,
    setFilters,
    appliedFilters,
    hasAppliedFilters,
    handleSearchWithScroll,
    handleGenreToggle,
    resetFilters,
    genres,
    genresError,
    genresIsLoading,
    filterData,
    filterDataError,
    filterDataIsLoading,
    hasError,
    hasResults,
  } = useFilterState();

  return (
    <div className="space-y-8">
      {/* 篩選器卡片 */}
      <FilterPanel
        genres={genres}
        filters={filters}
        setFilters={setFilters}
        isLoading={filterDataIsLoading}
        onGenreToggle={handleGenreToggle}
        onReset={resetFilters}
        onSearch={handleSearchWithScroll}
      />

      {/* 搜尋結果區域 */}
      {hasAppliedFilters && (
        <div>
          {filterDataIsLoading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          )}

          {hasError && (
            <ErrorMessage
              title="搜尋失敗"
              message="無法載入搜尋結果，請檢查網路連線並重試。"
              onRetry={handleSearchWithScroll}
            />
          )}

          {!hasResults && (
            <EmptyState
              title="找不到相關電影"
              message="沒有找到符合篩選條件的電影，請調整篩選條件重新搜尋。"
            />
          )}

          <MovieList
            initialMovies={initialMovies}
            filteredMovies={filterData}
            isFilterMode={true}
            searchFilters={appliedFilters}
            title="搜尋結果"
          />
        </div>
      )}

      {/* 尚未搜尋前，顯示熱門電影 */}
      {!hasAppliedFilters && (
        <MovieList initialMovies={initialMovies} isFilterMode={false} title="熱門電影" />
      )}
    </div>
  );
};