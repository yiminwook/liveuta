import 'server-only';

export const IS_BLACKLIST = `
  SELECT COUNT(*)
  FROM BLACKLIST
  WHERE MEMBER_EMAIL = :memberEmail
    AND CHANNEL_ID = :channelId
`;

export const GET_MAX_COUNT = `
  SELECT COUNT(*)
  FROM BLACKLIST
  WHERE MEMBER_EMAIL = :memberEmail
`;

export const GET_ALL_BLACKLIST = `
  SELECT *
  FROM BLACKLIST
  WHERE MEMBER_EMAIL = :memberEmail
`;

export const POST_BLACKLIST = `
  INSERT INTO BLACKLIST (MEMBER_EMAIL, CHANNEL_ID)
  SELECT :memberEmail, :channelId
  FROM DUAL
  WHERE NOT EXISTS (
    SELECT *
    FROM BLACKLIST
    WHERE MEMBER_EMAIL = :memberEmail
      AND CHANNEL_ID = :channelId
  )
`;

export const DELETE_BLACKLIST = `
  DELETE FROM BLACKLIST
  WHERE MEMBER_EMAIL = :memberEmail
    AND CHANNEL_ID = :channelId
`;
