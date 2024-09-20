import { Outlet } from "react-router";
import SideBar from "../../components/SideBar/SideBar";
import styles from './AppLayout.module.scss';

export default function AppLayout() {
    return (
        <div className={styles.main}>
            <SideBar />
            <div className={styles.layout}>
                <Outlet />
            </div>
        </div>
    )
}
