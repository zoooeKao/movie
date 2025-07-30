import { tmdbApi } from '@/lib/api';
import { DiscoverMovieFilters, Genre, MoviesResponse } from '@/types/movie';
import { convertFiltersToApiParams } from '@/features/page/utils/filter-params';

/**
 * 電影服務層，封裝所有電影相關的 API 呼叫
 */
export const movieService = {
  /**
   * 取得熱門電影
   */
  async getPopularMovies(page: number = 1): Promise<MoviesResponse> {
    return tmdbApi.getPopularMovies(page) as unknown as MoviesResponse;
  },

  /**
   * 取得電影類型
   */
  async getGenres(): Promise<{ genres: Genre[] }> {
    return tmdbApi.getGenres();
  },

  /**
   * 根據篩選條件搜尋電影
   */
  async searchMoviesByFilters(
    filters: DiscoverMovieFilters,
    page: number = 1,
  ): Promise<MoviesResponse> {
    const params = convertFiltersToApiParams(filters);
    return tmdbApi.discoverMovies({ ...params, page });
  },
};

/**
 * SWR key 產生器，統一管理快取鍵
 */
export const swrKeys = {
  genres: 'genres',
  popularMovies: (page: number) => ['popular-movies', page],
  searchMovies: (filters: DiscoverMovieFilters, page: number) => [
    'search-movies',
    filters,
    page,
  ],
  discoverMovies: (filters: DiscoverMovieFilters) => ['discover-movies', filters],
} as const; 