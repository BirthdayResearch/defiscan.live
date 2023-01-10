export function getLocalStorageItem(key) {
  const localStorageItem = localStorage.getItem(key) ?? "{}";
  return JSON.parse(localStorageItem);
}

export function setLocalStorage(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}
