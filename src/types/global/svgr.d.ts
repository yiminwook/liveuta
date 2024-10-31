declare module '*.svg?react' {
  const svg: React.FC<React.SVGProps<SVGSVGElement>>;
  export default svg;
}

declare module '*.svg?url' {
  const svgUrl: {
    src: string;
    height: number;
    width: number;
    blurWidth: number;
    blurHeight: number;
  };
  export default svgUrl;
}
