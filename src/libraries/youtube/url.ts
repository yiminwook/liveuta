import { TImageFormat, ThumbnailSize } from './type';

export const generateVideoUrl = (videoId: string) => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};

export const generateChannelUrl = (channelId: string) => {
  return `https://www.youtube.com/channel/${channelId}`;
};

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
  option?: Partial<typeof GENERATE_CHANNEL_IMAGE_URL_DEFAULT_OPTION>,
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

export const generateThumbnail = (videoId: string, ThumbnailSize: ThumbnailSize['type']) => {
  const base = 'https://i.ytimg.com/vi';
  return base + '/' + videoId + '/' + ThumbnailSize + '.jpg';
};

// export function getYoutubeVideoId(url: string): string | null {
//   const regExp =
//     /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//   const match = url.match(regExp);
//   return match ? match[1] : null;
// }

export const getYoutubeVideoId = (url: string): string | null => {
  const youtubeRegex =
    /^((?:https?:)?(?:\/\/)?)?((?:www|m)\.)?((?:youtube\.com|youtu.be))\/(?:embed\/|v\/|live\/|shorts\/|feeds\/api\/videos\/|watch\?v=|watch\?.+&v=)?([\w\-]{11})(\S+)?$/;

  const match = url.match(youtubeRegex);

  if (match && match[4]) {
    return match[4];
  }

  return null;
};
