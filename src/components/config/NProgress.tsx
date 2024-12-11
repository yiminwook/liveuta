// Create a Providers component to wrap your application with all the components requiring 'use client', such as next-nprogress-bar or your different contexts...
'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { PropsWithChildren } from 'react';

const NProgressProviders = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <ProgressBar
        options={{
          showSpinner: false,
          template: '<div class="bar" role="bar"><div class="peg"></div></div></div>',
        }}
        shallowRouting
      />
      {/* <div className="bar" role="bar">
        <div className="peg"></div>
      </div>
      <div className="spinner" role="spinner">
        <div className="spinner-icon"></div>
      </div> */}
    </>
  );
};

export default NProgressProviders;
