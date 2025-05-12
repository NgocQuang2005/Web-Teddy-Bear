import { Button, Form, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'
import TextArea from 'antd/es/input/TextArea';
import { createCategories } from '../../../services/category.services';

function CategoryForm(props) {
    const { loadCategories, api } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const handleClick = async () => {
        try {
            const values = await form.validateFields();
            const res = await createCategories(values.name, values.description);
            if (res.data) {
                api["success"]({
                    message: 'Create category',
                    description: 'Thêm mới category thành công',
                });
                handleCloseModal();
                await loadCategories();
            } else {
                api["error"]({
                    message: "Error create category",
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
                <h3 className='text-2xl font-bold'>Danh sách các hãng gấu bông</h3>
                <Button onClick={() => setIsModalOpen(true)} type='primary'>Tạo mới</Button>
            </div>

            <Modal
                title="Create Category"
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
                        rules={[{ required: true, message: 'Vui lòng nhập tên hãng gấu bông!' }]}
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

export default CategoryForm;
