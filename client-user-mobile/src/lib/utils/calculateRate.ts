type Params<T> = {
  listData: T[];
  keyRate?: keyof T;
};

export default function calculateRate<T>({ listData, keyRate }: Params<T>) {
  const totalData = listData.length;

  if (!totalData) return 0;

  const totalRate = listData.reduce((acc, curr) => {
    const val = keyRate ? Number(curr[keyRate]) : Number(curr);

    return acc + (val || 0);
  }, 0);

  return Number(totalRate / totalData).toFixed(1) || 0;
}
