import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="background"></div>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
