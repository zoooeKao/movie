# 建立一個電影數據庫的前端應用。可以使用 TMDB（The Movie Database）的 API，或是其他任何的電影 API。

## tech stack:

- Next.js
- tailwind CSS
- shadCN
- axios (JWT token: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mjc0YzlmNjJkMTc3OWMxMTMwNWU0N2FkYmYwNjgyOSIsIm5iZiI6MTc1MjkzNjIyMy40NzQsInN1YiI6IjY4N2JhZjFmOThjNTk3ZjExYThhNDJjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E2mO9fpXsEzncI4gnU0endKh7dAl9HqAzd-JE9aBBno)
- SWR

## 專案基礎要求

1. 搜尋電影：應用程式需要一個搜尋欄位，讓用戶輸入並搜尋電影，搜尋結果應該以視覺友好的方式顯示。
2. 搜尋電影時加入以下的動畫效果：
   - 當使用者搜尋時，顯示一個「載入中」的動畫，直到電影資訊完全取得為止。
   - 當使用者將鼠標懸停在電影上時，加入放大、陰影或邊框顏色變化的強調效果。
   - 你可以使用純 CSS，或者使用 JavaScript 動畫庫，例如 GSAP 或 anime.js，來實作你的動畫。
3. 電影詳情：當用戶點擊某部電影時，他們應該能看到該電影的詳細資訊，包括演員陣容、預告片、導演和評論等。
4. 響應式設計：你的應用程式需要在不同大小的螢幕上看起來和運作良好。
5. 錯誤處理：如果在任何時候向 API 發送請求時出現錯誤或取不到資料時，你需要在 UI 中以友好的方式顯示。
6. 電影加入待看清單：用戶能夠收藏他們喜歡的電影，並且可以隨時選擇所收藏的電影觀看。
7. 列出待看清單：將使用者加入待看清單的電影列出

## 設計準則

1. 沒有限制使用的 library、UI Framework 請自行設計在這個專案下所需要架構，以及頁面佈局。
2. 請使用您知道的技術嘗試優化效能，衡量的指標可以是 FCP, LCP …etc, 也可以您另外常用的指標。

## 實作細節

### API

- 使用 Axios 打 API
- JWT 和錯誤處理透過攔截器處理

### RWD

- 版型要有桌機、平板、手機三種裝置

### 處理遠端資料獲取和快取

- 除了初始資料載入使用 Next.js 內建的 server component 外，其餘透過 SWR

### 搜尋框
- 使用該 API https://api.themoviedb.org/3/discover/movie/ 送出請求，統整到檔案 api.ts
- 篩選條件如下，並且要有一個搜尋按鈕，使用者按下後才開始搜尋，並請考量 RWD
  - 使用者評分
    - 欄位名稱：使用者評分 
    - scheme:vote_average 
    - UI: ShanCN 的 slider，step={1}
  - 發佈日期
    - 欄位名稱：發佈日期 
    - scheme:release_date
    - UI: ShanCN 的 Calendar
  - 片長
    - 欄位名稱：片長 
    - scheme:runtime
    - UI: ShanCN 的 slider，step={100}
  - 類型
    - 欄位名稱：類型 
    - scheme:genre.name
    - UI: 每個類型都用 border 圓角包裹實作按鈕效果

