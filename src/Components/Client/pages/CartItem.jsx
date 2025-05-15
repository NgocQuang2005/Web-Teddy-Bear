import React, { useEffect, useState } from 'react';
import { message, Modal, Button, notification } from 'antd';
import { deleteCartItems, getAllCartItems, updateCartItems } from '../../../services/cartItem.services';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../../services/products.services';

function CartItemClient() {
    const [cartItems, setCartItems] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const fetchCartItems = async () => {
        const user = JSON.parse(localStorage.getItem("token")); // Đảm bảo key đúng

        if (!user || !user.id) {
            Modal.confirm({
                title: 'Bạn chưa đăng nhập',
                content: 'Bạn cần đăng nhập để xem giỏ hàng. Bạn có muốn chuyển đến trang đăng nhập không?',
                okText: 'Có',
                cancelText: 'Không',
                onOk() {
                    navigate('/login');
                },
            });
            return;
        }

        try {
            const [cartRes, productRes] = await Promise.all([
                getAllCartItems(),
                getAllProducts()
            ]);

            const userCartItems = cartRes.data.filter(item => item.userId === user.id);
            const allProducts = productRes.data;

            // Ghép dữ liệu sản phẩm vào từng item trong giỏ
            const mergedCart = userCartItems.map(item => {
                const product = allProducts.find(p => p.id === item.productId);
                return {
                    ...item,
                    productName: product?.name || 'Không rõ',
                    imageUrl: product?.imageUrl || '',
                    unitPrice: product?.price || 0,
                    totalPrice: item.quantity * (product?.price || 0)
                };
            });

            setCartItems(mergedCart);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
            message.error("Không thể tải giỏ hàng.");
        }
    };
    useEffect(() => {
        fetchCartItems();
        window.addEventListener("cartItemUpdated", fetchCartItems);
        return () => window.removeEventListener("cartItemUpdated", fetchCartItems);
    }, [navigate]);

    const formatCurrency = (value) => `${new Intl.NumberFormat('vi-VN').format(value)} VND`;

    const handleBuyNow = (item) => {
        message.info(`Bạn đã chọn mua ngay sản phẩm: ${item.productName}`);
    };

    const handleDelete = async (id) => {
        const res = await deleteCartItems(id);
        console.log(">>>>", res.data)
        if (res.data) {
            api["success"]({
                message: 'Delete product',
                description:
                    'Xóa product thành công',
            });
            fetchCartItems()
        } else {
            api["error"]({
                message: "Error delete product",
                description: JSON.stringify(res.message)
            });
        }
    }
    const handleUpdateQuantity = async (item, newQuantity) => {
        if (newQuantity <= 0) {
            message.warning("Số lượng phải lớn hơn 0");
            return;
        }

        try {
            const res = await updateCartItems(item.id, item.userId, item.productId, newQuantity);
            if (res && res.data) {
                fetchCartItems();
            }
        } catch (err) {
            api.error({
                message: 'Lỗi cập nhật số lượng',
                description: 'Không thể cập nhật số lượng sản phẩm',
            });
        }
    };
    return (
        <>
            {contextHolder}
            <div className="max-w-5xl mx-auto mt-12 px-6">
                <h1 className="text-2xl font-semibold mb-6">🛒 Giỏ hàng của bạn</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">Giỏ hàng của bạn đang trống.</div>
                ) : (
                    <div className="space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border p-4 rounded shadow-sm bg-white">
                                <img
                                    src={`https://localhost:7229/${item.imageUrl}`}
                                    alt={item.productName}
                                    className="w-20 h-20 object-cover rounded border"
                                />

                                {/* Thông tin sản phẩm */}
                                <div className="flex-1 ml-4">
                                    <h2 className="text-lg font-semibold">{item.productName}</h2>
                                    <p className="text-sm text-gray-600">Đơn giá: {formatCurrency(item.unitPrice)}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">Số lượng:</span>
                                        <Button size="small" onClick={() => handleUpdateQuantity(item, item.quantity - 1)}>-</Button>
                                        <span className="px-2">{item.quantity}</span>
                                        <Button size="small" onClick={() => handleUpdateQuantity(item, item.quantity + 1)}>+</Button>
                                    </div>

                                    <p className="text-sm font-semibold text-red-500">Thành tiền: {formatCurrency(item.totalPrice)}</p>
                                </div>

                                {/* Nút hành động */}
                                <div className="flex flex-col gap-2">
                                    <Button type="primary" onClick={() => handleBuyNow(item)}>Mua ngay</Button>
                                    <Button danger onClick={() => handleDelete(item.id)}>Xoá</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default CartItemClient;
