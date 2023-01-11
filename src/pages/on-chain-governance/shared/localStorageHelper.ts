import { RememberMasterNodeId } from "../enum/RememberMasterNodeId";

// Function returns undefined when key is not found
// when connection is provided function would check for undefined
// and return "rememberMasternodeId"/"masternodeId" value from localStore

export function getLocalStorageItem(key, connection?) {
  const localStorageItem = localStorage.getItem(key)!;

  if (connection) {
    const masternodeOptions = JSON.parse(localStorageItem) ?? {};
    if (key === "rememberMasternodeId") {
      return connection in masternodeOptions
        ? masternodeOptions[connection]
        : RememberMasterNodeId.Yes;
    } else {
      return connection in masternodeOptions
        ? masternodeOptions[connection]
        : "";
    }
  }

  try {
    return JSON.parse(localStorageItem);
  } catch {
    return localStorageItem;
  }
}

export function setLocalStorage(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}
