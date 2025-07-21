import 'server-only';
export const IS_BLACKLIST = `
  SELECT COUNT(*)
  FROM BLACKLIST
  WHERE MEMBER_ID = :memberId
    AND CHANNEL_ID = :channelId
`;

export const GET_MAX_COUNT = `
  SELECT COUNT(*)
  FROM BLACKLIST
  WHERE MEMBER_ID = :memberId
`;

export const GET_ALL_BLACKLIST = `
  SELECT *
  FROM BLACKLIST
  WHERE MEMBER_ID = :memberId
`;

export const POST_BLACKLIST = `
  INSERT INTO BLACKLIST (MEMBER_ID, CHANNEL_ID)
  SELECT :memberId, :channelId
  FROM DUAL
  WHERE NOT EXISTS (
    SELECT *
    FROM BLACKLIST
    WHERE MEMBER_ID = :memberId
      AND CHANNEL_ID = :channelId
  )
`;

export const DELETE_BLACKLIST = `
  DELETE FROM BLACKLIST
  WHERE MEMBER_ID = :memberId
    AND CHANNEL_ID = :channelId
`;
