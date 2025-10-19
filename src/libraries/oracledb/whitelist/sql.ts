import 'server-only';

export const IS_WHITELIST = `
  SELECT COUNT(*)
  FROM WHITELIST
  WHERE MEMBER_EMAIL = :memberEmail
    AND CHANNEL_ID = :channelId
`;

export const GET_MAX_COUNT = `
  SELECT COUNT(*)
  FROM WHITELIST
  WHERE MEMBER_EMAIL = :memberEmail
`;

export const GET_ALL_WHITELIST = `
  SELECT *
  FROM WHITELIST
  WHERE MEMBER_EMAIL = :memberEmail
`;

export const POST_WHITELIST = `
  INSERT INTO WHITELIST (MEMBER_EMAIL, CHANNEL_ID)
  SELECT :memberEmail, :channelId
  FROM DUAL
  WHERE NOT EXISTS (
    SELECT *
    FROM WHITELIST
    WHERE MEMBER_EMAIL = :memberEmail
      AND CHANNEL_ID = :channelId
  )
`;

export const DELETE_WHITELIST = `
  DELETE FROM WHITELIST
  WHERE MEMBER_EMAIL = :memberEmail
    AND CHANNEL_ID = :channelId
`;
