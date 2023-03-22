import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Image from "next/image";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <>
      <RecoilRoot>
        <div className="background" />
        <div className="backdrop" />
        <Component {...pageProps} />
        <button
          className="foat_button"
          onClick={scrollUp}
          onTouchEnd={scrollUp}
          onTouchStart={scrollUp}
        >
          <Image src="/float.png" width={50} height={50} alt="float"></Image>
        </button>
      </RecoilRoot>
      <Analytics />
    </>
  );
}
