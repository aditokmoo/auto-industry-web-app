import { useState } from "react";

interface ArchiveState {
    [key: string]: boolean;
}

export default function useLocalStorage(key: string, defaultValue: ArchiveState): [ArchiveState, (value: ArchiveState) => void] {
    const [localStorageValue, setLocalStorageValue] = useState<ArchiveState>(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        } catch (error) {
            console.error("Error accessing localStorage", error);
            return defaultValue;
        }
    });

    const setLocalStorageStateValue = (value: ArchiveState) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            setLocalStorageValue(value);
        } catch (error) {
            console.error("Error setting localStorage", error);
        }
    };

    return [localStorageValue, setLocalStorageStateValue];
}
