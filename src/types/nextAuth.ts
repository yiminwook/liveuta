export type Payload = {
  /** nextAuth에서 강제되는 부분 실제id는 userId */
  id?: string; //nextAuth default
  email: string;
  name?: string | null; //nextAuth default
  image?: string | null; //nextAuth default

  userId: number;
  userLv: number;
  provider: string;
  loginAt: string;
};

export type Provider = 'google' | 'kakao' | 'discord';
