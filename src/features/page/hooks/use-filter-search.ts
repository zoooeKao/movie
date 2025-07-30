import useSWR from 'swr';
import { DiscoverMovieFilters } from '@/types/movie';
import { movieService, swrKeys } from '@/features/page/services/movie-service';
import { FilterResultData } from '@/features/page/types';

interface UseFilterSearchProps {
  appliedFilters: DiscoverMovieFilters | null;
}

/**
 * 處理篩選器搜尋邏輯的 hook
 */
export const useFilterSearch = ({ appliedFilters }: UseFilterSearchProps): FilterResultData => {
  const {
    data: filterData,
    error: filterDataError,
    isLoading: filterDataIsLoading,
  } = useSWR(
    appliedFilters ? swrKeys.discoverMovies(appliedFilters) : null,
    () => movieService.searchMoviesByFilters(appliedFilters!),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    },
  );

  return {
    filterData,
    filterDataError,
    filterDataIsLoading,
  };
}; 