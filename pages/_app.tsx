import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Image from "next/image";

export default function App({ Component, pageProps }: AppProps) {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <>
      <div className="background">
        <div className="background_inner"></div>
      </div>
      <Component {...pageProps} />
      <button
        className="foat_button"
        onClick={scrollUp}
        onTouchEnd={scrollUp}
        onTouchStart={scrollUp}
      >
        <Image src="/float.png" width={50} height={50} alt="float"></Image>
      </button>
      <Analytics />
    </>
  );
}
