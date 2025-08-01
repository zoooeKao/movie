import { DiscoverMovieFilters, DiscoverMovieParams } from '@/features/page/types'
import { format } from 'date-fns'

/**
 * 將篩選器參數轉換為 API 參數格式
 */
export const convertFiltersToApiParams = (filters: DiscoverMovieFilters): DiscoverMovieParams => {
  const params: Record<string, any> = {}

  // 評分範圍
  if (filters.voteAverage) {
    params.vote_average_gte = filters.voteAverage.range[0]
    params.vote_average_lte = filters.voteAverage.range[1]
  }

  // 發佈日期範圍
  if (filters.releaseDate?.from) {
    params.release_date_gte = format(filters.releaseDate.from, 'yyyy-MM-dd')
  }

  if (filters.releaseDate?.to) {
    params.release_date_lte = format(filters.releaseDate.to, 'yyyy-MM-dd')
  }

  // 片長範圍
  if (filters.runtime) {
    params.with_runtime_gte = filters.runtime.range[0]
    params.with_runtime_lte = filters.runtime.range[1]
  }

  // 電影類型
  if (filters.genres && filters.genres.length > 0) {
    params.with_genres = filters.genres.join(',')
  }

  return params
}
