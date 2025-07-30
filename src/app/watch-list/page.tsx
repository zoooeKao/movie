import { WatchList } from '@/features/watch-list';

export default function WatchListPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-foreground mb-2 text-3xl font-bold md:text-4xl">我的待看清單</h1>
        <p className="text-muted-foreground">您收藏的電影清單，隨時可以查看和管理</p>
      </div>

      <WatchList />
    </div>
  );
}
