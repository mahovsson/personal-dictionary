export const setItemToLocalStorage = function (localStorageKey: string, value: string[]) {
  if (typeof localStorageKey !== "string") return null;
  localStorage.setItem(localStorageKey, JSON.stringify(value));
};

export const getItemFromLocalStorage = function (localStorageKey: string) {
  if (typeof localStorageKey !== "string") return null;
  const item = localStorage.getItem(localStorageKey);
  return item !== null ? JSON.parse(item) : null;
};
