import { useEffect, useState } from "react";

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