export default function createArray(length: number) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push("");
  }

  return arr;
}
