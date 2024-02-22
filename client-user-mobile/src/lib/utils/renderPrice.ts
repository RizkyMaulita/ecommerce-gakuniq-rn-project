export const renderPrice = (price: number) => {
  return `Rp${Number(price).toLocaleString("id-ID") || 0},-`;
};
