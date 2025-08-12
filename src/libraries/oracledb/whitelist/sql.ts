import 'server-only';

export const IS_WHITELIST = `
  SELECT COUNT(*)
  FROM WHITELIST
  WHERE MEMBER_ID = :memberId
    AND CHANNEL_ID = :channelId
`;

export const GET_MAX_COUNT = `
  SELECT COUNT(*)
  FROM WHITELIST
  WHERE MEMBER_ID = :memberId
`;

export const GET_ALL_WHITELIST = `
  SELECT *
  FROM WHITELIST
  WHERE MEMBER_ID = :memberId
`;

export const POST_WHITELIST = `
  INSERT INTO WHITELIST (MEMBER_ID, CHANNEL_ID)
  SELECT :memberId, :channelId
  FROM DUAL
  WHERE NOT EXISTS (
    SELECT *
    FROM WHITELIST
    WHERE MEMBER_ID = :memberId
      AND CHANNEL_ID = :channelId
  )
`;

export const DELETE_WHITELIST = `
  DELETE FROM WHITELIST
  WHERE MEMBER_ID = :memberId
    AND CHANNEL_ID = :channelId
`;
