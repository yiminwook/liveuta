interface PageHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

const PageHead = ({ title, description, image, keywords }: PageHeadProps) => {
  return (
    <>
      {/* default */}
      {/* <meta name="keywords" content={pageKeywords} /> */}
      {/* <link rel="manifest" href={`${siteURL}/manifest.json`} /> */}
    </>
  );
};

export default PageHead;
