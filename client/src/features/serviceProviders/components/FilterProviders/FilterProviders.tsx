import { Dispatch, SetStateAction } from 'react';
import { ServiceTypes } from '../../../../lib/ServiceTypes'
import { FaCheck } from 'react-icons/fa';
import styles from './FilterProviders.module.scss'

interface PropTypes {
    setSelectedGroups: Dispatch<SetStateAction<string[]>>
    selectedGroups: string[]
}

export default function FilterProviders({ setSelectedGroups, selectedGroups }: PropTypes) {

    const toggleFilter = (filterName: string) => {
        setSelectedGroups((prevFilters: string[]) =>
            prevFilters.includes(filterName)
                ? prevFilters.filter((name: string) => name !== filterName)
                : [...prevFilters, filterName]
        );
    };

    return (
        <div className={styles.filterProvider}>
            {ServiceTypes.map((filter: { name: string; color: string }) => (
                <div
                    onClick={() => toggleFilter(filter.name)}
                    onKeyDown={(e) => e.key === 'Enter' && toggleFilter(filter.name)}
                    className={`${styles.item} ${selectedGroups?.includes(filter.name) ? styles.active : ''}`}
                    role="button"
                    tabIndex={0}
                    key={filter.name}
                >
                    {selectedGroups.includes(filter.name) && <FaCheck className={styles.icon} />}
                    {filter.color !== '#fff' && <span className={styles.groupColor} style={{ backgroundColor: filter.color }}></span>}
                    {filter.name}
                </div>
            ))}
        </div>
    );
}