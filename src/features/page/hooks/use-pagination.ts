import { useMemo, useState } from 'react'
import { PaginationOption, PaginationState, PaginationActions } from '@/features/page/types'

interface UsePaginationProps {
  currentPage: number
  totalPages?: number
  maxDisplayPages?: number
}

export const usePagination = ({ 
  currentPage, 
  totalPages, 
  maxDisplayPages = 20 
}: UsePaginationProps): PaginationState & PaginationActions => {
  const [open, setOpen] = useState(false)

  // 計算頁面選項，只顯示當前頁面附近的頁數選項
  const pageOptions = useMemo((): PaginationOption[] => {
    if (!totalPages) return []
    
    const halfRange = Math.floor(maxDisplayPages / 2)
    
    let startPage = Math.max(1, currentPage - halfRange)
    let endPage = Math.min(totalPages, currentPage + halfRange)
    
    // 確保總是顯示 maxDisplayPages 個選項（如果總頁數足夠）
    if (endPage - startPage + 1 < maxDisplayPages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxDisplayPages - 1)
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxDisplayPages + 1)
      }
    }
    
    const options: PaginationOption[] = []
    
    // 如果起始頁不是第1頁，添加第1頁和省略號
    if (startPage > 1) {
      options.push({ value: 1, label: '第 1 頁' })
      if (startPage > 2) {
        options.push({ value: -1, label: '...', disabled: true })
      }
    }
    
    // 添加範圍內的頁面
    for (let i = startPage; i <= endPage; i++) {
      options.push({ value: i, label: `第 ${i} 頁` })
    }
    
    // 如果結束頁不是最後一頁，添加省略號和最後一頁
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        options.push({ value: -2, label: '...', disabled: true })
      }
      options.push({ value: totalPages, label: `第 ${totalPages} 頁` })
    }
    
    return options
  }, [totalPages, currentPage, maxDisplayPages])

  const handlePageSelect = (selectedPage: number, onPageSelect?: (page: number) => void) => {
    if (onPageSelect && selectedPage !== currentPage && selectedPage > 0) {
      onPageSelect(selectedPage)
    }
    setOpen(false)
  }

  const toggleOpen = () => setOpen(prev => !prev)
  const closePopover = () => setOpen(false)

  return {
    open,
    pageOptions,
    handlePageSelect,
    toggleOpen,
    closePopover,
    setOpen
  }
} 