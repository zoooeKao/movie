import { WatchListContextType } from "@/types/watch-list";
import { useContext } from "react";
import { WatchListContext } from "@/contexts/watch-list-provider";

export const useWatchList = (): WatchListContextType => {
  const context = useContext(WatchListContext);
  if (context === undefined) {
    throw new Error('useWatchList must be used within a WatchListProvider');
  }
  return context;
};
