import { Outlet } from "react-router";

// Images
import Logo from '../../assets/logo.jpg'

// SCSS
import styles from './AuthLayout.module.scss';

export default function AuthLayout() {
    return (
        <div className={styles.authLayout}>
            <img src={Logo} alt="" className={styles.logo} />
            <div className={styles.auth}>
                <div className={styles.authSection}>
                    <Outlet />
                </div>
                <div className={styles.imageSection}></div>
            </div>
        </div>
    )
}
