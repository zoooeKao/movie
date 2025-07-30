'use client';

import { DiscoverMovieFilters, Genre } from '@/types/movie';
import { Button } from '@/components/ui/button';

interface GenreFilterProps {
  genres: Genre[];
  filters: DiscoverMovieFilters;
  onGenreToggle: (genreId: number) => void;
}

export const GenreFilter = ({ genres, filters, onGenreToggle }: GenreFilterProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">類型</label>
      <div className="flex flex-wrap gap-2">
        {genres.map(genre => (
          <Button
            key={genre.id}
            variant={filters.genres.includes(genre.id) ? 'default' : 'secondary'}
            size="sm"
            onClick={() => onGenreToggle(genre.id)}
            className="rounded-full"
          >
            {genre.name}
          </Button>
        ))}
      </div>
    </div>
  );
}; 