import { useState, useCallback } from 'react';
import { DiscoverMovieFilters } from '@/types/movie';
import { DEFAULT_FILTERS } from '@/features/page/consts';
import { FilterState, FilterActions } from '@/features/page/types';

/**
 * 處理篩選器狀態管理的 hook
 */
export const useFilters = (): FilterState & FilterActions => {
  const [filters, setFilters] = useState<DiscoverMovieFilters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<DiscoverMovieFilters | null>(null);

  const updateFilters = useCallback(
    (newFilters: DiscoverMovieFilters | ((prev: DiscoverMovieFilters) => DiscoverMovieFilters)) => {
      setFilters(newFilters);
    },
    [],
  );

  const scrollToTop = useCallback(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  const handleSearch = useCallback(() => {
    setAppliedFilters({ ...filters });
  }, [filters]);

  const handleSearchWithScroll = useCallback(() => {
    handleSearch();
    scrollToTop();
  }, [handleSearch, scrollToTop]);

  const handleGenreToggle = useCallback((genreId: number) => {
    setFilters(prev => ({
      ...prev,
      genres: prev.genres.includes(genreId)
        ? prev.genres.filter(id => id !== genreId)
        : [...prev.genres, genreId],
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setAppliedFilters(null);
  }, []);

  // 計算衍生狀態
  const hasAppliedFilters = !!appliedFilters;

  return {
    // 狀態
    filters,
    appliedFilters,
    hasAppliedFilters,
    hasError: false, // 這將由使用此 hook 的元件設定
    hasResults: false, // 這將由使用此 hook 的元件設定
    
    // 操作
    setFilters: updateFilters,
    handleSearch,
    handleSearchWithScroll,
    handleGenreToggle,
    resetFilters,
    scrollToTop,
  };
}; 