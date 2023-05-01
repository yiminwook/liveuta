const getBaseURL = (isServer: boolean) => {
  if (isServer === true) {
    const protocol = process.env.PROTOCOL ?? ' http';
    const host = process.env.HOST ?? 'localhost';
    const port = process.env.PORT ?? '3000';
    const baseURL = `${protocol}://${host}:${port}`;
    return baseURL;
  }
};

export default getBaseURL;
