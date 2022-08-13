import { useState, useEffect } from "react";

// Get item from local storage, or return an empty string as default value
// Detects whether changes have been made to the specified local storage item
// note that useEffect(() => {}, [localStorage]) does nto work, since we are manipulating the actual windows object directly instead of the virtual dom
// so, as a workaround, duplicate the local storage state
export const useLocalStorage = (
  itemName: string
): [string, (item: string) => void] => {
  const [item, setItem] = useState<string>(
    localStorage.getItem(itemName) || ""
  );
  const handleSetItem = (itemValue: string) => {
    localStorage.setItem(itemName, itemValue);
    setItem(itemValue);
  };

  // to cater for cases where local storage is manipulated directly instead of through the hook
  const handleManualChange = () => {
    setItem(localStorage.getItem(itemName) || "");
  };
  useEffect(() => {
    window.addEventListener("storage", () => handleManualChange);
    return () => window.removeEventListener("storage", handleManualChange);
  }, []);

  return [item, handleSetItem];
};
