'use client';
import { initParticlesEngine } from '@tsparticles/react';
import { PropsWithChildren, useEffect } from 'react';
import { loadSlim } from '@tsparticles/slim';
// import { loadImageShape } from '@tsparticles/shape-image';

export default function ParticleProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      // await loadImageShape(engine);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
