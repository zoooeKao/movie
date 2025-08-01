'use client';

import { useState } from 'react';
import { useWatchList } from '@/hooks/use-watch-list';
import { formatDate } from '@/utils/format-date';
import { CalendarIcon, Trash2, X } from 'lucide-react';
import { EmptyState } from '@/components/empty-state';
import { MovieCard } from '@/components/movie-card'


export const WatchList = () => {
  const { watchList, clearWatchList } = useWatchList();
  const [sortBy, setSortBy] = useState<'added' | 'date'>('added');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearAll = () => {
    clearWatchList();
    setShowClearConfirm(false);
  };

  const sortedWatchList = [...watchList].sort((a, b) => {
    switch (sortBy) {
      case 'added':
        // 越晚加入的排越前面
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      case 'date':
        return new Date(b.movie.release_date).getTime() - new Date(a.movie.release_date).getTime();
      default:
        return 0;
    }
  });

  if (watchList.length === 0) {
    return (
      <EmptyState
        title="待看清單是空的"
        message="當您找到喜歡的電影時，可以將它們加入待看清單中。"
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* 控制列 */}
      <div className="flex items-center justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground pr-3 text-sm">共 {watchList.length} 部電影</span>
            <span className="text-muted-foreground text-sm">排序：</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="border-border bg-background text-foreground rounded-md border px-2 py-1 text-sm"
            >
              <option value="added">加入時間</option>
              <option value="date">上映日期</option>
            </select>
          </div>
        </div>

        {watchList.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="flex items-center gap-2 rounded-md px-4 py-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            清空清單
          </button>
        )}
      </div>

      {/* 電影網格 */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {sortedWatchList.map(item => (
          <div key={item.id} className="relative">
            <MovieCard movie={item.movie} />

            {/* 加入日期 */}
            <div className="text-muted-foreground mt-2 flex items-center gap-1 text-xs">
              <CalendarIcon className="h-3 w-3" />
              {formatDate(item.addedAt)}
            </div>
          </div>
        ))}
      </div>

      {/* 清空確認對話窗 */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background w-full max-w-md rounded-lg p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">確認清空清單</h3>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-muted-foreground mb-6">確定要清空所有待看清單嗎？此動作無法撤銷。</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="text-foreground hover:bg-muted rounded-md px-4 py-2 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleClearAll}
                className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
              >
                確認清空
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};