import useArchiveProviders from '../../../../hooks/useArchiveProviders';
import Card from '../../../../components/Card/Card';
// Styles
import styles from './Providers.module.scss';
import { User } from '../../../../types';

interface PropTypes {
  data: {
    users: User[];
  };
}

export default function Providers({ data }: PropTypes) {
  const { archive, toggleArchive } = useArchiveProviders();

  return (
    <div className={styles.providersLayout}>
      {data?.users?.map((user: User) => (
        <Card user={user} toggleArchive={toggleArchive} archive={archive} key={user.name} />
      ))}
    </div>
  );
}
