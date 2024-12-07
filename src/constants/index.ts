export const PAGINATION_RANGE = 5;

/** 채널 페이지 카드갯수 */
export const ITEMS_PER_PAGE = 24;
export const SCROLL_PER_YOUTUBE_CARD = 60;

/** 채널 검색 갯수 */
export const SEARCH_ITEMS_SIZE = 50; // 50개이상일때 유투브 에러발생

/** reavalidate time(초) */
export const FETCH_REVALIDATE_TIME = 30;

export const HOME_FILTER = ['live', 'daily', 'all'];

export const DEFAULT_BLUR_BASE64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8U9hfDwAGKgJNP3RWxQAAAABJRU5ErkJggg==';

export const GA_TRACKING_ID = 'G-4STJ8NQ029';
export const GTM_TRACKING_ID = 'GTM-KGJ6HZ4J';

export const MONGODB_SCHEDULE_COLLECTION = 'upcoming_streams';
export const MONGODB_NOTI_COLLECTION = 'notifications';
export const MONGODB_CHANNEL_COLLECTION = 'channel_id_names';

export const MONGODB_SCHEDULE_DB = 'ScheduleDB';
export const MONGODB_CHANNEL_DB = 'ManagementDB';

export const ORACLEDB_USER = 'admin';

export const SETLIST_PAGE_SIZE = 15;

export const INITIAL_PLAYER_VIDEO_ID = 'bnofYmfKLeo';

export const ORIGIN = 'liveuta.vercel.app';

export const INTERNAL_LINKS = [
  { href: '/', text: '홈' },
  { href: '/schedule', text: '스케줄' },
  { href: '/multi', text: '멀티뷰' },
  { href: '/channel', text: '채널' },
  { href: '/setlist', text: '세트리' },
  { href: '/setting', text: '설정' },
  { href: '/dev', text: '개발' },
];

export const EXTERNAL_LINKS = [
  {
    href: 'https://gall.dcinside.com/mgallery/board/lists?id=kizunaai',
    text: '키즈나아이 갤러리',
  },
  { href: 'https://gall.dcinside.com/mini/board/lists?id=vuta', text: '우타와꾸 갤러리' },
  { href: 'https://uta-tools.vercel.app', text: '우타툴즈' },
  { href: 'https://ezgif.com', text: 'EZ GIF' },
];

export const ROUTES = [
  { href: '/schedule', text: '스케줄', subRoutes: [] },
  { href: '/multi', text: '멀티뷰', subRoutes: [] },
  { href: '/channel', text: '채널', subRoutes: [] },
  { href: '/request', text: '채널 등록', subRoutes: [] },
  { href: '/setlist', text: '세트리', subRoutes: [{ href: '/setlist/post', text: '세트리 등록' }] },
  { href: '/setting', text: '설정', subRoutes: [] },
  { href: '/dev', text: '개발', subRoutes: [] },
];

export const PORTAL_ID = 'liveuta-portal';
