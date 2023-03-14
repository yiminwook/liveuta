const getBaseUrl = (isServer: boolean) => {
  if (isServer === true) {
    const protocol = process.env.PROTOCOL || " http";
    const host = process.env.HOST || "localhost";
    const port = process.env.PORT || "3000";
    const baseUrl = `${protocol}://${host}:${port}`;
    return baseUrl;
  }
};

export default getBaseUrl;
