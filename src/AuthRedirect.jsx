import { Navigate } from 'react-router-dom'

const AuthRedirect = ({ children }) => {
    const token = localStorage.getItem('token')
    if (token) {
        return <Navigate to="/client/home" replace />
    }
    return children
}

export default AuthRedirect
