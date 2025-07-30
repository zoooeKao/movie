'use client';

import { useState } from 'react';
import { useWatchList } from '@/hooks/use-watch-list';
import { Heart, Home, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';


export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { watchListCount } = useWatchList();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigation = [
    { name: '首頁', href: '/', icon: Home },
    { name: '待看清單', href: '/watch-list', icon: Heart, count: watchListCount },
  ];

  return (
    <header className="header-bg border-border sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-primary hover:text-primary/80 flex items-center space-x-2 text-xl font-bold transition-colors"
            onClick={closeMenu}
          >
            <div className="text-2xl">🎬</div>
            <span>電影數據庫</span>
          </Link>

          {/* 桌面版導覽 */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navigation.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground/70 hover:text-foreground relative flex items-center gap-2 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 手機版選單按鈕 */}
          <button
            onClick={toggleMenu}
            className="text-foreground/70 rounded-md p-2 md:hidden"
            aria-label="開啟選單"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* 手機版導覽選單 */}
        {isMenuOpen && (
          <div className="header-bg absolute right-0 left-0 z-50 h-dvh md:hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-1 py-2">
                {navigation.map(item => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-foreground/70 hover:text-foreground hover:bg-accent relative flex items-center gap-3 rounded-md px-3 py-2 transition-colors"
                      onClick={closeMenu}
                    >
                      <Icon className="h-5 w-5" />
                      {item.name}
                      {item.count !== undefined && item.count > 0 && (
                        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                          {item.count}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};