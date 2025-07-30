import { Movie } from "./movie";


export interface WatchListItem {
  id: number;
  movie: Movie;
  addedAt: string;
}

export interface WatchListContextType {
  watchList: WatchListItem[];
  watchListCount: number;
  addToWatchList: (movie: Movie) => boolean;
  removeFromWatchList: (movieId: number) => boolean;
  isInWatchList: (movieId: number) => boolean;
  clearWatchList: () => void;
}