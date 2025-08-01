import { Suspense } from 'react';
import { MovieDetail } from '@/features/movie-detail';
import { notFound } from 'next/navigation';
import { LoadingSpinner } from '@/components/loading-spinner';
import { tmdbApi } from '@/lib/api';


interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params;
  const movieId = parseInt(id)

  if (isNaN(movieId)) {
    notFound();
  }

  // 使用 server component 載入初始資料
  try {
    const movieDetails = await tmdbApi.getMovieDetails(movieId);
    const credits = await tmdbApi
      .getMovieCredits(movieId)
      .catch(() => ({ id: NaN, cast: [], crew: [] }));
    const videos = await tmdbApi.getMovieVideos(movieId).catch(() => ({ id: NaN, results: [] }));
    console.log('movieDetails', movieDetails);
    console.log('credits', credits);
    console.log('videos', videos);

    return (
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <MovieDetail movieDetails={movieDetails} credits={credits} videos={videos} />
      </Suspense>
    );
  } catch (error) {
    notFound();
  }
}