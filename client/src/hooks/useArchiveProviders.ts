import useLocalStorage from "./useLocalStorage";

interface ServiceProviderDataType {
    [key: string]: boolean;
}

export default function useArchiveProviders() {
    const [archive, setArchive] = useLocalStorage('archivedProviders', []);

    const toggleArchive = (serviceProviderData: ServiceProviderDataType) => {
        const isArchived = archive.some(
            (provider: ServiceProviderDataType) => provider.name === serviceProviderData.name
        );

        if (isArchived) {
            const updatedArchive = archive.filter(
                (provider: ServiceProviderDataType) => provider.name !== serviceProviderData.name
            );
            setArchive(updatedArchive);
        } else {
            const updatedArchive = [...archive, serviceProviderData];
            setArchive(updatedArchive);
        }
    };

    return {
        archive,
        toggleArchive,
    };
}