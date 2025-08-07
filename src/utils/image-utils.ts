/**
 * TMDB 圖片 URL 輔助函式
 * 用於生成不同尺寸的 TMDB 圖片 URL
 */

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

/**
 * 通用圖片 URL 生成器
 */
export const getImageUrl = (path: string | null, size: 'w200' | 'w300' | 'w500'): string | null => {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

/**
 * 背景圖片 URL 生成器
 */
export const getBackdropImage = (path: string | null, size: 'w300' | 'w780' | 'w1280'): string | null => {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

/**
 * 海報圖片 URL 生成器
 */
export const getPosterImage = (path: string | null, size: 'w154' | 'w342' | 'w500' | 'w780'): string | null => {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

/**
 * 人物頭像圖片 URL 生成器
 */
export const getProfileImage = (path: string | null, size: 'w45' | 'w185' | 'h632'): string | null => {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}
