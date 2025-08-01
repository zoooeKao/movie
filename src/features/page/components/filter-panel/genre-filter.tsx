'use client';

import { DiscoverMovieFilters } from '@/features/page/types'
import { Genre } from '@/types/movie'
import { Button } from '@/components/ui/button';


interface GenreFilterProps {
  genres: Genre[]
  filters: DiscoverMovieFilters
  setFilters: (
    filters: DiscoverMovieFilters | ((prev: DiscoverMovieFilters) => DiscoverMovieFilters),
  ) => void
}

export const GenreFilter = ({ genres, filters, setFilters }: GenreFilterProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">類型</label>
      <div className="flex flex-wrap gap-2">
        {genres.map(genre => (
          <Button
            key={genre.id}
            variant={filters.genres.includes(genre.id) ? 'default' : 'secondary'}
            size="sm"
            onClick={() =>
              setFilters(prev => ({
                ...prev,
                genres: prev.genres.includes(genre.id)
                  ? prev.genres.filter(id => id !== genre.id)
                  : [...prev.genres, genre.id],
              }))
            }
            className="rounded-full"
          >
            {genre.name}
          </Button>
        ))}
      </div>
    </div>
  )
}