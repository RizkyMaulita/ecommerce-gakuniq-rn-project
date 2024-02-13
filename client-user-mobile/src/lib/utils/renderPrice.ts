export const renderPrice = (price: number) => {
  return Number(price).toLocaleString("id-ID") || 0;
};
