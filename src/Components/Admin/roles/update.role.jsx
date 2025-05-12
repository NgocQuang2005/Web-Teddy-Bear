import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { updateRole } from '../../../services/role.services';
import TextArea from 'antd/es/input/TextArea';

function UpdateRoleModal(props) {
    const { isModalUpdate, setIsModalUpdate, dataUpdate, loadRole, api } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                id: dataUpdate.id,
                name: dataUpdate.name,
                description: dataUpdate.description,
            });
        }
    }, [dataUpdate, form]);

    const handleUpdateClick = async () => {
        try {
            const values = await form.validateFields();

            const res = await updateRole(values.id, values.name, values.description);
            if (res.data) {
                api["success"]({
                    message: 'Update Role',
                    description: 'Chỉnh sửa Role thành công',
                });
                handleClose();
                await loadRole();
            } else {
                api["error"]({
                    message: "Error update Role",
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
            title="Update Role"
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

                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                    >
                        <TextArea />
                    </Form.Item>

                </Form>

            </Form>
        </Modal>
    );
}

export default UpdateRoleModal;