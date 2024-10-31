const getCssUrl = (cssUrl: string) => {
  const regex = /url\(['"]?(.*?)['"]?\)/g;
  const match = regex.exec(cssUrl);
  return match ? match[1] : '';
};

export default getCssUrl;
