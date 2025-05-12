import { Button, Form, Input, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { createUser, getRoles } from '../../../services/api.services';

function UserForm(props) {
    const { loadUser, api } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await getRoles();
                setRoles(res.data);
            } catch (error) {
                console.error("Lỗi khi load roles:", error);
            }
        };
        fetchRoles();
    }, []);
    const handleClick = async () => {
        try {
            const values = await form.validateFields();
            const res = await createUser(values.fullName, values.email, values.passwordhash, values.phoneNumber, values.address, values.roleId);
            if (res.data) {
                api["success"]({
                    message: 'Create user',
                    description: 'Thêm mới user thành công',
                });
                handleCloseModal();
                await loadUser();
            } else {
                api["error"]({
                    message: "Error create user",
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
                <h3 className='text-2xl font-bold'>Danh sách người dùng</h3>
                <Button onClick={() => setIsModalOpen(true)} type='primary'>Tạo mới</Button>
            </div>

            <Modal
                title="Create Users"
                open={isModalOpen}
                onOk={handleClick}
                okText="Thêm"
                cancelText="Hủy bỏ"
                onCancel={handleCloseModal}
                maskClosable={false}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="passwordhash"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu!' },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái hoa, chữ cái thường và chữ số!'
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="Role" name="roleId" rules={[{ required: true, message: 'Vui lòng chọn quyền!' }]}>
                        <Select placeholder="Chọn quyền">
                            {roles.map(role => (
                                <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default UserForm;
