import FilterProviders from './components/FilterProviders/FilterProviders';
import Providers from './components/Providers/Providers';
import SearchProviders from './components/SearchProviders/SearchProviders';
import styles from './ServiceProviders.module.scss';

export default function ServiceProviders() {
    return (
        <div className={styles.layout}>
            <SearchProviders />
            <FilterProviders />
            <Providers />
        </div>
    )
}
