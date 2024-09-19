import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useAuthContext } from '../../features/auth/context/auth.context';

type PrivateRouteProps = {
    allowedRoles: string[];
    children?: ReactNode;
};

export default function PrivateRoute({ allowedRoles, children }: PrivateRouteProps) {
    const { state } = useAuthContext();
    const location = useLocation();

    // If the user is not authenticated, redirect to login
    if (!state.currentUser) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // If the user does not have the required role, redirect to home
    if (!allowedRoles.some(role => state.userRoles.includes(role))) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children ? children : <Outlet />
}