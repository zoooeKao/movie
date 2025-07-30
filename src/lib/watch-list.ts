import {Movie, WatchListItem} from '@/types/movie';

const WATCH_LIST_KEY = 'movie-watch-list';

// 取得待看清單
export const getWatchList = (): WatchListItem[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(WATCH_LIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse watch-list from localStorage:', error);
    return [];
  }
};

// 儲存待看清單
export const saveWatchList = (watchList: WatchListItem[]): void => {
  try {
    localStorage.setItem(WATCH_LIST_KEY, JSON.stringify(watchList));
  } catch (error) {
    console.error('Failed to save watch-list to localStorage:', error);
  }
};

// 加入電影到待看清單
export const addToWatchList = (movie: Movie): boolean => {
  const watchList = getWatchList();
  const exists = watchList.some((item) => item.movie.id === movie.id);

  if (exists) {
    return false; // 已存在
  }

  const newItem: WatchListItem = {
    id: Date.now(),
    movie,
    addedAt: new Date().toISOString(),
  };

  const updatedWatchList = [newItem, ...watchList];
  saveWatchList(updatedWatchList);
  return true;
};

// 從待看清單移除電影
export const removeFromWatchList = (movieId: number): boolean => {
  const watchList = getWatchList();
  const filteredWatchList = watchList.filter((item) => item.movie.id !== movieId);

  if (filteredWatchList.length === watchList.length) {
    return false; // 沒有找到要移除的項目
  }

  saveWatchList(filteredWatchList);
  return true;
};

// 檢查電影是否在待看清單中
export const isInWatchList = (movieId: number): boolean => {
  const watchList = getWatchList();
  return watchList.some((item) => item.movie.id === movieId);
};

// 清空待看清單
export const clearWatchList = (): void => {
  saveWatchList([]);
};

// 取得待看清單數量
export const getWatchListCount = (): number => {
  return getWatchList().length;
};
