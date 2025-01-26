import { SVGProps } from 'react';

export default function Diamond(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <path d="M6 5h12l3 5l-8.5 9.5a.7.7 0 0 1-1 0L3 10z" />
        <path d="M10 12L8 9.8l.6-1" />
      </g>
    </svg>
  );
}
