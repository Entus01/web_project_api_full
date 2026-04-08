import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute ({ isLoggedIn, children, anonymous = false }) {
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    if (isLoggedIn && anonymous) {
        return <Navigate to={from} replace />;
    }

    if (!isLoggedIn && !anonymous) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
}