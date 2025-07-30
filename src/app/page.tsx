import { Suspense } from 'react';
import { SearchMovies } from '@/features/page';
import { FilterPanel } from '@/features/page/components/filter-panel';
import { MoviesResponse } from '@/types/movie';
import { ErrorMessage } from '@/components/error-message';
import { LoadingSpinner } from '@/components/loading-spinner';
import { tmdbApi } from '@/lib/api';

export default async function Home() {
  // 使用 server component 載入初始熱門電影資料
  try {
    const popularMovies: MoviesResponse = (await tmdbApi.getPopularMovies(1)) as MoviesResponse;

    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* 主標題和描述 */}
        <div className="mb-12 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold md:text-6xl">探索電影世界</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            搜尋您喜愛的電影，查看詳細資訊，並建立專屬的待看清單
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          }
        >
          <SearchMovies initialMovies={popularMovies} />
        </Suspense>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* 主標題和描述 */}
        <div className="mb-12 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold md:text-6xl">探索電影世界</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            搜尋您喜愛的電影，查看詳細資訊，並建立專屬的待看清單
          </p>
        </div>

        <div className="space-y-8">
          {/* 篩選器 */}
          <FilterPanel
            filters={{
              voteAverage: {
                range: [0, 10],
                step: 1,
              },
              runtime: {
                range: [0, 400],
                step: 10,
              },
              genres: [],
            }}
            setFilters={() => {}}
            genres={[]}
            isLoading={false}
            onSearch={() => {}}
            onGenreToggle={() => {}}
          />

          {/* 錯誤訊息 */}
          <ErrorMessage title="無法載入熱門電影" message="載入熱門電影時發生錯誤，請稍後再試。" />
        </div>
      </div>
    );
  }
}