import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { getProductById, getAllProducts } from '../../../services/products.services';
import { Button, Modal } from 'antd';
import "../../../assets/Client_Css/productDetail.css";
import { createCartItems } from '../../../services/cartItem.services';
import { notification } from 'antd';

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProductById(id);
                setProduct(res.data);

                const allRes = await getAllProducts();
                const filteredProducts = allRes.data.filter(
                    (item) => item.categoryId === res.data.categoryId && item.id !== res.data.id
                );
                setSimilarProducts(filteredProducts);
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const formatCurrency = (value) => {
        return `${new Intl.NumberFormat('vi-VN').format(value)} VND`;
    };

    const handleAddToCart = async () => {
        const user = JSON.parse(localStorage.getItem("token"));
        // Kiểm tra xem user đã đăng nhập chưa
        if (!user || !user.id) {
            Modal.confirm({
                title: 'Bạn chưa đăng nhập',
                content: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng. Bạn có muốn chuyển đến trang đăng nhập không?',
                okText: 'Có',
                cancelText: 'Không',
                onOk() {
                    navigate('/login');
                },
            });
            return;
        }

        try {
            console.log("Gửi request thêm sản phẩm vào giỏ hàng..."); // Debugging

            await createCartItems(user.id, product.id, quantity);  // Thực hiện thêm sản phẩm vào giỏ hàng

            console.log("Sản phẩm đã được thêm vào giỏ hàng!"); // Debugging

            api.success({
                message: "Thành công",
                description: "Đã thêm vào giỏ hàng!",
            });
            window.dispatchEvent(new Event("cartItemUpdated")); // Cập nhật lại giỏ hàng
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error); // Debugging lỗi

            api.error({
                message: "Lỗi",
                description: "Thêm vào giỏ hàng thất bại!",
            });
        }
    };


    const handleBuyNow = () => {
        api.info({
            message: 'Thông báo',
            description: 'Chức năng "Mua ngay" chưa được triển khai.',
        });
    };

    if (loading) return <div className="text-center mt-10">Đang tải sản phẩm...</div>;
    if (!product) return <div className="text-center mt-10 text-red-500">Không tìm thấy sản phẩm.</div>;

    return (
        <div className="max-w-7xl mx-auto mt-12 px-6">
            {contextHolder} {/* Thêm contextHolder vào đây */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white shadow-xl rounded-lg">
                <div className="flex justify-center">
                    <img
                        src={`https://localhost:7229/${product.imageUrl}`}
                        alt={product.name}
                        className="max-w-full rounded-xl shadow-xl hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <h1 className="text-3xl font-semibold">{product.name}</h1>
                    <p className="text-2xl text-red-600 font-semibold">{formatCurrency(product.price)}</p>
                    <p><b>Danh mục:</b> {product.categoryName || 'Chưa rõ'}</p>
                    <p><b>Mô tả:</b> {product.description || 'Không có mô tả.'}</p>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="font-medium">Số lượng:</span>
                        <button
                            onClick={decreaseQuantity}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >-</button>
                        <span className="w-8 text-center">{quantity}</span>
                        <button
                            onClick={increaseQuantity}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >+</button>
                    </div>

                    <div className="flex justify-end gap-4 mt-auto">
                        <Button onClick={handleAddToCart} type="primary" className="bg-blue-600 hover:bg-blue-700">
                            Thêm vào giỏ hàng
                        </Button>

                        <Button onClick={handleBuyNow} type="primary" danger className="bg-red-600 hover:bg-red-700">
                            Mua ngay
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6">Sản phẩm tương tự</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {similarProducts.map((item) => (
                        <NavLink to={`/client/product/${item.id}`} key={item.id} className="product__item">
                            <img
                                src={`https://localhost:7229/${item.imageUrl}`}
                                alt={item.name}
                                className="product__item-img"
                            />
                            <span className="product__item-title">{item.name}</span>
                            <span className="product__item-price">{formatCurrency(item.price)}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
