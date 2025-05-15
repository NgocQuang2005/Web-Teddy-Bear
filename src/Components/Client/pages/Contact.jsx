import React from 'react';
import { Form, Input, Button, message } from 'antd';

const { TextArea } = Input;

const Contact = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const user = JSON.parse(localStorage.getItem("token")); // 👈 lấy thông tin từ localStorage

        const contactData = {
            fullName: user?.fullName,
            email: user?.email,
            phone: user?.phone || "Chưa cập nhật",
            message: values.message,
        };

        console.log("Dữ liệu liên hệ gửi đi:", contactData);
        message.success("Cảm ơn bạn đã liên hệ!");
        form.resetFields();
    };

    const onFinishFailed = () => {
        message.error("Vui lòng nhập nội dung!");
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <h2 className="text-3xl font-semibold mb-6 text-center">Liên hệ với chúng tôi</h2>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Nội dung liên hệ"
                    name="message"
                    rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                >
                    <TextArea rows={5} placeholder="Bạn muốn chia sẻ điều gì?" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600">
                        Gửi liên hệ
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Contact;
