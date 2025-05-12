import { Button, Form, InputNumber, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchAllUser } from '../../../services/api.services';
import { getAllProducts } from '../../../services/products.services';
import { createCombinedOrders } from '../../../services/order.services';

function OrderForm({ loadOrder, api }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orderDetails, setOrderDetails] = useState([{ productId: null, quantity: 1 }]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetchAllUser();
                setUsers(res.data);
            } catch (error) {
                console.error("Lỗi khi load users:", error);
            }
        };
        const fetchProduct = async () => {
            try {
                const res = await getAllProducts();
                setProducts(res.data);
            } catch (error) {
                console.log("Lỗi khi load products:", error);
            }
        };
        fetchUser();
        fetchProduct();
    }, []);

    const handleProductChange = (value, index) => {
        const updated = [...orderDetails];
        updated[index].productId = value;
        setOrderDetails(updated);
    };

    const handleQuantityChange = (value, index) => {
        const updated = [...orderDetails];
        updated[index].quantity = value;
        setOrderDetails(updated);
    };

    const addDetailRow = () => {
        setOrderDetails([...orderDetails, { productId: null, quantity: 1 }]);
    };

    const removeDetailRow = (index) => {
        const updated = [...orderDetails];
        updated.splice(index, 1);
        setOrderDetails(updated);
    };

    const handleCreateClick = async () => {
        try {
            const values = await form.validateFields();
            const res = await createCombinedOrders(values.userId, values.status, orderDetails);
            if (res.data) {
                api.success({
                    message: 'Tạo đơn hàng thành công',
                    description: 'Đơn hàng đã được tạo',
                });
                handleCloseModal();
                await loadOrder();
            } else {
                api.error({
                    message: 'Lỗi tạo đơn hàng',
                    description: JSON.stringify(res.message)
                });
            }
        } catch (error) {
            console.error("Validation error:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        form.resetFields();
        setOrderDetails([{ productId: null, quantity: 1 }]);
    };

    return (
        <>
            <div className="flex justify-between my-5">
                <h3 className="text-2xl font-bold">Danh sách đơn hàng</h3>
                <Button onClick={() => setIsModalOpen(true)} type="primary">Tạo mới</Button>
            </div>

            <Modal
                title="Tạo đơn hàng"
                open={isModalOpen}
                onOk={handleCreateClick}
                okText="Tạo"
                cancelText="Hủy bỏ"
                onCancel={handleCloseModal}
                maskClosable={false}
                width={800}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Người dùng"
                        name="userId"
                        rules={[{ required: true, message: 'Vui lòng chọn người dùng!' }]}
                    >
                        <Select placeholder="Chọn người dùng">
                            {users.map(user => (
                                <Select.Option key={user.id} value={user.id}>{user.fullName}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Trạng thái"
                        name="status"
                        rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                    >
                        <Select placeholder="Chọn trạng thái đơn hàng">
                            <Select.Option value="Pending">Chờ xử lý</Select.Option>
                            <Select.Option value="Confirmed">Đã xác nhận</Select.Option>
                            <Select.Option value="Shipped">Đã giao hàng</Select.Option>
                        </Select>
                    </Form.Item>

                    <div><strong>Chi tiết đơn hàng:</strong></div>
                    {orderDetails.map((item, index) => (
                        <div key={index} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                            <Select
                                placeholder="Chọn sản phẩm"
                                style={{ flex: 2 }}
                                value={item.productId}
                                onChange={(value) => handleProductChange(value, index)}
                            >
                                {products.map(product => (
                                    <Select.Option key={product.id} value={product.id}>{product.name}</Select.Option>
                                ))}
                            </Select>
                            <InputNumber
                                min={1}
                                value={item.quantity}
                                onChange={(value) => handleQuantityChange(value, index)}
                                style={{ width: 100 }}
                            />
                            <a onClick={() => removeDetailRow(index)} style={{ color: 'red' }}>Xóa</a>
                        </div>
                    ))}
                    <a onClick={addDetailRow}>+ Thêm sản phẩm</a>
                </Form>
            </Modal>
        </>
    );
}

export default OrderForm;
