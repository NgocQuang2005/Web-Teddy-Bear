import { Button, Form, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'
import { createRole } from '../../../services/role.services';
import TextArea from 'antd/es/input/TextArea';

function RoleForm(props) {
    const { loadRole, api } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const handleClick = async () => {
        try {
            const values = await form.validateFields();
            const res = await createRole(values.name, values.description);
            if (res.data) {
                api["success"]({
                    message: 'Create role',
                    description: 'Thêm mới role thành công',
                });
                handleCloseModal();
                await loadRole();
            } else {
                api["error"]({
                    message: "Error create role",
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
                <h3 className='text-2xl font-bold'>Danh sách vai trò</h3>
                <Button onClick={() => setIsModalOpen(true)} type='primary'>Tạo mới</Button>
            </div>

            <Modal
                title="Create Role"
                open={isModalOpen}
                onOk={handleClick}
                okText="Thêm"
                cancelText="Hủy bỏ"
                onCancel={handleCloseModal}
                maskClosable={false}
            >
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
            </Modal>
        </>
    );
}

export default RoleForm;
