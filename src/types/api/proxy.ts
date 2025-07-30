export type TCheckDuplicatesBatchSuccessResult = {
  url: string; // 요청한 URL
  channelId: string; // 확인된 채널 ID
  handle: string; // @handle (없으면 '')
  channelTitle: string; // 채널 제목 (없으면 '')
  existingName: string; // 중복일 때 기존 한글명, 없으면 ''
  error: null;
};

export type TCheckDuplicatesBatchErrorResult = {
  url: string; // 요청한 URL
  channelId: null; // 실패이므로 null
  handle: null; // 동일
  channelTitle: null; // 동일
  existingName: string; // 항상 '' (빈 문자열)
  error: string; // 오류 코드: 'resolve_failed' 등
};

export type TCheckDuplicatesBatchResult =
  | TCheckDuplicatesBatchSuccessResult
  | TCheckDuplicatesBatchErrorResult;
