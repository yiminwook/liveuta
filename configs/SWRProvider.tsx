import { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';
import { PublicConfiguration } from 'swr/_internal';

const SWR_CONFIG_OPTIONS: Partial<PublicConfiguration> = {
  dedupingInterval: 1000 * 60 * 3,
  refreshInterval: 1000 * 60 * 3,
  errorRetryCount: 3,
  errorRetryInterval: 5 * 1000,
  revalidateOnReconnect: true,
  revalidateOnFocus: true,
};

const SWRProvider = ({ children }: PropsWithChildren) => {
  return <SWRConfig value={SWR_CONFIG_OPTIONS}>{children}</SWRConfig>;
};

export default SWRProvider;
