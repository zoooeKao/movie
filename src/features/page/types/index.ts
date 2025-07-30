import { DiscoverMovieFilters, Genre, MoviesResponse } from '@/types/movie';

/**
 * 篩選器狀態介面
 */
export interface FilterState {
  filters: DiscoverMovieFilters;
  appliedFilters: DiscoverMovieFilters | null;
  hasAppliedFilters: boolean;
  hasError: boolean;
  hasResults: boolean;
}

/**
 * 篩選器操作介面
 */
export interface FilterActions {
  setFilters: (
    filters: DiscoverMovieFilters | ((prev: DiscoverMovieFilters) => DiscoverMovieFilters),
  ) => void;
  handleSearch: () => void;
  handleSearchWithScroll: () => void;
  handleGenreToggle: (genreId: number) => void;
  resetFilters: () => void;
  scrollToTop: () => void;
}

/**
 * 類型資料介面
 */
export interface GenresData {
  genres: Genre[];
  genresError: any;
  genresIsLoading: boolean;
}

/**
 * 篩選結果資料介面
 */
export interface FilterResultData {
  filterData: MoviesResponse | undefined;
  filterDataError: any;
  filterDataIsLoading: boolean;
}

/**
 * 電影列表狀態介面
 */
export interface MovieListState {
  movies: any[];
  totalPages: number;
  totalResults: number;
  currentPage: number;
  isLoading: boolean;
  error: any;
  canGoBack: boolean;
  canGoForward: boolean;
}

/**
 * 電影列表操作介面
 */
export interface MovieListActions {
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handlePageSelect: (page: number) => void;
  handleRetry: () => void;
  resetToFirstPage: () => void;
  setCurrentPage: (page: number) => void;
}

/**
 * 分頁選項介面
 */
export interface PaginationOption {
  value: number;
  label: string;
  disabled?: boolean;
}

/**
 * 分頁狀態介面
 */
export interface PaginationState {
  open: boolean;
  pageOptions: PaginationOption[];
}

/**
 * 分頁操作介面
 */
export interface PaginationActions {
  handlePageSelect: (selectedPage: number, onPageSelect?: (page: number) => void) => void;
  toggleOpen: () => void;
  closePopover: () => void;
  setOpen: (open: boolean) => void;
} 