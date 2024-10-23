import { FaSearch } from 'react-icons/fa'
import styles from './SearchProviders.module.scss'

export default function SearchProviders() {
    return (
        <form className={styles.form}>
            <div className={styles.label}>
                <FaSearch className={styles.searchIcon} />
                <input type='text' placeholder='Search' id='search' />
            </div>
            <button>Search</button>
        </form>
    )
}