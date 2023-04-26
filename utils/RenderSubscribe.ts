export const renderSubscribe = (subscribe: string) => {
  if (subscribe === '비공개') {
    return subscribe;
  } else if (subscribe.length > 4) {
    return `${+subscribe / 10000}만 명`;
  } else {
    return subscribe + ' 명';
  }
};
