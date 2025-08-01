// 格式化電影評分
export const formatRating = (rating: number): string => {
  return (Math.round(rating * 10) / 10).toFixed(1);
};