export type TImageFormat = 'webp' | 'jpg' | 'png';

type ThumbnailDefault = {
  type: 'default';
  width: 120;
  height: 90;
};

type ThumbnailMedium = {
  type: 'mqdefault';
  width: 320;
  height: 180;
};

type ThumbnailHigh = {
  type: 'hqdefault';
  width: 480;
  height: 360;
};

type ThumbnailStandard = {
  type: 'sddefault';
  width: 640;
  height: 480;
};

type ThumbnailMaxres = {
  type: 'maxresdefault';
  width: 1280;
  height: 720;
};

export type ThumbnailSize =
  | ThumbnailDefault
  | ThumbnailMedium
  | ThumbnailHigh
  | ThumbnailStandard
  | ThumbnailMaxres;

export type TPlayerStateCode = -2 | -1 | 0 | 1 | 2 | 3 | 5;

export type TPlayerState =
  | 'NOT_READY'
  | 'UNSTARTED'
  | 'ENDED'
  | 'PLAYING'
  | 'PAUSED'
  | 'BUFFERING'
  | 'CUED';
