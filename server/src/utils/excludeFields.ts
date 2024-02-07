type ModelKeys<T> = keyof T & (string | number | symbol);

export function excludeFields<T extends object, K extends ModelKeys<T>>(
  model: T,
  keysToExclude: K[]
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(model).filter(([key]) => !keysToExclude.includes(key as K))
  ) as Omit<T, K>;
}
