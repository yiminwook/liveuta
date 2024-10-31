import { FC } from 'react';
import { BrowserView } from 'react-device-detect';

const browserOnly = <T extends object>(Component: FC<T>) => {
  return function BrowserComponent(props: T) {
    return (
      <BrowserView>
        <Component {...props} />
      </BrowserView>
    );
  };
};

export default browserOnly;
