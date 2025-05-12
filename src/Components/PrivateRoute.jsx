import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ role }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');  // Lấy role từ localStorage

    if (!token) {
        // Nếu không có token, chuyển hướng về login
        return <Navigate to="/admin/login" />;
    }

    // Nếu có role và role không đúng, chuyển hướng về login
    if (role && parseInt(userRole) !== role) {
        return <Navigate to="/admin/login" />;
    }

    return <>
        <Outlet />
    </>;
};

export default PrivateRoute;
