import { NetworkConnection } from "@contexts/NetworkContext";
import { RememberMasterNodeId } from "../enum/RememberMasterNodeId";

/**
 *
 * @param key
 * @param connection
 * @returns
 * - Function returns undefined when key is not found
 * - If connection is provided function would check for undefined and return object value based on connection
 *
 */

export function getLocalStorageItem(
  key: string,
  connection?: NetworkConnection
) {
  const localStorageItem = localStorage.getItem(key)!;

  if (connection) {
    const storageObject = JSON.parse(localStorageItem) ?? {};
    if (key === "rememberMasternodeId") {
      return connection in storageObject
        ? storageObject[connection]
        : RememberMasterNodeId.Yes;
    } else {
      return connection in storageObject ? storageObject[connection] : "";
    }
  }

  try {
    return JSON.parse(localStorageItem);
  } catch {
    return localStorageItem;
  }
}

export function setLocalStorage(key: string, item: any) {
  localStorage.setItem(key, JSON.stringify(item));
}
