import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { fetchAllUser } from '../../../services/api.services';
import { getAllProducts } from '../../../services/products.services';
import { updateCartItems } from '../../../services/cartItem.services';
function UpdateCartItem(props) {
    const { isModalUpdate, setIsModalUpdate, dataUpdate, loadCartItem, api } = props;
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
    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                id: dataUpdate.id,
                userId: dataUpdate.userId,
                productId: dataUpdate.productId,
                quantity: dataUpdate.quantity
            });
        }
    }, [dataUpdate, form]);

    const handleUpdateClick = async () => {
        try {
            const values = await form.validateFields();
            const res = await updateCartItems(values.id, values.userId, values.productId, values.quantity);
            // console.log(res)
            if (res.data) {
                api["success"]({
                    message: 'Cập nhật giỏ hàng',
                    description: 'Chỉnh sửa giỏ hàng thành công',
                });
                handleClose();
                await loadCartItem();
            } else {
                api["error"]({
                    message: "Error update cart item",
                    description: JSON.stringify(res.message)
                });
            }
        } catch (error) {
            console.error("Validation error:", error);
        }
    };

    const handleClose = () => {
        setIsModalUpdate(false);
        form.resetFields();
    };

    return (
        <Modal
            title="Cập nhật giỏ hàng"
            open={isModalUpdate}
            onOk={handleUpdateClick}
            okText="Lưu"
            cancelText="Hủy bỏ"
            onCancel={handleClose}
            maskClosable={false}
        >
            <Form form={form} layout="vertical">
                <Form.Item label="ID" name="id">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Người dùng" name="userId" rules={[{ required: true, message: 'Vui lòng chọn quyền!' }]}>
                    <Select placeholder="Chọn người dùng">
                        {users.map(user => (
                            <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Sản phẩm" name="productId" rules={[{ required: true, message: 'Vui lòng chọn quyền!' }]}>
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
    );
}

export default UpdateCartItem