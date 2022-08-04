import { useEffect, useState } from "react";

// Detects whether changes have been made to the specified local storage item
// note that the storage event only get picked up (by the listener) if the localStorage was changed in another browser's tab/window (of the same app),
// but not within the context of the current tab
// so, as a workaround, need to manually trigger the event with window.dispatchEvent(new Event("storage"));
export const useLocalStorage = (
  itemName: string
): [string, (item: string) => void] => {
  const [item, setItem] = useState<string>(
    localStorage.getItem(itemName) || ""
  );

  const handleSetItem = () => {
    console.log("storage changed");
    const _item = localStorage.getItem(itemName) || "";
    setItem(_item);
  };

  useEffect(() => {
    window.addEventListener("storage", handleSetItem);
    return () => window.removeEventListener("storage", handleSetItem);
  }, []);

  return [item, setItem];
};
