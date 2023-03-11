import getConfig from "next/config";

const getBaseUrl = (isServer: boolean): string => {
  if (isServer === true) {
    const protocol = process.env.PROTOCOL || " http";
    const host = process.env.HOST || "localhost";
    const port = process.env.PORT || "3000";
    const baseUrl = `${protocol}://${host}:${port}`;
    return baseUrl;
  } else {
    const { publicRuntimeConfig } = getConfig();
    const protocol = publicRuntimeConfig.PROTOCOL || " http";
    const host = publicRuntimeConfig.HOST || "localhost";
    const port = publicRuntimeConfig.PORT || "3000";
    const baseUrl = `${protocol}://${host}:${port}`;
    return baseUrl;
  }
};

export default getBaseUrl;
