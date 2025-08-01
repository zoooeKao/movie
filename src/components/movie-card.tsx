'use client';

import { useWatchList } from '@/hooks/use-watch-list';
import { formatRating } from '@/utils/format-rating';
import { cn } from '@/utils/utils';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'
import { Movie } from '@/types/movie'
import { tmdbApi } from '@/lib/api'


interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { isInWatchList, addToWatchList, removeFromWatchList } = useWatchList();

  const isInList = isInWatchList(movie.id);

  const handleWatchListClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInList) {
      removeFromWatchList(movie.id);
    } else {
      addToWatchList(movie)
    }
  };

  const posterUrl = tmdbApi.getPosterImage(movie.poster_path, 'w500');

  return (
    <Link href={`/movie-detail/${movie.id}`} className="block">
      <div className="group bg-card relative h-full overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:scale-102 hover:shadow-xl">
        {/* 電影海報 */}
        <div className="bg-muted relative aspect-[2/3] overflow-hidden">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              priority
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw" //告訴瀏覽器在各裝置佔幾 % 寬度
            />
          ) : (
            <div className="bg-muted flex h-full items-center justify-center">
              <div className="from-muted via-muted-foreground/20 to-muted-foreground/10 h-full w-full animate-pulse rounded-lg bg-gradient-to-r" />
            </div>
          )}

          {/* 評分標籤 */}
          {movie.vote_average > 0 && (
            <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-yellow-500 px-2 py-1 text-sm font-bold text-black">
              <Star className="h-3 w-3 fill-current" />
              {formatRating(movie.vote_average)}
            </div>
          )}

          {/* 待看清單按鈕 */}
          <button
            onClick={handleWatchListClick}
            className={`transition-colors' absolute top-2 right-2 rounded-full p-2 ${isInList ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'}`}
            aria-label={isInList ? '從待看清單移除' : '加入待看清單'}
          >
            <Heart className={cn('h-4 w-4', isInList && 'fill-current')} />
          </button>
        </div>

        {/* 電影資訊 */}
        <div className="p-4">
          <h3
            title={movie.title}
            className="group-hover:text-primary line-clamp-1 text-lg font-bold transition-colors duration-300"
          >
            {movie.title}
          </h3>
          <p className="text-muted-foreground mt-1 text-sm">{movie.release_date}</p>
          <p title={movie.overview} className="text-muted-foreground mt-2 line-clamp-3 text-sm">
            {movie.overview}
          </p>
        </div>
      </div>
    </Link>
  );
};