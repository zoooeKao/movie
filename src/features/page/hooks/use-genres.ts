import useSWR from 'swr';
import { movieService, swrKeys } from '@/features/page/services/movie-service';
import { GenresData } from '@/features/page/types';

/**
 * 處理電影類型資料的 hook
 */
export const useGenres = (): GenresData => {
  const {
    data: genresData,
    error: genresError,
    isLoading: genresIsLoading,
  } = useSWR(swrKeys.genres, movieService.getGenres, {
    revalidateOnFocus: false,
  });

  return {
    genres: genresData?.genres || [],
    genresError,
    genresIsLoading,
  };
}; 