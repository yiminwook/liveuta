// Create a Providers component to wrap your application with all the components requiring 'use client', such as @bprogress/next or your different contexts...
'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { PropsWithChildren } from 'react';

const BProgressProviders = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ProgressProvider
        options={{
          showSpinner: false,
          template: '<div class="bar" role="bar"><div class="peg"></div></div></div>',
        }}
        shallowRouting
      >
        {children}
      </ProgressProvider>
      {/* <div className="bar" role="bar">
        <div className="peg"></div>
      </div>
      <div className="spinner" role="spinner">
        <div className="spinner-icon"></div>
      </div> */}
    </>
  );
};

export default BProgressProviders;
