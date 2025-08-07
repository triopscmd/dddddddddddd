```typescript
const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__test_localStorage__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.warn("Local storage is not available or accessible.", e);
    return false;
  }
};

const setItem = <T>(key: string, value: T): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error storing item with key "${key}" in local storage:`, error);
  }
};

const getItem = <T>(key: string): T | null => {
  if (!isLocalStorageAvailable()) {
    return null;
  }
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error(`Error retrieving or parsing item with key "${key}" from local storage:`, error);
    return null;
  }
};

const removeItem = (key: string): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item with key "${key}" from local storage:`, error);
  }
};

const clearAll = (): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing all items from local storage:", error);
  }
};

export const localStorageService = {
  setItem,
  getItem,
  removeItem,
  clearAll,
};