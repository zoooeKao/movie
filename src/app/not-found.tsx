import Link from 'next/link';
import {Home, Search} from 'lucide-react';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center'>
      <div className='text-center max-w-md mx-auto px-4'>
        <div className='text-8xl mb-8'>🎬</div>
        <h1 className='text-4xl font-bold text-foreground mb-4'>頁面不存在</h1>
        <p className='text-muted-foreground mb-8 leading-relaxed'>抱歉，我們找不到您要尋找的頁面。可能是連結有誤，或者頁面已經被移動了。</p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold'>
            <Home className='h-5 w-5' />
            回到首頁
          </Link>

          <Link
            href='/'
            className='inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-md hover:bg-muted transition-colors font-semibold'>
            <Search className='h-5 w-5' />
            搜尋電影
          </Link>
        </div>
      </div>
    </div>
  );
}
