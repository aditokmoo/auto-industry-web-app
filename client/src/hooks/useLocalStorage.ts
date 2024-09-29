import { useState } from "react";

interface ServiceProviderDataType {
    [key: string]: boolean;
}

export default function useLocalStorage(key: string, defaultValue: ServiceProviderDataType[]): [ServiceProviderDataType[], (value: ServiceProviderDataType[]) => void] {
    const [localStorageValue, setLocalStorageValue] = useState<ServiceProviderDataType[]>(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        } catch (error) {
            console.error("Error accessing localStorage", error);
            return defaultValue;
        }
    });

    const setLocalStorageStateValue = (value: ServiceProviderDataType[]) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            setLocalStorageValue(value);
        } catch (error) {
            console.error("Error setting localStorage", error);
        }
    };

    return [localStorageValue, setLocalStorageStateValue];
}