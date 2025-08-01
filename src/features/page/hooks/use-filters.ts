import { useCallback, useState } from 'react';
import { DEFAULT_FILTERS } from '@/features/page/consts';
import { DiscoverMovieFilters, FilterActions, FilterResultData, FilterState, GenresData } from '@/features/page/types';
import { convertFiltersToApiParams } from '@/features/page/utils/filter-params';
import { scrollToMovieList } from '@/utils/scroll-utils';
import useSWR from 'swr';
import { tmdbApi } from '@/lib/api';


/**
 * 處理篩選器狀態管理的 hook
 */
export const useFilters = (): FilterState & FilterActions & FilterResultData & GenresData => {
  const [filters, setFilters] = useState<DiscoverMovieFilters>(DEFAULT_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<DiscoverMovieFilters | null>(null)

  const {
    data: genresData,
    error: genresDataError,
    isLoading: genresDataIsLoading,
  } = useSWR('genres', tmdbApi.getGenres, {
    revalidateOnFocus: false,
  })

  const {
    data: filterData,
    error: filterDataError,
    isLoading: filterDataIsLoading,
  } = useSWR(
    appliedFilters ? ['discover-movies', appliedFilters] : null,
    () => {
      const params = convertFiltersToApiParams(appliedFilters || DEFAULT_FILTERS)
      return tmdbApi.discoverMovies(params)
    },
    {
      revalidateOnFocus: false,
    },
  )

  const updateFilters = useCallback(
    (newFilters: DiscoverMovieFilters | ((prev: DiscoverMovieFilters) => DiscoverMovieFilters)) => {
      setFilters(newFilters)
    },
    [],
  )

  const handleSearch = useCallback(() => {
    setAppliedFilters({ ...filters })
  }, [filters])

  const handleSearchWithScroll = useCallback(() => {
    handleSearch()
    scrollToMovieList()
  }, [handleSearch, scrollToMovieList])

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setAppliedFilters(null)
  }, [])

  const hasAppliedFilters = !!appliedFilters
  const hasFilterData = !!filterData?.results && filterData.results.length > 0

  return {
    // 電影類型資料
    genres: genresData?.genres || [],
    genresDataError,
    genresDataIsLoading,

    filterData,
    filterDataError,
    filterDataIsLoading,

    // 狀態
    filters,
    appliedFilters,
    hasAppliedFilters,
    hasFilterData,

    // 操作
    setFilters: updateFilters,
    handleSearch,
    handleSearchWithScroll,
    resetFilters,
  }
}