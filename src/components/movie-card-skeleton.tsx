export const MovieCardSkeleton = () => {
  return (
    <div className='block'>
      <div className='group relative h-full bg-card rounded-lg overflow-hidden shadow-md'>
        {/* 電影海報骨架 */}
        <div className='relative aspect-[2/3] overflow-hidden bg-muted'>
          <div className='flex items-center justify-center h-full bg-muted'>
            <div className='w-full h-full bg-gradient-to-r from-muted via-muted-foreground/20 to-muted-foreground/10 animate-pulse rounded-lg' />
          </div>
        </div>

        {/* 電影資訊骨架 */}
        <div className='p-4'>
          <div className='h-7 bg-muted rounded animate-pulse mb-1'></div>
          <div className='h-5 bg-muted rounded animate-pulse w-24 mb-2'></div>
          <div className='space-y-1'>
            <div className='h-4 bg-muted rounded animate-pulse'></div>
            <div className='h-4 bg-muted rounded animate-pulse'></div>
            <div className='h-4 bg-muted rounded animate-pulse w-3/4'></div>
          </div>
        </div>
      </div>
    </div>
  );
}; 