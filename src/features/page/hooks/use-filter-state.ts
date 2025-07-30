import { useFilterSearch } from './use-filter-search';
import { useFilters } from './use-filters';
import { useGenres } from './use-genres';

/**
 * 整合的篩選器狀態管理 hook
 * 整合了篩選器狀態、電影類型資料和搜尋結果
 */
export const useFilterState = () => {
  // 使用拆分後的 hooks
  const filterState = useFilters();
  const genresData = useGenres();
  const searchData = useFilterSearch({ appliedFilters: filterState.appliedFilters });

  // 計算衍生狀態
  const hasError = !!searchData.filterDataError;
  const hasResults = searchData.filterData?.results && searchData.filterData.results.length > 0;

  return {
    // 篩選器狀態和操作
    ...filterState,
    hasError,
    hasResults,

    // 電影類型資料
    ...genresData,

    // 搜尋結果資料
    ...searchData,
  };
};
