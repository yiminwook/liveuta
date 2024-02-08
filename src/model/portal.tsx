/* eslint-disable react/display-name */
import { useState, useEffect, FC } from 'react';
import { createPortal } from 'react-dom';

const portal = <T extends object>(Component: FC<T>, key: string) => {
  return (props: T) => {
    const [div] = useState(() => document.createElement('div'));

    useEffect(() => {
      div.setAttribute('id', key);
      document.body.appendChild(div);
      return () => {
        document.body.removeChild(div);
      };
    }, []);

    return createPortal(<Component {...props} />, div);
  };
};

export default portal;
