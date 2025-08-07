import { DiscoverMovieParams } from '@/features/page/types'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import {
  Credits,
  Genre,
  MovieDetails,
  MoviesResponse,
  ReviewsResponse,
  VideosResponse,
} from '@/types/movie'

const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL
const JWT_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN
// const JWT_TOKEN =
//   'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mjc0YzlmNjJkMTc3OWMxMTMwNWU0N2FkYmYwNjgyOSIsIm5iZiI6MTc1MjkzNjIyMy40NzQsInN1YiI6IjY4N2JhZjFmOThjNTk3ZjExYThhNDJjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E2mO9fpXsEzncI4gnU0endKh7dAl9HqAzd-JE9aBBno';
const LANGUAGE = 'zh-TW'

// TMDB API 錯誤類型定義
interface TMDBErrorResponse {
  success: boolean
  status_code: number
  status_message: string
}

// TMDB 錯誤代碼對應表
const TMDB_ERROR_MESSAGES: Record<number, string> = {
  // 成功狀態 2XX
  1: '操作成功',
  12: '項目已成功更新',
  13: '項目已成功刪除',
  21: '找不到項目：您要編輯的項目無法找到',
  40: '沒有需要更新的內容',

  // 認證相關錯誤
  3: '認證失敗：您沒有權限存取此服務',
  7: '無效的 API 金鑰：您必須擁有有效的金鑰',
  10: 'API 金鑰已被暫停：您的帳戶存取權限已被暫停，請聯絡 TMDB',
  14: '認證失敗',
  16: '裝置被拒絕',
  17: '工作階段被拒絕',
  30: '無效的使用者名稱和/或密碼：您沒有提供有效的登入資訊',
  31: '帳戶已停用：您的帳戶不再有效，如果這是錯誤請聯絡 TMDB',
  32: '電子郵件尚未驗證：您的電子郵件地址尚未驗證',
  33: '無效的請求權杖：請求權杖已過期或無效',
  35: '無效的權杖',
  36: '此權杖尚未獲得使用者的寫入權限',
  38: '您沒有權限編輯此資源',
  39: '此資源為私人資源',

  // 請求相關錯誤
  4: '無效格式：此服務不支援該格式',
  5: '無效參數：您的請求參數不正確',
  6: '無效 ID：前置條件 ID 無效或找不到',
  18: '驗證失敗',
  19: '無效的 accept header',
  20: '無效的日期範圍：應該是不超過 14 天的範圍',
  22: '無效頁面：頁面從 1 開始，最大為 500，必須是整數',
  23: '無效日期：格式需要是 YYYY-MM-DD',
  26: '您必須提供使用者名稱和密碼',
  27: '過多的附加回應物件：遠端呼叫的最大數量為 20',
  28: '無效時區：請查閱文件以獲得有效時區',
  29: '您必須確認此動作：請提供 confirm=true 參數',
  41: '此請求權杖尚未獲得使用者批准',
  42: '此資源不支援此請求方法',
  47: '輸入無效',

  // 伺服器相關錯誤
  2: '無效服務：此服務不存在',
  9: '服務離線：此服務暫時離線，請稍後再試',
  11: '內部錯誤：發生問題，請聯絡 TMDB',
  15: '失敗',
  24: '您對後端伺服器的請求逾時，請再試一次',
  43: '無法連接到後端伺服器',
  44: 'ID 無效',
  46: 'API 正在維護中，請稍後再試',

  // 限制相關錯誤
  8: '重複條目：您嘗試提交的資料已存在',
  25: '您的請求數量超過允許的限制 (40)',
  45: '此使用者已被暫停',

  // 找不到資源
  34: '找不到您請求的資源',
  37: '找不到請求的工作階段',
}

// 錯誤類型分類
const ERROR_TYPES = {
  SUCCESS: [1, 12, 13, 21, 40], // 2XX：成功
  AUTH_ERROR: [3, 7, 10, 14, 16, 17, 30, 31, 32, 33, 35, 36, 38, 39],
  REQUEST_ERROR: [4, 5, 6, 18, 19, 20, 22, 23, 26, 27, 28, 29, 41, 42, 47], // 4xx：用戶端錯誤（Client Error）
  SERVER_ERROR: [2, 9, 11, 15, 24, 43, 44, 46], // 5xx：伺服器錯誤（Server Error）
  RATE_LIMIT_ERROR: [8, 25, 45], // 429：請求過於頻繁（Rate Limit Exceeded）
  NOT_FOUND: [34, 37], // 404：找不到資源（Not Found）
}

const showToast = (error: AxiosError<TMDBErrorResponse>) => {
  toast(error.message, {
    description: `錯誤代碼：${error.response?.data.status_code}  錯誤訊息：${error.response?.data.status_message}`,
    style: {
      backgroundColor: 'rgba(235, 82, 82, 1)',
      color: 'white',
    },
    duration: 5000,
  })
}

// 建立 axios 實例
export const api = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 請求攔截器
api.interceptors.request.use(
  config => {
    if (JWT_TOKEN) {
      config.headers['Authorization'] = `Bearer ${JWT_TOKEN}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 回應攔截器
api.interceptors.response.use(
  response => {
    return response
  },
  (error: AxiosError<TMDBErrorResponse>) => {
    const status = error.response?.status
    const responseData = error.response?.data

    const isClient = typeof window !== 'undefined'

    // 處理 TMDB API 特定錯誤
    if (responseData && responseData.status_code) {
      const tmdbErrorCode = responseData.status_code
      const tmdbErrorMessage =
        TMDB_ERROR_MESSAGES[tmdbErrorCode] || responseData.status_message || '未知錯誤'

      // 根據錯誤類型進行不同的處理
      if (ERROR_TYPES.AUTH_ERROR.includes(tmdbErrorCode)) {
        isClient
          ? showToast(error)
          : console.error({ type: '認證錯誤', tmdbErrorCode, tmdbErrorMessage })
      } else if (ERROR_TYPES.REQUEST_ERROR.includes(tmdbErrorCode)) {
        isClient
          ? showToast(error)
          : console.error({ type: '請求錯誤', tmdbErrorCode, tmdbErrorMessage })
      } else if (ERROR_TYPES.SERVER_ERROR.includes(tmdbErrorCode)) {
        console.error({ type: '伺服器錯誤', tmdbErrorCode, tmdbErrorMessage })
      } else if (ERROR_TYPES.RATE_LIMIT_ERROR.includes(tmdbErrorCode)) {
        console.error({ type: '限制錯誤', tmdbErrorCode, tmdbErrorMessage })
      } else if (ERROR_TYPES.NOT_FOUND.includes(tmdbErrorCode)) {
        isClient
          ? showToast(error)
          : console.error({ type: '找不到資源', tmdbErrorCode, tmdbErrorMessage })
      }
    } else {
      if (status && status >= 401 && status < 500) {
        isClient ? showToast(error) : console.error('用戶端錯誤')
      } else if (status && status >= 500) {
        console.error('伺服器發生錯誤，請稍後再試')
      } else {
        console.error('發生未知錯誤')
      }
    }
    return Promise.reject(error)
  },
)
// API 函式
export const tmdbApi = {
  // 搜尋電影
  searchMovies: async (query: string, page = 1): Promise<MoviesResponse> => {
    const response = await api.get<MoviesResponse>('/search/movie', {
      params: {
        query,
        page,
        language: LANGUAGE,
        include_adult: false,
      },
    })
    return response.data
  },

  // 篩選電影
  discoverMovies: async (params: DiscoverMovieParams): Promise<MoviesResponse> => {
    const response = await api.get<MoviesResponse>('/discover/movie', {
      params: {
        page: params.page || 1,
        language: LANGUAGE,
        certification_country: 'TW',
        sort_by: 'popularity.desc',
        watch_region: 'TW',
        ...params,
      },
    })
    return response.data
  },

  // 取得電影類型清單
  getGenres: async (): Promise<{ genres: Genre[] }> => {
    const response = await api.get<{ genres: Genre[] }>('/genre/movie/list', {
      params: {
        language: LANGUAGE,
      },
    })
    return response.data
  },

  // 取得熱門電影
  getPopularMovies: async (page = 1): Promise<MoviesResponse | unknown> => {
    const response = await api.get<MoviesResponse>('/movie/popular', {
      params: {
        page,
        language: LANGUAGE,
      },
    })
    return response.data
  },

  // 取得最新電影
  getNowPlayingMovies: async (page = 1): Promise<MoviesResponse> => {
    const response = await api.get<MoviesResponse>('/movie/now_playing', {
      params: {
        page,
        language: LANGUAGE,
      },
    })
    return response.data
  },

  // 取得電影詳情
  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await api.get<MovieDetails>(`/movie/${movieId}`, {
      params: {
        language: LANGUAGE,
      },
    })
    return response.data
  },

  // 取得演員資訊
  getMovieCredits: async (movieId: number): Promise<Credits> => {
    const response = await api.get<Credits>(`/movie/${movieId}/credits`, {
      params: {
        language: LANGUAGE,
      },
    })
    return response.data
  },

  // 取得電影預告片
  getMovieVideos: async (movieId: number): Promise<VideosResponse> => {
    const response = await api.get<VideosResponse>(`/movie/${movieId}/videos`, {
      params: {
        language: LANGUAGE,
      },
    })
    return response.data
  },

  // 取得電影評論
  getMovieReviews: async (movieId: number, page = 1): Promise<ReviewsResponse> => {
    const response = await api.get<ReviewsResponse>(`/movie/${movieId}/reviews`, {
      params: {
        page,
        language: LANGUAGE,
      },
    })
    return response.data
  },
}
