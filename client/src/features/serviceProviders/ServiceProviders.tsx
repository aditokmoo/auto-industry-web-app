import { useGetUsers } from './api/hooks/useServiceProviders';
import FilterProviders from './components/FilterProviders/FilterProviders';
import Providers from './components/Providers/Providers';
import SearchProviders from './components/SearchProviders/SearchProviders';
import styles from './ServiceProviders.module.scss';

export default function ServiceProviders() {
    const { data: users, isLoading: isLoadingUsers } = useGetUsers({ type: 'type', value: 'serviceProvider' });
    
    if(isLoadingUsers) return <h2>Loading...</h2>
    console.log(users)
    return (
        <div className={styles.layout}>
            <SearchProviders />
            <FilterProviders />
            <Providers data={users} />
        </div>
    )
}
