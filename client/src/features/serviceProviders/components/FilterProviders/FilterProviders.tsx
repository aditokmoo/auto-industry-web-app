import { FaCar } from 'react-icons/fa'
import styles from './FilterProviders.module.scss'

const filters = [
    {
        icon: <FaCar />,
        name: 'Mehanic'
    },
    {
        icon: <FaCar />,
        name: 'Electrician'
    },
    {
        icon: <FaCar />,
        name: 'Detailer'
    },
    {
        icon: <FaCar />,
        name: 'Body specialist'
    },
    {
        icon: <FaCar />,
        name: 'Exhaust'
    },
    {
        icon: <FaCar />,
        name: 'Tunning'
    },
    {
        icon: <FaCar />,
        name: 'Transmission'
    },
]

export default function FilterProviders() {
    return (
        <div className={styles.filterProvider}>
            {filters.map((filter: { icon: React.ReactNode, name: string }) => (
                <div className={styles.item}>
                    {filter.icon}
                    {filter.name}
                </div>
            ))}
        </div>
    )
}
