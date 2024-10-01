import { ServiceTypes } from '../../../../lib/ServiceTypes'
import styles from './FilterProviders.module.scss'
import { FaCheck } from 'react-icons/fa';

interface PropTypes {
    setSelectedGroups: any,
    selectedGroups: any
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
                    onKeyDown={(e) => e.key === 'Enter' && toggleFilter(filter.name)} // Enable keyboard accessibility
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