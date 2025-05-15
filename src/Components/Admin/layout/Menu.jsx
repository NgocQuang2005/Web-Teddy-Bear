import React from 'react';
import "../../../assets/Admin_Css/css/menu.css";
import {
    AppstoreAddOutlined,
    BarsOutlined,
    HomeOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const items = [
    { key: '1', icon: <HomeOutlined />, label: <NavLink to={"/admin/home"}>Trang chủ</NavLink> },
    {
        key: 'sub1',
        label: 'Quản lý người dùng',
        icon: <UserOutlined />,
        children: [
            { key: '2', label: <NavLink to={"/admin/users"}>Thông tin người dùng</NavLink> },
            { key: '3', label: <NavLink to={"/admin/role"}>Vai trò</NavLink> },
        ],
    },
    {
        key: 'sub2',
        label: 'Quản lý gấu bông',
        icon: <AppstoreAddOutlined />,
        children: [
            { key: '4', label: <NavLink to={"/admin/category"}>Loại hãng gấu bông</NavLink> },
            { key: '5', label: <NavLink to={"/admin/product"}>Sản phẩm gấu bông</NavLink> },
            { key: '6', label: <NavLink to={"/admin/cartitem"}>Giỏ hàng</NavLink> },
        ],
    },
    {
        key: 'sub3',
        label: 'Quản lý đơn hàng',
        icon: <BarsOutlined />,
        children: [
            { key: '7', label: <NavLink to={"/admin/order"}>Đơn hàng</NavLink> },
        ],
    },
    { key: '8', icon: <LogoutOutlined />, label: 'Đăng xuất' },
];

const pathToKeyMap = {
    '/admin/home': { key: '1', openKey: null },
    '/admin/users': { key: '2', openKey: 'sub1' },
    '/admin/role': { key: '3', openKey: 'sub1' },
    '/admin/category': { key: '4', openKey: 'sub2' },
    '/admin/product': { key: '5', openKey: 'sub2' },
    '/admin/cartitem': { key: '6', openKey: 'sub2' },
    '/admin/order': { key: '7', openKey: 'sub3' },
};

const MenuAdmin = ({ collapsed, toggleCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const current = pathToKeyMap[currentPath] || { key: '', openKey: null };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/admin/login');
    };

    return (
        <div
            style={{ width: collapsed ? 80 : 256, transition: 'width 0.2s' }}
            className='h-full fixed menu_admin'
        >
            <div className='flex justify-end'>
                <button onClick={toggleCollapsed} className='p-2 cursor-pointer text-white m-2 font-bold text-xl '>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </button>
            </div>
            <Menu
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                selectedKeys={[current.key]}
                defaultOpenKeys={current.openKey ? [current.openKey] : []}
                items={items}
                onClick={(e) => {
                    if (e.key === '8') {
                        handleLogout();
                    }
                }}
            />
        </div>
    );
};

export default MenuAdmin;
