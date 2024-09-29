import { IoArchive, IoArchiveOutline } from 'react-icons/io5'
import styles from './Card.module.scss';
import { ServiceTypes } from '../../lib/ServiceTypes';

interface PropTypes {
    toggleArchive: any,
    archive: any,
    user: any
}

export default function Card({ toggleArchive, archive, user }: PropTypes) {
    return (
        <div className={styles.card} key={user.name}>
            <div className={styles.serviceTypes}>
                {ServiceTypes.filter((serviceType) => user.group.includes(serviceType.name)).map((groupType) => (
                    <span className={styles.serviceType} style={{ backgroundColor: groupType.color }}></span>
                ))}
            </div>
            {!archive.some(({ name }: { name: string }) => name === user.name) ? (
                <div className={styles.save} onClick={() => toggleArchive(user)}>
                    <IoArchiveOutline />
                </div>
            ) : (
                <div className={styles.save} onClick={() => toggleArchive(user)}>
                    <IoArchive />
                </div>
            )}
            <div className={styles.slider}>
                {user.workImages.map((image: string, index: number) => (
                    <img
                        key={index}
                        src={`http://localhost:8000/uploads/${image}`}
                        alt={user.name}
                        className={styles.workImage}
                    />
                ))}
            </div>

            <div className={styles.info}>
                <img
                    src={`http://localhost:8000/uploads/${user.profileImage}`}
                    alt={user.name}
                    className={styles.profileImage}
                />
                <div className={styles.details}>
                    <h4 className={styles.name}>{user.name}</h4>
                    <span className={styles.phoneNumber}>+ {user.phoneNumber}</span>
                </div>
            </div>
        </div>
    )
}
