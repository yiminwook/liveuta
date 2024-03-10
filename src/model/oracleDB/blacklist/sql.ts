export const GET = `
  SELECT *
  FROM BLACKLIST
  WHERE MEMBER_ID = :memberId
`;

export const POST = `
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

export const DELETE = `
  delete from BLACKLIST
  where MEMBER_ID = :memberId
    and CHANNEL_ID = :channelId
`;
