'use client';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useEffect } from 'react';
// import { loadImageShape } from '@tsparticles/shape-image';

export default function ParticleProvider() {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      // await loadImageShape(engine);
    });
  }, []);

  return null;
}
