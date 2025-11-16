import 'server-only';

export const GET_ONE_MEMBER = `
  SELECT * 
  FROM MEMBER
  WHERE EMAIL = :email
  FETCH FIRST 1 ROW ONLY
`;

export const POST_MEMBER = `
  INSERT INTO MEMBER (EMAIL, PROVIDER)
  VALUES (:email, :provider)
`;

export const UPDATE_MEMBER = `
  UPDATE MEMBER
  SET LOGIN_AT = CURRENT_TIMESTAMP, DISCONNECT = 'N'
  WHERE EMAIL = :email
`;

export const DICONNECT_ALL_MEMBER = `
  UPDATE MEMBER
    SET DISCONNECT = 'Y'
    WHERE DISCONNECT = 'N';
 `;

export const UPDATE_VERIFICATION_CODE = `
  UPDATE MEMBER
  SET VERIFICATION_CODE = :verificationCode, EXPIRES_AT = :expiresAt
  WHERE EMAIL = :email
 `;
