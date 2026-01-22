export const PAGINATION_RANGE = 5;

/** 채널 페이지 카드갯수 */
export const ITEMS_PER_PAGE = 24;
export const SCROLL_PER_YOUTUBE_CARD = 60;

/** 채널 검색 갯수 */
export const SEARCH_ITEMS_SIZE = 50; // 50개이상일때 유투브 에러발생

/** reavalidate time(초) */
export const FETCH_REVALIDATE_TIME = 30;

export const HOME_FILTER = ['live', 'daily', 'all'];

export const DEFAULT_BLUR_BASE64 = // #a0a0a0 alpha(0.5)
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcUA8AAcUBIa+1gC8AAAAASUVORK5CYII=';

export const GA_TRACKING_ID = 'G-4STJ8NQ029';
export const GTM_TRACKING_ID = 'GTM-KGJ6HZ4J';

export const MONGODB_SCHEDULE_COLLECTION = 'upcoming_streams';
export const MONGODB_NOTI_COLLECTION = 'notifications';
export const MONGODB_CHANNEL_COLLECTION = 'channel_id_names';
export const MONGODB_FEATURED_COLLECTION = 'featured_channels';

export const MONGODB_SCHEDULE_DB = 'ScheduleDB';
export const MONGODB_MANAGEMENT_DB = 'ManagementDB';

export const ORACLEDB_USER = 'admin';

export const SETLIST_PAGE_SIZE = 15;

export const ORIGIN = 'liveuta.vercel.app';

export const PORTAL_ID = 'liveuta-portal';

export const SCHEDULE_CACHE_TIME = 3 * 60 * 1000;
