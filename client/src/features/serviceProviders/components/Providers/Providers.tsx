// Styles
import styles from './Providers.module.scss';

interface PropTypes {
  data: any
}

export default function Providers({ data }: PropTypes) {
  return (
    <div className={styles.providersLayout}>
        {
          data.users.map((user: any) => (
            <p key={user.name}>{user.name}</p>
          ))
        }
    </div>
  )
}
