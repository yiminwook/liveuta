export type SetlistOrderType = 'CREATE_AT' | 'BROADCAST_AT';

export const GET_SETLIST = `
  SELECT T01.*, T02.EMAIL
  FROM SETLIST T01, MEMBER T02
  WHERE VIDEO_ID = :videoId
`;

export const GET_MAX_COUNT = `
  SELECT COUNT(*)
  FROM SETLIST
`;

export const GET_ALL_SETLIST = (orderType: SetlistOrderType) => `
  SELECT T01.*, T02.EMAIL, COUNT(*) OVER() AS maxCount
  FROM SETLIST T01, MEMBER T02
  WHERE T01.MEMBER_ID = T02.ID
  ORDER BY T01.${orderType} DESC    
  OFFSET :startRow ROWS FETCH NEXT :pagiSize ROWS ONLY
`;

export const SEARCH_MAX_COUNT = `
  SELECT COUNT(*)
  FROM SETLIST
  WHERE LOWER(DESCRIPTION) LIKE '%' || :pattern || '%'
`;

export const SEARCH_SETLIST = (orderType: SetlistOrderType) => `
  SELECT T01.*, T02.EMAIL, COUNT(*) OVER() AS maxCount
  FROM SETLIST T01, MEMBER T02
  WHERE T01.MEMBER_ID = T02.ID 
    AND LOWER(T01.DESCRIPTION) LIKE '%' || :pattern || '%'
  ORDER BY T01.${orderType} DESC    
  OFFSET :startRow ROWS FETCH NEXT :pagiSize ROWS ONLY
`;

export const POST_SETLIST = `
  INSERT INTO SETLIST (VIDEO_ID, DESCRIPTION, MEMBER_ID, CHANNEL_ID, BROADCAST_AT, TITLE)
  VALUES (:videoId, :description, :memberId, :channelId, :broadcastAt, :title)
`;

export const UPDATE_SETLIST = `
  UPDATE SETLIST
  SET 
    title = :title,
    DESCRIPTION = :description, 
    CHANNEL_ID = :channelId, 
    MEMBER_ID = :memberId, 
    UPDATE_AT = CURRENT_TIMESTAMP, 
    BROADCAST_AT = :broadcastAt 
  WHERE VIDEO_ID = :videoId
`;

export const DELETE_SETLIST = `
  DELETE FROM SETLIST
  WHERE VIDEO_ID = :videoId
`;
