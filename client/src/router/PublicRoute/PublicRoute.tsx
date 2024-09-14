import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
    const user = true;

    return user ? <Navigate to='/' /> : children;
}