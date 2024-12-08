'use client';
import Particles from '@tsparticles/react';
import { IParticlesProps } from '@tsparticles/react';
import cx from 'classnames';
import { useMemo } from 'react';
import css from './Backdrop.module.scss';

// https://vincentgarreau.com/particles.js
type BackdropProps = {
  className?: string;
  onClick?: () => void;
  activeParticles: boolean;
};

export default function Backdrop({ className, onClick, activeParticles }: BackdropProps) {
  const options = useMemo<IParticlesProps['options']>(
    () => ({
      fpsLimit: 120,
      interactivity: {
        // events: {
        //   onHover: {
        //     enable: true,
        //     mode: 'repulse',
        //   },
        // },
        // modes: {
        //   repulse: {
        //     distance: 200,
        //     duration: 0.4,
        //   },
        // },
      },
      particles: {
        color: {
          value: ['#d1d4e8', '#8a96eb', '#8ae5eb', '#ebce8a'],
        },
        move: {
          enable: true,
          direction: 'top',
          outModes: 'out',
          straight: false,
          speed: 6,
        },
        number: {
          value: 10,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: ['circle'],
        },
        size: {
          value: { min: 25, max: 100 },
        },
      },
      //고화질 디스플레이에서 더 선명하게 할건지에 대한 옵션
      detectRetina: false,
    }),
    [],
  );

  return (
    <div onClick={onClick} className={cx(css.wrap, className)}>
      {activeParticles && <Particles options={options} />}
    </div>
  );
}
