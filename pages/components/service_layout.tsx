/* eslint-disable react/jsx-props-no-spreading */
import Head from "next/head";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const ServiceLayout: React.FC<Props> = function ({
  title = "LiveUta",
  children,
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="content" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};
