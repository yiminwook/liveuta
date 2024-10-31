type ThumbnailSize =
  | ThumbnailDefault
  | ThumbnailMedium
  | ThumbnailHigh
  | ThumbnailStandard
  | ThumbnailMaxres;

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

export const generateThumbnail = (videoId: string, ThumbnailSize: ThumbnailSize['type']) => {
  const base = 'https://i.ytimg.com/vi';
  return base + '/' + videoId + '/' + ThumbnailSize + '.jpg';
};
