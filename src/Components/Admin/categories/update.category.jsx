import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { updateCategories } from '../../../services/category.services';

function UpdateCategoryModal(props) {
    const { isModalUpdate, setIsModalUpdate, dataUpdate, loadCategories, api } = props;
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

            const res = await updateCategories(values.id, values.name, values.description);
            if (res.data) {
                api["success"]({
                    message: 'Update Category',
                    description: 'Chỉnh sửa Category thành công',
                });
                handleClose();
                await loadCategories();
            } else {
                api["error"]({
                    message: "Error update Category",
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
            title="Update Category"
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
                        rules={[{ required: true, message: 'Vui lòng nhập  tên hãng gấu bông!' }]}
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

export default UpdateCategoryModal;