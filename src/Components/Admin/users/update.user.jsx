import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { getRoles, updateUser } from '../../../services/api.services';

function UpdateUserModal(props) {
    const { isModalUpdate, setIsModalUpdate, dataUpdate, loadUser, api } = props;
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
    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                id: dataUpdate.id,
                fullName: dataUpdate.fullName,
                email: dataUpdate.email,
                passwordHash: "",
                phoneNumber: dataUpdate.phoneNumber,
                address: dataUpdate.address,
                roleId: dataUpdate.roleId,
            });
        }
    }, [dataUpdate, form]);

    const handleUpdateClick = async () => {
        try {
            const values = await form.validateFields();
            const passwordToSend = values.passwordHash?.trim() ? values.passwordHash : null;
            const res = await updateUser(values.id, values.fullName, values.email, passwordToSend, values.phoneNumber, values.address, values.roleId ?? null);
            // console.log(res)
            if (res.data) {
                api["success"]({
                    message: 'Update user',
                    description: 'Chỉnh sửa user thành công',
                });
                handleClose();
                await loadUser();
            } else {
                api["error"]({
                    message: "Error update user",
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
            title="Update Users"
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
                    name="passwordHash"
                    rules={[
                        {
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái hoa, chữ cái thường và chữ số!'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item label="Role" name="roleId" rules={[{ required: true, message: 'Vui lòng chọn quyền!' }]}>
                    <Select placeholder={
                        dataUpdate?.roleName
                            ? `Quyền hiện tại: ${dataUpdate.roleName}`
                            : "Chọn quyền"
                    }>
                        {roles.map(role => (
                            <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default UpdateUserModal;