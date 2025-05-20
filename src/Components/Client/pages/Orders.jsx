import React, { useEffect, useState } from 'react';
import { Table, Tag, Image } from 'antd';
import { getAllCombinedOrders } from '../../../services/order.services';
import { getAllProducts } from '../../../services/products.services';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resOrders = await getAllCombinedOrders();
            const resProducts = await getAllProducts();
            setOrders(resOrders.data);
            setProducts(resProducts.data);
        };
        fetchData();
    }, []);

    const getProductById = (id) => products.find(p => p.id === id);

    const dataSource = orders.map(order => ({
        key: order.id,
        orderId: `#${order.id}`,
        status: order.status,
        products: order.orderDetails.map(item => {
            const product = getProductById(item.productId);
            return {
                name: product?.name,
                quantity: item.quantity,
                price: product?.price,
                imageUrl: product?.imageUrl
            };
        })
    }));

    const columns = [
        {
            title: 'Mã đơn',
            dataIndex: 'orderId',
            key: 'orderId',
            className: 'font-semibold',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Đã nhận được hàng' ? 'green' : 'orange'}>
                    {status}
                </Tag>
            )
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'products',
            key: 'products',
            render: (products) => (
                <div className="space-y-2">
                    {products.map((product, index) => (
                        <div key={index} className="flex items-center gap-3 border-b pb-2 last:border-0">
                            <Image
                                width={50}
                                src={`https://localhost:7229/${product.imageUrl}`}
                                alt={product.name}
                                className="rounded object-cover border"
                                preview={false}
                            />
                            <div>
                                <p className="text-sm font-medium">{product.name}</p>
                                <p className="text-xs text-gray-500">Số lượng: {product.quantity}</p>
                                <p className="text-xs text-gray-500">Giá: {new Intl.NumberFormat('vi-VN').format(product.price)} VND</p>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-8">📋 Danh sách đơn hàng</h1>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 5 }}
                bordered
                className="shadow-md"
            />
        </div>
    );
};

export default Orders;
