import { SVGProps } from 'react';

export default function MdiBlockHelper(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 0a12 12 0 0 1 12 12a12 12 0 0 1-12 12A12 12 0 0 1 0 12A12 12 0 0 1 12 0m0 2A10 10 0 0 0 2 12c0 2.4.85 4.6 2.26 6.33L18.33 4.26A10 10 0 0 0 12 2m0 20a10 10 0 0 0 10-10c0-2.4-.85-4.6-2.26-6.33L5.67 19.74A10 10 0 0 0 12 22"
      ></path>
    </svg>
  );
}
