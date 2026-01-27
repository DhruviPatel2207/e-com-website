const useLocalStorage = () => {
  const getLocalStorage = (key: string) => {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    } else {
      return undefined;
    }
  };
  const setLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  };
  const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
    return true;
  };

  return { getLocalStorage, setLocalStorage, removeLocalStorage };
};

export default useLocalStorage;
