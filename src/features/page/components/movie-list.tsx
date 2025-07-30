'use client';

import { Pagination } from '@/features/page/components/pagination';
import { useMovieList } from '@/features/page/hooks/use-movie-list';
import { DiscoverMovieFilters, MoviesResponse } from '@/types/movie';
import { ErrorMessage } from '@/components/error-message';
import { MovieCard } from '@/components/movie-card';
import { MovieCardSkeleton } from '@/components/movie-card-skeleton';

interface MovieListProps {
  initialMovies: MoviesResponse;
  filteredMovies?: MoviesResponse | null;
  isFilterMode?: boolean;
  searchFilters?: DiscoverMovieFilters | null;
  title?: '熱門電影' | '搜尋結果';
}

export const MovieList = ({
  initialMovies,
  filteredMovies,
  isFilterMode = false,
  searchFilters,
  title,
}: MovieListProps) => {
  const {
    movies,
    totalPages,
    totalResults,
    currentPage,
    isLoading,
    error,
    canGoBack,
    canGoForward,
    handlePreviousPage,
    handleNextPage,
    handlePageSelect,
    handleRetry,
  } = useMovieList({
    initialMovies,
    filteredMovies,
    isFilterMode,
    searchFilters: searchFilters || undefined,
  });

  if (error && !isFilterMode) {
    return (
      <ErrorMessage
        title="無法載入熱門電影"
        message="載入熱門電影時發生錯誤，請稍後再試。"
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2
          id="movie-list-title"
          className="text-foreground text-xl font-bold sm:text-2xl md:text-3xl"
        >
          {title} {isFilterMode ? `(${totalResults})` : ''}
        </h2>
        {/* 分頁控制 - 只在非搜尋模式或搜尋結果有多頁時顯示 */}
        {(!isFilterMode || totalPages > 1) && (
          <Pagination
            currentPage={currentPage}
            canGoBack={canGoBack}
            canGoForward={canGoForward}
            totalPages={totalPages}
            isLoading={isLoading}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            onPageSelect={handlePageSelect}
            showTotalPages={true}
          />
        )}
      </div>

      {/* 電影網格 */}
      <div className="">
        {isLoading && !isFilterMode ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 20 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      {/* 底部分頁控制 - 只在非搜尋模式或搜尋結果有多頁時顯示 */}
      {(!isFilterMode || totalPages > 1) && (
        <div className="flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            canGoBack={canGoBack}
            canGoForward={canGoForward}
            totalPages={totalPages}
            isLoading={isLoading}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            onPageSelect={handlePageSelect}
            showTotalPages={true}
          />
        </div>
      )}
    </div>
  );
};