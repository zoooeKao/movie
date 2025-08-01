'use client';

import { useState } from 'react';
import { DiscoverMovieFilters } from '@/features/page/types';
import { cn } from '@/utils/utils';
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';


interface DateFilterProps {
  filters: DiscoverMovieFilters
  setFilters: (
    filters: DiscoverMovieFilters | ((prev: DiscoverMovieFilters) => DiscoverMovieFilters),
  ) => void
}

export const DateFilter = ({ filters, setFilters }: DateFilterProps) => {
  const [fromDateOpen, setFromDateOpen] = useState(false)
  const [toDateOpen, setToDateOpen] = useState(false)

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* 開始日期 */}
      <div className="space-y-2">
        <label className="text-sm font-medium">發佈日期 - 開始</label>
        <Popover open={fromDateOpen} onOpenChange={setFromDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !filters.releaseDate?.from && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.releaseDate?.from ? (
                format(filters.releaseDate.from, 'yyyy/MM/dd')
              ) : (
                <span>選擇開始日期</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto max-w-sm p-0" align="start">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={filters.releaseDate?.from}
              onSelect={date => {
                setFilters(prev => {
                  const currentTo = prev.releaseDate?.to
                  // 如果選擇的開始日期晚於現有的結束日期，則清除結束日期
                  const shouldClearTo = date && currentTo && date > currentTo

                  return {
                    ...prev,
                    releaseDate: {
                      ...prev.releaseDate,
                      from: date,
                      to: shouldClearTo ? undefined : currentTo,
                    },
                  }
                })
                // 選擇日期後自動關閉 Popover
                setFromDateOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* 結束日期 */}
      <div className="space-y-2">
        <label className="text-sm font-medium">發佈日期 - 結束</label>
        <Popover open={toDateOpen} onOpenChange={setToDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !filters.releaseDate?.to && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.releaseDate?.to ? (
                format(filters.releaseDate.to, 'yyyy/MM/dd')
              ) : (
                <span>選擇結束日期</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto max-w-sm p-0" align="start">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={filters.releaseDate?.to}
              onSelect={date => {
                setFilters(prev => {
                  const currentFrom = prev.releaseDate?.from
                  // 如果選擇的結束日期早於現有的開始日期，則清除開始日期
                  const shouldClearFrom = date && currentFrom && date < currentFrom

                  return {
                    ...prev,
                    releaseDate: {
                      ...prev.releaseDate,
                      from: shouldClearFrom ? undefined : currentFrom,
                      to: date,
                    },
                  }
                })
                // 選擇日期後自動關閉 Popover
                setToDateOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}