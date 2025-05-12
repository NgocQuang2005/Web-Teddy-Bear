import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import { getProductById, updateProducts, uploadProductImage } from '../../../services/products.services';
import { getAllCategories } from '../../../services/category.services';

function UpdateProducts(props) {
    const { isModalUpdate, setIsModalUpdate, dataUpdate, loadProducts, api } = props;
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(""); // Lưu URL tạm thời của ảnh
    const [file, setFile] = useState(null); // Lưu file để upload sau khi submit
    const [categories, setCategories] = useState([]); // Danh sách các hãng gấu

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories();
                setCategories(res.data);
            } catch (error) {
                console.error("Lỗi khi load categories:", error);
            }
        };

        const fetchProduct = async () => {
            if (dataUpdate) {
                try {
                    const res = await getProductById(dataUpdate.id);  // Lấy thông tin sản phẩm từ backend
                    const product = res.data;

                    form.setFieldsValue({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        quantityInStock: product.quantityInStock,
                        categoryId: product.categoryId, // Set giá trị categoryId hiện tại
                    });

                    // Kiểm tra xem có imageUrl không, nếu có thì hiển thị ảnh
                    if (product.imageUrl) {
                        setImageUrl(`https://localhost:7229/${product.imageUrl}`);  // Thêm đường dẫn đầy đủ
                    } else {
                        setImageUrl("");  // Nếu không có ảnh, reset
                    }
                } catch (error) {
                    console.error("Lỗi khi load sản phẩm:", error);
                }
            }
        };

        fetchCategories();
        fetchProduct();  // Gọi API để lấy thông tin sản phẩm khi mở modal
    }, [dataUpdate, form]);
    const handleUpdateClick = async () => {
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

            const res = await updateProducts(
                values.id,
                values.name,
                values.description,
                values.price,
                values.quantityInStock,
                uploadedImageUrl,
                values.categoryId
            );

            if (res.data) {
                api["success"]({
                    message: 'Cập nhật sản phẩm',
                    description: 'Chỉnh sửa sản phẩm thành công',
                });
                handleClose();
                await loadProducts();
            } else {
                api["error"]({
                    message: "Lỗi khi cập nhật sản phẩm",
                    description: JSON.stringify(res.message),
                });
            }
        } catch (error) {
            console.error("Validation error:", error);
        }
    };

    const handleClose = () => {
        setIsModalUpdate(false);
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
        <Modal
            title="Cập nhật sản phẩm"
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

                <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Miêu tả" name="description" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
                    <TextArea />
                </Form.Item>

                <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
                    <Input type="number" />
                </Form.Item>

                <Form.Item label="Số lượng" name="quantityInStock" rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}>
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
                                src={imageUrl} // Dùng URL đầy đủ để hiển thị ảnh
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
                            <Select.Option key={category.id} value={category.id}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default UpdateProducts;
