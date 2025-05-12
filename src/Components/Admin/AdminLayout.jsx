import React, { useState } from 'react'
import MenuAdmin from './layout/Menu'
import { Navigate, Outlet } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';

function AdminLayout({ role }) {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
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
    const user = Object(JSON.parse(localStorage.getItem('token')))
    return (
        <div className='flex'>
            <div style={{ transition: 'width 0.2s', width: collapsed ? 80 : 256 }}>
                <MenuAdmin collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
            </div>
            <div style={{ flex: 1, transition: 'margin-left 0.2s' }} className='p-2'>
                <div className='bg-amber-50 w-full px-2 py-3 rounded-xs flex justify-end items-center'><span className='font-bold'><UserOutlined /> Admin: </span><span className='ml-3'>{user.fullName}</span></div>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout