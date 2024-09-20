import { GiHomeGarage } from "react-icons/gi";
import { IoMdList } from "react-icons/io";
import { RiLogoutCircleLine, RiSettings4Line } from "react-icons/ri";

export const customerLinks = [
    {
        name: 'Service Providers',
        url: '/service-providers',
        icon: <GiHomeGarage />
    },
    {
        name: 'Appointments',
        url: '/appointments',
        icon: <IoMdList />
    },
    {
        name: 'Settings',
        url: '/settings',
        icon: <RiSettings4Line />
    },
    {
        name: 'Logout',
        url: '/auth/login',
        icon: <RiLogoutCircleLine />
    }
]