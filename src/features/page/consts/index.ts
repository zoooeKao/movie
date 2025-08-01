import { DiscoverMovieFilters } from '@/features/page/types'

// 評分刻度標記
export const VOTE_AVERAGE_TICKS = [0, 2, 4, 6, 8, 10]

// 片長刻度標記
export const RUNTIME_TICKS = [0, 100, 200, 300]

export const DEFAULT_FILTERS: DiscoverMovieFilters = {
  voteAverage: {
    range: [0, 10],
    step: 1,
  },
  runtime: {
    range: [0, 300],
    step: 50,
  },
  releaseDate: {
    to: new Date(),
  },
  genres: [],
}
