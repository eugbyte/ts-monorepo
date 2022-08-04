import { useEffect, useState } from "react";

// note that storage event only trigger only works if other window changes the local storage
// so, as a workaround, need to manually trigger the event with window.dispatchEvent(new Event("storage"));
export const useLocalStorage = (itemName: string): [string, (item: string) => void] => {
    const [item, setItem] = useState<string>(localStorage.getItem(itemName) || "");

    const handleSetItem = () => {
        console.log("storage changed");
        const _item = localStorage.getItem(itemName) || "";
        setItem(_item);
    }

    useEffect(() => {
        window.addEventListener("storage", handleSetItem);
        return () => window.removeEventListener("storage", handleSetItem);
    }, []);

    return [item, setItem];
}