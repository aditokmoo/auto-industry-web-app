import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
    const user = false;

    return user ? <Navigate to='/' /> : children;
}