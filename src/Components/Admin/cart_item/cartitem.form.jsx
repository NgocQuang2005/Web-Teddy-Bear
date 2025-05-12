import { Button, Form, Input, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { fetchAllUser } from '../../../services/api.services';
import { getAllProducts } from '../../../services/products.services';
import { createCartItems } from '../../../services/cartItem.services';

function CartForm(props) {
    const { loadCartItem, api } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
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
                setProducts(res.data)

            } catch (error) {
                console.log("Lỗi khi load products:", error)
            }
        }
        fetchUser();
        fetchProduct();
    }, []);
    const handleClick = async () => {
        try {
            const values = await form.validateFields();
            const res = await createCartItems(values.userId, values.productId, values.quantity);
            if (res.data) {
                api["success"]({
                    message: 'Create cartItem',
                    description: 'Thêm mới cartItem thành công',
                });
                handleCloseModal();
                await loadCartItem();
            } else {
                api["error"]({
                    message: "Error create cartItem",
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
    };

    return (
        <>
            <div className='flex justify-between my-5'>
                <h3 className='text-2xl font-bold'>Danh sách giỏ hàng</h3>
                <Button onClick={() => setIsModalOpen(true)} type='primary'>Tạo mới</Button>
            </div>

            <Modal
                title="Thêm mơi giỏ hàng"
                open={isModalOpen}
                onOk={handleClick}
                okText="Thêm"
                cancelText="Hủy bỏ"
                onCancel={handleCloseModal}
                maskClosable={false}
            >
                <Form form={form} layout="vertical">

                    <Form.Item label="Người dùng" name="userId" rules={[{ required: true, message: 'Vui lòng chọn người dùng!' }]}>
                        <Select placeholder="Chọn quyền">
                            {users.map(user => (
                                <Select.Option key={user.id} value={user.id}>{user.fullName}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Sản phẩm" name="productId" rules={[{ required: true, message: 'Vui lòng chọn sản phẩm!' }]}>
                        <Select placeholder="Chọn quyền">
                            {products.map(product => (
                                <Select.Option key={product.id} value={product.id}>{product.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default CartForm