import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { MoviesResponse, DiscoverMovieFilters } from '@/types/movie'
import { scrollToMovieList } from '@/lib/scroll-utils'
import { movieService, swrKeys } from '@/features/page/services/movie-service'
import { MovieListState, MovieListActions } from '@/features/page/types'

interface UseMovieListProps {
  initialMovies: MoviesResponse
  filteredMovies?: MoviesResponse | null
  isFilterMode?: boolean
  searchFilters?: DiscoverMovieFilters
}

export const useMovieList = ({
  initialMovies,
  filteredMovies,
  isFilterMode = false,
  searchFilters,
}: UseMovieListProps): MovieListState & MovieListActions => {
  const [currentPage, setCurrentPage] = useState(1)

  // 當搜尋條件改變時重置到第一頁
  useEffect(() => {
    if (isFilterMode && searchFilters) {
      setCurrentPage(1)
    }
  }, [isFilterMode, searchFilters])

  // 熱門電影的 SWR
  const { data: popularData, error: popularError, isLoading: popularIsLoading } = useSWR<MoviesResponse>(
    !isFilterMode ? swrKeys.popularMovies(currentPage) : null,
    () => movieService.getPopularMovies(currentPage),
    {
      fallbackData: currentPage === 1 && !isFilterMode ? initialMovies : undefined,
      revalidateOnFocus: true,
    },
  )

  // 搜尋結果的 SWR
  const { data: searchData, error: searchError, isLoading: searchIsLoading } = useSWR<MoviesResponse>(
    isFilterMode && searchFilters ? swrKeys.searchMovies(searchFilters, currentPage) : null,
    () => movieService.searchMoviesByFilters(searchFilters!, currentPage),
    {
      fallbackData: currentPage === 1 && isFilterMode && filteredMovies ? filteredMovies : undefined,
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    },
  )

  // 根據模式選擇對應的資料和狀態
  const data = isFilterMode ? searchData : popularData
  const error = isFilterMode ? searchError : popularError
  const isLoading = isFilterMode ? searchIsLoading : popularIsLoading

  // 如果是搜尋模式但沒有 searchFilters，則使用傳入的 filteredMovies（向後相容）
  const finalData = isFilterMode && !searchFilters ? filteredMovies : data

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