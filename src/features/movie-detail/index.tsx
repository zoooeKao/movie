'use client';

import { useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { Calendar, ChevronDown, Clock, Heart, Play, Star } from 'lucide-react';
import { Credits, MovieDetails, ReviewsResponse, VideosResponse } from '@/types/movie';
import { ErrorMessage } from '@/components/error-message';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { tmdbApi } from '@/lib/api';
import { formatDate } from '@/lib/format-date';
import { formatRating } from '@/lib/format-rating';
import { cn } from '@/lib/utils';
import { useWatchList } from '@/hooks/use-watch-list';

const PER_VISIBLE_CAST_COUNT = 16;

interface MovieDetailClientProps {
  movieDetails: MovieDetails;
  credits: Credits;
  videos: VideosResponse;
}

const getMovieReviews = async (movieId: number): Promise<ReviewsResponse> => {
  return tmdbApi.getMovieReviews(movieId);
};

export const MovieDetail = ({ movieDetails, credits, videos }: MovieDetailClientProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [visibleCastCount, setVisibleCastCount] = useState(PER_VISIBLE_CAST_COUNT);
  const { isInWatchList, addToWatchList, removeFromWatchList } = useWatchList();

  const isInList = isInWatchList(movieDetails.id);

  // 載入評論
  const { data: reviewsData, error: reviewsError } = useSWR<ReviewsResponse>(
    ['movie-reviews', movieDetails.id],
    () => getMovieReviews(movieDetails.id),
    { revalidateOnFocus: false },
  );

  const handleWatchListClick = () => {
    if (isInList) {
      removeFromWatchList(movieDetails.id);
    } else {
      addToWatchList(movieDetails);
    }
  };

  const backdropUrl = tmdbApi.getBackdropImage(movieDetails.backdrop_path, 'w780');
  const posterUrl = tmdbApi.getPosterImage(movieDetails.poster_path, 'w500');

  // 找到預告片
  const trailer =
    videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube') ||
    videos.results[0];

  // 找到導演
  const director = credits.crew
    .filter(person => person.job === 'Director' || person.job === 'Characters')
    .map(({ name, job }) => {
      return { name, job };
    });

  // 主要演員
  const mainCast = credits.cast;

  // 評論
  const reviews = reviewsData?.results || [];

  return (
    <div className="min-h-screen">
      <div className="relative z-10 flex items-center justify-center py-8 sm:py-12 lg:justify-start lg:pl-8">
        {/* 背景圖片 */}
        {backdropUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={backdropUrl}
              alt={`${movieDetails.title} 的 Hero Image`}
              fill
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL="/public/images/image-blur.png"
            />
            <div className="absolute inset-0 bg-black/75" />
          </div>
        )}

        {/* 主要內容 */}
        <div className="relative z-10 flex items-center">
          {/* 電影資訊區域 */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
              {/* 海報 */}
              <div className="hidden flex-shrink-0 self-center sm:block lg:self-start">
                <div className="mx-auto w-64 max-w-full sm:w-72 lg:mx-0 lg:w-80">
                  {posterUrl ? (
                    <Image
                      src={posterUrl}
                      alt={movieDetails.title}
                      width={320}
                      height={480}
                      className="w-full rounded-lg shadow-2xl"
                      priority
                      placeholder="blur"
                      blurDataURL="/public/images/image-blur.png"
                    />
                  ) : (
                    <div className="bg-muted flex h-full items-center justify-center">
                      <div className="bg-red-to-r from-muted via-muted-foreground/20 to-muted-foreground/10 h-full w-full animate-pulse rounded-lg" />
                    </div>
                  )}
                </div>
              </div>

              {/* 電影詳情 */}
              <div className="flex-1 space-y-4 text-center text-white lg:space-y-6 lg:text-left">
                <div>
                  <h1 className="mb-2 text-2xl font-bold sm:text-3xl lg:text-5xl">
                    {movieDetails.title}
                  </h1>
                  {movieDetails.original_title !== movieDetails.title && (
                    <p className="mb-4 text-lg text-gray-300 sm:text-xl">
                      {movieDetails.original_title}
                    </p>
                  )}
                  {movieDetails.tagline && (
                    <p className="text-base text-gray-300 italic sm:text-lg">
                      &ldquo;{movieDetails.tagline}&rdquo;
                    </p>
                  )}
                </div>

                {/* 評分和基本資訊 */}
                <div className="flex flex-wrap items-center justify-center gap-2 text-sm sm:gap-4 lg:justify-start">
                  {movieDetails.vote_average > 0 && (
                    <div className="flex items-center gap-1 rounded-full bg-yellow-500 px-2 py-1 text-xs font-bold text-black sm:px-3 sm:text-sm">
                      <Star className="h-3 w-3 fill-current sm:h-4 sm:w-4" />
                      {formatRating(movieDetails.vote_average)}
                    </div>
                  )}

                  {movieDetails.release_date && (
                    <div className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-xs sm:px-3 sm:text-sm">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                      {formatDate(movieDetails.release_date)}
                    </div>
                  )}

                  {typeof movieDetails.runtime === 'number' && movieDetails.runtime > 0 && (
                    <div className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-xs sm:px-3 sm:text-sm">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      {movieDetails.runtime} 分鐘
                    </div>
                  )}
                </div>

                {/* 類型 */}
                {movieDetails.genres.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                    {movieDetails.genres.map(genre => (
                      <span
                        key={genre.id}
                        className="bg-primary/80 rounded-full px-2 py-1 text-xs text-white sm:px-3 sm:text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* 劇情簡介 */}
                {movieDetails.overview && (
                  <div className="flex flex-col gap-2">
                    <h2 className="mb-2 text-lg font-semibold sm:text-xl">劇情簡介</h2>
                    <p className="text-sm leading-relaxed text-gray-200 sm:text-base">
                      {movieDetails.overview}
                    </p>
                  </div>
                )}

                {/* 導演 */}
                {director.length > 0 && (
                  <div>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 lg:justify-start lg:gap-12">
                      {director.map(({ name, job }) => (
                        <div key={name} className="flex flex-col gap-1 text-gray-200">
                          <p className="text-base font-bold sm:text-lg">{name}</p>
                          <p className="text-xs font-light sm:text-sm">{job}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 動作按鈕 */}
                <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
                  <button
                    onClick={handleWatchListClick}
                    className={cn(
                      'flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors sm:px-6 sm:py-3 sm:text-base',
                      isInList
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-white/20 text-white hover:bg-white/30',
                    )}
                  >
                    <Heart className={cn('h-4 w-4 sm:h-5 sm:w-5', isInList && 'fill-current')} />
                    {isInList ? '從待看清單移除' : '加入待看清單'}
                  </button>

                  {trailer && (
                    <button
                      onClick={() => setSelectedVideo(trailer.key)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors sm:px-6 sm:py-3 sm:text-base"
                    >
                      <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                      觀看預告片
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 演員陣容 */}
      {mainCast.length > 0 && (
        <section className="bg-background py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center gap-2 sm:mb-8">
              <h2 className="text-xl font-bold sm:text-2xl">主要演員</h2>
              <p className="text-muted-foreground text-sm">
                顯示 {Math.min(visibleCastCount, mainCast.length)} / {mainCast.length} 位
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8">
              {mainCast.slice(0, visibleCastCount).map(actor => (
                <div key={actor.id} className="text-center">
                  {actor.profile_path ? (
                    <Image
                      src={tmdbApi.getProfileImage(actor.profile_path, 'w185') || ''}
                      alt={actor.name}
                      width={120}
                      height={180}
                      className="mb-2 aspect-[2/3] w-full rounded-lg object-cover"
                    />
                  ) : (
                    <div className="bg-muted mb-2 flex aspect-[2/3] w-full items-center justify-center rounded-lg">
                      <div className="text-2xl sm:text-4xl">👤</div>
                    </div>
                  )}
                  <p className="line-clamp-2 text-xs font-semibold sm:text-sm">{actor.name}</p>
                  <p className="text-muted-foreground line-clamp-2 text-xs">{actor.character}</p>
                </div>
              ))}
            </div>

            {/* 顯示更多按鈕 */}
            {visibleCastCount < mainCast.length && (
              <div className="mt-6 flex justify-center sm:mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setVisibleCastCount(prev => Math.min(prev + 16, mainCast.length))}
                  className="px-6 sm:px-8"
                >
                  <ChevronDown className="mr-2 h-4 w-4" />
                  顯示更多 (剩餘 {mainCast.length - visibleCastCount} 位)
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 評論區域 */}
      <section className="bg-muted/50 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-bold sm:mb-8 sm:text-2xl">觀眾評論</h2>

          {reviewsError ? (
            <ErrorMessage title="無法載入評論" message="載入評論時發生錯誤。" />
          ) : !reviewsData ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center">目前沒有評論</div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="bg-card rounded-lg p-4 sm:p-6">
                  <div className="mb-3 flex items-start justify-between sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold sm:h-10 sm:w-10 sm:text-base">
                        {review.author[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold sm:text-base">{review.author}</p>
                        <p className="text-muted-foreground text-xs sm:text-sm">
                          {formatDate(review.created_at)}
                        </p>
                      </div>
                    </div>
                    {review.author_details.rating && (
                      <div className="flex items-center gap-1 text-sm text-yellow-500">
                        <Star className="h-3 w-3 fill-current sm:h-4 sm:w-4" />
                        {review.author_details.rating}
                      </div>
                    )}
                  </div>
                  <p className="text-foreground line-clamp-4 text-sm leading-relaxed sm:text-base">
                    {review.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 預告片模態窗 */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="bg-background max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg">
            <div className="flex items-center justify-between border-b p-3 sm:p-4">
              <h3 className="text-base font-semibold sm:text-lg">預告片</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-muted-foreground hover:text-foreground text-lg sm:text-xl"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};