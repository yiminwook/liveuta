'use client';
import { initParticlesEngine } from '@tsparticles/react';
import { useEffect } from 'react';
import { loadSlim } from '@tsparticles/slim';
// import { loadImageShape } from '@tsparticles/shape-image';

export default function ParticleProvider() {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      // await loadImageShape(engine);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
