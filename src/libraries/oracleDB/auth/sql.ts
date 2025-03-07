export const GET_ONE_MEMBER = `
  SELECT * 
  FROM MEMBER
  WHERE EMAIL = :email AND PROVIDER = :provider
  FETCH FIRST 1 ROW ONLY
`;

export const POST_MEMBER = `
  INSERT INTO MEMBER (ID, EMAIL, PROVIDER)
  VALUES (ADMIN.MEMBER_SEQ.NEXTVAL, :email, :provider)
`;

export const UPDATE_MEMBER = `
  UPDATE MEMBER
  SET LOGIN_AT = CURRENT_TIMESTAMP, DISCONNECT = 'N'
  WHERE EMAIL = :email AND PROVIDER = :provider
`;

export const DICONNECT_ALL_MEMBER = `
  UPDATE MEMBER
    SET DISCONNECT = 'Y'
    WHERE DISCONNECT = 'N';
 `;
