import { useState } from 'react';
import { useGetUsers } from './api/hooks/useServiceProviders';
import FilterProviders from './components/FilterProviders/FilterProviders';
import Providers from './components/Providers/Providers';
import SearchProviders from './components/SearchProviders/SearchProviders';
import styles from './ServiceProviders.module.scss';
import { ServiceTypes } from '../../lib/ServiceTypes';

export default function ServiceProviders() {
    const [selectedGroups, setSelectedGroups] = useState<string[]>(ServiceTypes.map((type) => type.name));
    const { data: users } = useGetUsers({ type: 'serviceProvider', groups: selectedGroups });

    return (
        <div className={styles.layout}>
            <SearchProviders />
            <FilterProviders setSelectedGroups={setSelectedGroups} selectedGroups={selectedGroups} />
            <Providers data={users} />
        </div>
    );
}
