import { expect, test } from 'vitest';
import { generateChanneImagelUrl } from './url';

test('generateChannelImageUrl', () => {
  const src =
    'https://yt3.ggpht.com/W_mcRMt8pDnEw_ZBA2hABUEQNjtjOVL_NPvw8eI_cO3396_sAyEgKaiBiQJh01hFmBkfXgaL';

  const url = generateChanneImagelUrl(src, {
    size: 200,
    round: false,
    format: 'png',
    bgColor: '#c37777',
  });

  expect(url).toBe(`${src}=s200-c-k-c0x00C37777-rp`);
});
