import { Navigate } from "react-router";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    let user = false;
    return !user ? <Navigate to='/auth/login' /> : children;
}
