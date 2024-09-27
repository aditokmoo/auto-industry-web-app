// Styles
import { IoArchive, IoArchiveOutline } from 'react-icons/io5';
import styles from './Providers.module.scss';
import useLocalStorage from '../../../../hooks/useLocalStorage';

interface User {
  name: string;
  phoneNumber: string;
  profileImage: string;
  workImages: string[];
}

interface PropTypes {
  data: {
    users: User[];
  };
}

export default function Providers({ data }: PropTypes) {
  const [archive, setArchive] = useLocalStorage('archivedProviders', {});

  const toggleArchive = (name: string) => {
    const newArchiveState = {
      ...archive,
      [name]: !archive[name],
    };
    
    setArchive(newArchiveState);
  };

  return (
    <div className={styles.providersLayout}>
      {data.users.map((user: User) => (
        <div className={styles.card} key={user.name}>
          {!archive[user.name] ? (
            <div className={styles.save} onClick={() => toggleArchive(user.name)}>
              <IoArchiveOutline />
            </div>
          ) : (
            <div className={styles.save} onClick={() => toggleArchive(user.name)}>
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
      ))}
    </div>
  );
}
