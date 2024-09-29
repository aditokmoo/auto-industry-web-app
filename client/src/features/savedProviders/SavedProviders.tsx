import Card from '../../components/Card/Card';
import useArchiveProviders from '../../hooks/useArchiveProviders';
// SCSS
import styles from './SavedProviders.module.scss'

export default function SavedProviders() {
  const { archive, toggleArchive } = useArchiveProviders();

  console.log(archive)

  return (
    <div className={styles.savedProvidersLayout}>
      <h2 className={styles.title}>Saved Providers</h2>
      <div className={styles.savedProviders}>
        {archive.map((user: any) => (
          <Card user={user} toggleArchive={toggleArchive} archive={archive} key={user.name} />
        ))}
      </div>
    </div>
  )
}
