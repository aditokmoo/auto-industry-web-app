import { ServiceTypes } from '../../lib/ServiceTypes';
import { MdLocationOn } from 'react-icons/md';
import { FaSquarePhone } from 'react-icons/fa6';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { User } from '../../types';
// SCSS
import styles from './Card.module.scss';

interface PropTypes {
    toggleArchive: (user: User) => void,
    archive: User[],
    user: User
}

export default function Card({ toggleArchive, archive, user }: PropTypes) {
    return (
        <Link to={`/${user._id}`} className={styles.card} key={user.email}>
            <div className={styles.serviceTypes}>
                {ServiceTypes.filter((serviceType) => user.group.includes(serviceType.name)).map((groupType) => (
                    <span className={styles.serviceType} style={{ backgroundColor: groupType.color }} key={groupType.name}></span>
                ))}
            </div>
            {!archive.some(({ name }: { name: string }) => name === user.name) ? (
                <div className={styles.save} onClick={() => toggleArchive(user)}>
                    <FaRegHeart />
                </div>
            ) : (
                <div className={styles.save} onClick={() => toggleArchive(user)}>
                    <FaHeart />
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
                    <span className={styles.phoneNumber}><FaSquarePhone className={styles.phoneIcon} />{user.phoneNumber}</span>
                    <span className={styles.location}><MdLocationOn className={styles.locationIcon} /> {user.location}</span>
                </div>
                <div className={styles.rating}>
                    {[1,2,3,4,5].map((rating) => (
                        <FaStar />
                    ))}
                </div>
            </div>
        </Link>
    )
}
