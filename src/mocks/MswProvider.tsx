'use client';
import { ReactNode, use } from 'react';

const mockingEnabledPromise =
  typeof window !== 'undefined'
    ? import('@/mocks/browser').then(async ({ mockWorker }) => {
        if (process.env.NEXT_PUBLIC_MSW_ENABLED !== 'true') return;

        await mockWorker.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes('_next')) {
              return;
            }
            print.warning();
          },
        });

        // worker.use(...handlers);

        (module as any).hot?.dispose(() => {
          mockWorker.stop();
        });

        console.log(mockWorker.listHandlers());
      })
    : Promise.resolve();

type Props = {
  children?: ReactNode;
};

export default function MswProvider({ children }: Props) {
  use(mockingEnabledPromise);

  return <>{children}</>;
}
