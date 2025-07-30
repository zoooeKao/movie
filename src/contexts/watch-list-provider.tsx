'use client';

import { ReactNode, createContext, useEffect, useState } from 'react';
import { Movie } from '@/types/movie';
import { WatchListContextType, WatchListItem } from '@/types/watch-list';
import { getWatchList, saveWatchList } from '@/lib/watch-list';

export const WatchListContext = createContext<WatchListContextType | undefined>(undefined);

const WATCH_LIST_KEY = 'movie-watch-list';

// 本地存儲操作函數
// const loadWatchListFromStorage = (): WatchListItem[] => {
//   return getWatchList();
// };

// const saveWatchListToStorage = (watchList: WatchListItem[]): void => {
//   return saveWatchList(watchList);
// };

export const WatchListProvider = ({ children }: { children: ReactNode }) => {
  const [watchList, setWatchList] = useState<WatchListItem[]>([]);

  // 初始化載入
  useEffect(() => {
    setWatchList(getWatchList());
  }, []);

  // 監聽其他標籤頁的變更
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     setWatchList(getWatchList());
  //   };

  //   window.addEventListener('storage', handleStorageChange);
  //   return () => window.removeEventListener('storage', handleStorageChange);
  // }, []);

  const addToWatchList = (movie: Movie): boolean => {
    const exists = watchList.some(item => item.movie.id === movie.id);
    if (exists) return false;

    const newItem: WatchListItem = {
      id: Date.now(),
      movie,
      addedAt: new Date().toISOString(),
    };

    const updatedWatchList = [newItem, ...watchList];
    setWatchList(updatedWatchList);
    saveWatchList(updatedWatchList);
    return true;
  };

  const removeFromWatchList = (movieId: number): boolean => {
    const filteredWatchList = watchList.filter(item => item.movie.id !== movieId);
    if (filteredWatchList.length === watchList.length) return false;

    setWatchList(filteredWatchList);
    saveWatchList(filteredWatchList);
    return true;
  };

  const clearWatchList = (): void => {
    setWatchList([]);
    saveWatchList([]);
  };

  const isInWatchList = (movieId: number): boolean => {
    return watchList.some(item => item.movie.id === movieId);
  };

  const value: WatchListContextType = {
    watchList,
    watchListCount: watchList.length,
    addToWatchList,
    removeFromWatchList,
    clearWatchList,
    isInWatchList,
  };

  return <WatchListContext.Provider value={value}>{children}</WatchListContext.Provider>;
};