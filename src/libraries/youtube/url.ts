export const generateVideoUrl = (videoId: string) => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};

export const generateChannelUrl = (channelId: string) => {
  return `https://www.youtube.com/channel/${channelId}`;
};

type TImageFormat = 'webp' | 'jpg' | 'png';

const IMAGE_FORMAT_KEY_MAP: Record<TImageFormat, string> = {
  webp: 'rw',
  jpg: 'rj',
  png: 'rp',
};

const GENERATE_CHANNEL_IMAGE_URL_DEFAULT_OPTION: {
  size: number;
  round: boolean;
  format: TImageFormat;
  /* hex color code */
  bgColor: string;
} = {
  size: 80,
  round: false,
  format: 'webp',
  bgColor: '#FFFFFF',
};

// export const YCHANNEL_IMAGE_BASE_URL = 'https://yt3.ggpht.com';

export const generateChanneImagelUrl = (
  src: string,
  option?: typeof GENERATE_CHANNEL_IMAGE_URL_DEFAULT_OPTION,
) => {
  const mergeOption = {
    ...GENERATE_CHANNEL_IMAGE_URL_DEFAULT_OPTION,
    ...option,
  };

  const parameter = [
    `s${mergeOption.size}`,
    mergeOption.round ? 'cc' : 'c',
    'k',
    `c0x00${mergeOption.bgColor.replace('#', '').toUpperCase()}`,
    IMAGE_FORMAT_KEY_MAP[mergeOption.format],
  ];

  return src + '=' + parameter.join('-');
};

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
