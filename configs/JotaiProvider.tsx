import { PropsWithChildren } from 'react';
import { Provider } from 'jotai';

const JotaiProvider = ({ children }: PropsWithChildren) => {
  return <Provider>{children}</Provider>;
};

export default JotaiProvider;
