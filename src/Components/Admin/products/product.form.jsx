import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import { createProducts, uploadProductImage } from '../../../services/products.services';
import { getAllCategories } from '../../../services/category.services';

function ProductForm({ loadProducts, api }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [imageUrl, setImageUrl] = useState(""); // Lưu URL tạm thời của ảnh
    const [file, setFile] = useState(null); // Lưu file để upload sau khi submit

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories();
                setCategories(res.data);
            } catch (error) {
                console.error("Lỗi khi load categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleClick = async () => {
        try {
            const values = await form.validateFields();

            // Nếu ảnh đã chọn là một file, upload ảnh lên server
            let uploadedImageUrl = imageUrl;
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const res = await uploadProductImage(formData);
                uploadedImageUrl = res.data.imageUrl;
            }

            const res = await createProducts(
                values.name,
                values.description,
                values.price,
                values.quantity,
                uploadedImageUrl,
                values.categoryId
            );

            if (res.data) {
                api.success({
                    message: 'Tạo sản phẩm',
                    description: 'Thêm sản phẩm thành công',
                });
                handleCloseModal();
                await loadProducts();
            } else {
                api.error({
                    message: 'Lỗi khi tạo sản phẩm',
                    description: JSON.stringify(res.message),
                });
            }
        } catch (error) {
            console.error("Validation error:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        form.resetFields();
        setImageUrl(""); // Reset ảnh
        setFile(null); // Reset file
    };

    const handleUpload = (selectedFile) => {
        // Tạo URL tạm thời cho ảnh chọn
        setImageUrl(URL.createObjectURL(selectedFile));
        setFile(selectedFile); // Lưu file để upload sau khi submit
        return false; // Ngăn không cho upload tự động
    };

    return (
        <>
            <div className='flex justify-between my-5'>
                <h3 className='text-2xl font-bold'>Danh sách các gấu bông</h3>
                <Button onClick={() => setIsModalOpen(true)} type='primary'>Tạo mới</Button>
            </div>

            <Modal
                title="Tạo sản phẩm"
                open={isModalOpen}
                onOk={handleClick}
                okText="Thêm"
                cancelText="Hủy bỏ"
                onCancel={handleCloseModal}
                maskClosable={false}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Miêu tả" name="description" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
                        <TextArea />
                    </Form.Item>
                    <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Số lượng" name="quantity" rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}>
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item label="Ảnh">
                        <Upload
                            showUploadList={false}
                            beforeUpload={handleUpload} // Xử lý ảnh khi chọn
                            listType="picture-card"
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl} // Dùng URL tạm thời để hiển thị preview ảnh
                                    alt="preview"
                                    style={{ width: '100%' }}
                                />
                            ) : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item label="Hãng Gấu" name="categoryId" rules={[{ required: true, message: 'Vui lòng chọn hãng!' }]}>
                        <Select placeholder="Chọn hãng">
                            {categories.map((category) => (
                                <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default ProductForm;
