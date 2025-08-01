import { useEffect, useState } from 'react';
import { DEFAULT_FILTERS } from '@/features/page/consts';
import { MovieListActions, MovieListState } from '@/features/page/types';
import { DiscoverMovieFilters } from '@/features/page/types';
import { convertFiltersToApiParams } from '@/features/page/utils/filter-params';
import { scrollToMovieList } from '@/utils/scroll-utils';
import useSWR from 'swr';
import { MoviesResponse } from '@/types/movie'
import { tmdbApi } from '@/lib/api'


interface UseMovieListProps {
  initialMovies: MoviesResponse
  filteredMovies?: MoviesResponse | null
  isFilterMode?: boolean
  appliedFilters?: DiscoverMovieFilters
}

export const useMovieList = ({
  initialMovies,
  filteredMovies,
  isFilterMode = false,
  appliedFilters,
}: UseMovieListProps): MovieListState & MovieListActions => {
  const [currentPage, setCurrentPage] = useState(1)

  // 當搜尋條件改變時重置到第一頁
  useEffect(() => {
    if (isFilterMode && appliedFilters) {
      setCurrentPage(1)
    }
  }, [isFilterMode, appliedFilters])

  const {
    data: popularData,
    error: popularError,
    isLoading: popularIsLoading,
  } = useSWR<MoviesResponse>(
    !isFilterMode ? ['popular-movies', currentPage] : null,
    () => tmdbApi.getPopularMovies(currentPage) as Promise<MoviesResponse>,
    {
      fallbackData: currentPage === 1 && !isFilterMode ? initialMovies : undefined,
      revalidateOnFocus: false,
    },
  )

  const {
    data: filterData,
    error: filterDataError,
    isLoading: filterDataIsLoading,
  } = useSWR<MoviesResponse>(
    isFilterMode && appliedFilters ? ['discover-movies', appliedFilters, currentPage] : null,
    () => {
      const params = convertFiltersToApiParams(appliedFilters || DEFAULT_FILTERS)
      return tmdbApi.discoverMovies({ ...params, page: currentPage })
    },
    {
      fallbackData:
        currentPage === 1 && isFilterMode && filteredMovies ? filteredMovies : undefined,
      revalidateOnFocus: false,
    },
  )

  const data = isFilterMode ? filterData : popularData
  const error = isFilterMode ? filterDataError : popularError
  const isLoading = isFilterMode ? filterDataIsLoading : popularIsLoading

  // 如果是搜尋模式但沒有 appliedFilters，則使用傳入的 filteredMovies（向後相容）
  const finalData = isFilterMode && !appliedFilters ? filteredMovies : data

  const movies = finalData?.results || []
  const totalPages = finalData?.total_pages || 1
  const totalResults = finalData?.total_results || 0

  const canGoBack = currentPage > 1
  const canGoForward = currentPage < totalPages

  const handlePreviousPage = () => {
    if (canGoBack) {
      setCurrentPage(currentPage - 1)
      scrollToMovieList()
    }
  }

  const handleNextPage = () => {
    if (canGoForward) {
      setCurrentPage(currentPage + 1)
      scrollToMovieList()
    }
  }

  const handlePageSelect = (page: number) => {
    setCurrentPage(page)
    scrollToMovieList()
  }

  const handleRetry = () => {
    setCurrentPage(1)
  }

  // 當搜尋條件改變時重置到第一頁
  const resetToFirstPage = () => {
    setCurrentPage(1)
  }

  return {
    // 資料狀態
    movies,
    totalPages,
    totalResults,
    currentPage,
    isLoading,
    error,

    // 分頁狀態
    canGoBack,
    canGoForward,

    // 事件處理器
    handlePreviousPage,
    handleNextPage,
    handlePageSelect,
    handleRetry,
    resetToFirstPage,

    // 工具函數
    setCurrentPage,
  }
}