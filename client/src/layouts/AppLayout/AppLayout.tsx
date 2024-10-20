import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import styles from './AppLayout.module.scss';

export default function AppLayout() {
    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.layout}>
                <Outlet />
            </div>
        </div>
    )
}
