'use client';

import { useState } from 'react';
import { useWatchList } from '@/hooks/use-watch-list';
import { cn } from '@/utils/utils';
import { Heart, Home, Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBox from '@/components/search-box';
import { Button } from '@/components/ui/button';


export const Header = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { watchListCount } = useWatchList()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setIsSearchOpen(false)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    setIsMenuOpen(false)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
  }

  const navigation = [
    { name: '首頁', href: '/', icon: Home },
    { name: '待看清單', href: '/watch-list', icon: Heart, count: watchListCount },
  ]

  const handleSubmit = async (key: string) => {
    router.push(`/search/${encodeURIComponent(key)}`)
    closeSearch()
  }

  return (
    <header className="header-bg border-border sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <Link
            href="/"
            className="text-primary mr-auto flex items-center space-x-2 text-xl font-bold transition-all md:mr-0"
            onClick={() => {
              closeMenu()
              closeSearch()
            }}
          >
            <div className="text-2xl drop-shadow-sm">🎬</div>
            <span className="from-primary to-primary/80 bg-gradient-to-r bg-clip-text text-transparent">
              電影數據庫
            </span>
          </Link>

          {/* 桌面版導覽 */}
          <nav className="mr-auto ml-4 flex items-center space-x-1 max-md:hidden">
            {navigation.map(item => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground/70 group relative flex items-center gap-2 rounded-lg px-3 py-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.name}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white shadow-lg">
                      {item.count}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="max-md:hidden">
            <SearchBox onSubmit={handleSubmit} className="w-64" />
          </div>

          {/* 手機版按鈕群組 */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSearch}
              className={cn(
                'p-2 transition-colors duration-200',
                isSearchOpen && 'bg-accent text-accent-foreground',
              )}
              aria-label="搜尋"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2 transition-colors duration-200"
              aria-label={isMenuOpen ? '關閉選單' : '開啟選單'}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="border-border/40 bg-background/95 animate-in slide-in-from-top-2 border-t py-4 backdrop-blur-sm duration-300 md:hidden">
            <SearchBox onSubmit={handleSubmit} className="w-full" placeholder="搜尋電影..." />
          </div>
        )}

        {/* 手機版導覽選單 */}
        {isMenuOpen && (
          <div className="border-border/40 bg-background/95 animate-in slide-in-from-top-2 absolute top-full right-0 left-0 border-t shadow-xl backdrop-blur-xl duration-300 md:hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-1 py-4">
                {navigation.map(item => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-foreground/70 hover:text-foreground hover:bg-accent/50 group relative flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-200"
                      onClick={closeMenu}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-base font-medium">{item.name}</span>
                      {item.count !== undefined && item.count > 0 && (
                        <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white shadow-lg">
                          {item.count}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}