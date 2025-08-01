import { Genre, MoviesResponse } from '@/types/movie'

// 搜尋篩選參數介面
export interface DiscoverMovieFilters {
  voteAverage: {
    range: [number, number]
    step: number
  }
  releaseDate?: {
    from?: Date
    to?: Date
  }
  runtime: {
    range: [number, number]
    step: number
  }
  genres: number[]
}

export interface DiscoverMovieParams {
  page?: number
  release_date_gte?: string
  release_date_lte?: string
  vote_average_gte?: number
  vote_average_lte?: number
  with_runtime_gte?: number
  with_runtime_lte?: number
  with_genres?: string
}

// 篩選器狀態介面
export interface FilterState {
  filters: DiscoverMovieFilters
  appliedFilters: DiscoverMovieFilters | null
  hasAppliedFilters: boolean
  hasFilterData: boolean
}

// 篩選器操作介面
export interface FilterActions {
  setFilters: (
    filters: DiscoverMovieFilters | ((prev: DiscoverMovieFilters) => DiscoverMovieFilters),
  ) => void
  handleSearch: () => void
  handleSearchWithScroll: () => void
  resetFilters: () => void
}

// 類型資料介面
export interface GenresData {
  genres: Genre[]
  genresDataError: any
  genresDataIsLoading: boolean
}

// 篩選結果資料介面
export interface FilterResultData {
  filterData: MoviesResponse | undefined
  filterDataError: any
  filterDataIsLoading: boolean
}

// 電影列表狀態介面
export interface MovieListState {
  movies: any[]
  totalPages: number
  totalResults: number
  currentPage: number
  isLoading: boolean
  error: any
  canGoBack: boolean
  canGoForward: boolean
}

// 電影列表操作介面
export interface MovieListActions {
  handlePreviousPage: () => void
  handleNextPage: () => void
  handlePageSelect: (page: number) => void
  handleRetry: () => void
  resetToFirstPage: () => void
  setCurrentPage: (page: number) => void
}

// 分頁選項介面
export interface PaginationOption {
  value: number
  label: string
  disabled?: boolean
}

// 分頁狀態介面
export interface PaginationState {
  open: boolean
  pageOptions: PaginationOption[]
}

// 分頁操作介面
export interface PaginationActions {
  handlePageSelect: (selectedPage: number, onPageSelect?: (page: number) => void) => void
  toggleOpen: () => void
  closePopover: () => void
  setOpen: (open: boolean) => void
}
