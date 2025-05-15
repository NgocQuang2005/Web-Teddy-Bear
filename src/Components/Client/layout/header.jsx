import React, { useEffect, useState } from 'react';
import { Dropdown, Space, Badge } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../../../assets/image/logo.png";
import { getAllCartItems } from '../../../services/cartItem.services';

function Header() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const [searchText, setSearchText] = useState('');
    // Đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        navigate('/');
    };

    // Danh sách dropdown
    const items = [
        {
            key: '1',
            label: (
                <NavLink to={"/client/editpersonal"}>
                    Chỉnh sửa hồ sơ
                </NavLink>
            ),
        },
        {
            key: '2',
            label: (
                <NavLink to={"/client/orders"}>
                    Đơn hàng đã đặt
                </NavLink>
            ),
        },
        {
            key: '3',
            label: (
                <button onClick={handleLogout}>Đăng xuất</button>
            ),
        },
    ];
    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("token"));
                if (!user || !user.id) return;
                const res = await getAllCartItems();
                // Lọc các cart item thuộc về user
                const userCart = res.data.filter(item => item.userId === user.id);
                // Đếm số lượng object (tức là số đơn hàng)
                setCartCount(userCart.length);
            } catch (error) {
                console.error("Lỗi khi lấy giỏ hàng:", error);
            }
        };
        fetchCartCount();

        // Lắng nghe sự kiện cập nhật giỏ hàng
        const handleCartUpdated = () => fetchCartCount();
        window.addEventListener("cartItemUpdated", handleCartUpdated);

        return () => {
            window.removeEventListener("cartItemUpdated", handleCartUpdated);
        };

    }, []);
    //tìm kiếm gấu bông
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchText.trim()) {
            navigate(`/client/products?search=${encodeURIComponent(searchText.trim())}`);
            setSearchText("");
        }
    };
    return (
        <header className="container p-1">
            <label className="phone" htmlFor="menu-mobile__show">
                <ion-icon className="menu-phone" name="menu-outline"></ion-icon>
            </label>
            <div className="logo">
                <NavLink to={"/client/home"}>
                    <img className='logo-icon' src={logo} alt="Logo" />
                </NavLink>
            </div>
            <ul className="menu-destop">
                <li className="menu-item"><NavLink to={"/client/home"}>Trang chủ</NavLink></li>
                <li className="menu-item"><NavLink to={"/client/products"}>Sản phẩm</NavLink></li>
                <li className="menu-item"><NavLink to={"/client/blindbox"}>Blindbox</NavLink></li>
                <li className="menu-item"><NavLink to={"/client/contact"}>Liên hệ</NavLink></li>
            </ul>
            <form onSubmit={handleSearch} className="search-form">
                <button type="submit" className="search-btn">
                    <ion-icon name="search-outline"></ion-icon>
                </button>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Tìm kiếm gấu bông..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </form>
            <div className="cart-setting">
                {/* Hiển thị icon giỏ hàng kèm số lượng */}
                <Badge count={cartCount} showZero size="small" offset={[-2, 5]}>
                    <NavLink to={"/client/cartitems"}>
                        <ion-icon name="cart-outline" style={{ fontSize: "24px" }}></ion-icon>
                    </NavLink>
                </Badge>

                {/* Dropdown user */}
                <Space direction="vertical">
                    <Space wrap>
                        <Dropdown menu={{ items }} placement="bottomRight" arrow>
                            <span style={{ cursor: "pointer" }}>
                                <ion-icon name="person-circle-outline" style={{ fontSize: "24px" }}></ion-icon>
                            </span>
                        </Dropdown>
                    </Space>
                </Space>
            </div>
        </header>
    );
}

export default Header;
