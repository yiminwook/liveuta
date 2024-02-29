export const GET_SETLIST = `
  SELECT SETLIST.*, MEMBER.EMAIL
  FROM SETLIST
  JOIN MEMBER ON MEMBER_ID = MEMBER.ID
  WHERE VIDEO_ID = :videoId
`;

export const GET_MAX_COUNT = `
  SELECT COUNT(*)
  FROM SETLIST
`;

export const GET_ALL_SETLIST = `
  SELECT *
  FROM (
      SELECT r.*, MEMBER.EMAIL, ROWNUM AS rnum
      FROM (
          SELECT *
          FROM SETLIST
          ORDER BY CREATE_AT
      ) r
      JOIN MEMBER ON r.MEMBER_ID = MEMBER.ID
      WHERE ROWNUM <= :endRow
  )
  WHERE rnum >= :startRow
`;

export const SEARCH_MAX_COUNT = `
  SELECT COUNT(*)
  FROM SETLIST
  WHERE DESCRIPTION LIKE :pattern
`;

export const SEARCH_SETLIST = `
  SELECT *
  FROM (
      SELECT r.*, MEMBER.EMAIL, ROWNUM AS rnum
      FROM (
          SELECT *
          FROM SETLIST
          WHERE DESCRIPTION LIKE :pattern
          ORDER BY CREATE_AT
      ) r
      JOIN MEMBER ON r.MEMBER_ID = MEMBER.ID
      WHERE ROWNUM <= :endRow
  )
  WHERE rnum >= :startRow
`;

export const POST_SETLIST = `
  INSERT INTO SETLIST (VIDEO_ID, DESCRIPTION, MEMBER_ID)
  VALUES (:videoId, :description, :memberId)
`;

export const UPDATE_SETLIST = `
  UPDATE SETLIST
  SET DESCRIPTION = :description, MEMBER_ID = :memberId, UPDATE_AT = CURRENT_TIMESTAMP
  WHERE VIDEO_ID = :videoId
`;

export const DELETE_SETLIST = `
  DELETE FROM SETLIST
  WHERE VIDEO_ID = :videoId
`;
