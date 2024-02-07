export const generateSlug = (name: string) => {
  if (!name) return "";

  return `${name
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "_")}_${new Date().getTime()}`;
};
