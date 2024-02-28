export const GET_MEMBER = `
  SELECT * 
  FROM MEMBER
  WHERE EMAIL = :email AND PROVIDER = :provider
`;

export const POST_MEMBER = `
  INSERT INTO MEMBER (EMAIL, PROVIDER)
  VALUES (:email, :provider)
`;

export const UPDATE_MEMBER = `
  UPDATE MEMBER
  SET LOGIN_AT = CURRENT_TIMESTAMP
  WHERE EMAIL = :email AND PROVIDER = :provider
`;
