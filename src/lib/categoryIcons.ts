export type Category =
  | '전시'
  | '공연'
  | '콘서트'
  | '아트페어'
  | '팝업'
  | '해외문화행사';

export const CATEGORY_ICON: Record<Category, string> = {
  전시: '/images/icon-exhibition.svg',
  공연: '/images/icon-performance.svg',
  콘서트: '/images/icon-concert.svg',
  아트페어: '/images/icon-artfair.svg',
  팝업: '/images/icon-popup.svg',
  해외문화행사: '/images/icon-overseas.svg',
};