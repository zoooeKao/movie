'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Movie, MoviesResponse } from '@/types/movie'
import { EmptyState } from '@/components/empty-state'
import { ErrorMessage } from '@/components/error-message'
import { MovieCard } from '@/components/movie-card'
import { MovieCardSkeleton } from '@/components/movie-card-skeleton'
import { Button } from '@/components/ui/button'
import { tmdbApi } from '@/lib/api'

export const Search = ({ searchKey }: { searchKey: string }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [movies, setMovies] = useState<Movie[]>([])

  const {
    data: searchData,
    error: searchDataError,
    isLoading: searchDataIsLoading,
  } = useSWR<MoviesResponse>(
    ['search', searchKey, currentPage],
    () => tmdbApi.searchMovies(searchKey, currentPage),
    {
      revalidateOnFocus: false,
    },
  )

  useEffect(() => {
    if (searchData) {
      setMovies(prevMovies => [...prevMovies, ...searchData.results])
    }
  }, [searchData])

  const totalPages = searchData?.total_pages || 1
  const totalResults = searchData?.total_results || 0

  const handleRetry = () => {
    setCurrentPage(1)
  }

  if (!!searchDataError) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <ErrorMessage
          title="無法載入搜尋結果"
          message="載入搜尋結果時發生錯誤，請稍後再試。"
          onRetry={handleRetry}
          className="w-full"
        />
      </div>
    )
  }

  if (searchData?.results.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <EmptyState title="找不到搜尋結果" message="請嘗試使用不同的搜尋關鍵字" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {searchDataIsLoading
          ? Array.from({ length: 20 }).map((_, index: number) => <MovieCardSkeleton key={index} />)
          : movies.map((movie: Movie) => <MovieCard key={movie.id} movie={movie} />)}
        {totalResults > movies.length && (
          <div className="col-span-full flex justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setCurrentPage(currentPage + 1)
              }}
            >
              載入更多 (還有 {totalPages - currentPage} 頁)
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
