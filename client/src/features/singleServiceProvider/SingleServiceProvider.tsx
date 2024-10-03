import { useParams } from 'react-router';
import { useGetSingleUser } from './api/hooks/useSingleServiceProvider';
import { MdOutlineSchedule } from 'react-icons/md';
// SCSS
import styles from './SingleServiceProvider.module.scss';
import { FaPhoneSquare, FaVoicemail } from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';
import { useState } from 'react';
import CreateAppointment from '../appointments/components/CreateAppointment/CreateAppointment';

export default function SingleServiceProvider() {
    const { id } = useParams();
    const { data: user, isLoading: isUserLoading } = useGetSingleUser(id!);
    const [ activeModal, setActiveModal ] = useState(false);

    if (isUserLoading) return <h2>Loading...</h2>

    console.log(user)

    return (
        <div className={styles.singleServiceProviderLayout}>
            <div className={styles.slider}>
                {user.workImages.map((image: string, index: string) => (
                    <img
                        key={index}
                        src={`http://localhost:8000/uploads/${image}`}
                        alt={user.name}
                        className={styles.image}
                    />
                ))}
            </div>
            <div className={styles.nav}>
                <button onClick={() => setActiveModal(true)}><MdOutlineSchedule />Schedule appointment</button>
            </div>

            <div className={styles.profile}>
                <div className={styles.info}>
                    <img
                        src={`http://localhost:8000/uploads/${user.profileImage}`}
                        alt={user.name}
                        className={styles.profileImage}
                    />
                    <div className={styles.details}>
                        <h2>{user.name}</h2>
                        <ul>
                            <li><FaVoicemail /> {user.email}</li>
                            <li><FaPhoneSquare /> {user.phoneNumber}</li>
                            <li><FaLocationPin /> {user.location}</li>
                        </ul>
                    </div>
                </div>
            </div>

            {activeModal && <CreateAppointment />}
        </div>
    )
}