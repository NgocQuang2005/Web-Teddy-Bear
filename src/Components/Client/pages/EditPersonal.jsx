import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { fetchAllUser, updateUser } from '../../../services/api.services';
import { useNavigate } from 'react-router-dom';

const EditPersonal = () => {
    const [form] = Form.useForm();
    const [userInfo, setUserInfo] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('token'));
                if (!storedUser?.id) {
                    api.error("Không tìm thấy thông tin người dùng!");
                    return;
                }

                const res = await fetchAllUser();
                const currentUser = res.data.find(u => u.id === storedUser.id);
                if (currentUser) {
                    setUserInfo(currentUser);
                    form.setFieldsValue({
                        fullName: currentUser.fullName,
                        email: currentUser.email,
                        phoneNumber: currentUser.phoneNumber,
                        address: currentUser.address,
                    });
                }

            } catch (err) {
                api.error("Lỗi khi tải thông tin người dùng!");
                console.error(err);
            }
        };

        fetchUser();
    }, [form]);

    const onFinish = async (values) => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('token'));
            if (!storedUser?.id) return;

            await updateUser(
                storedUser.id,
                values.fullName,
                values.email,
                "", // không đổi mật khẩu tại đây
                values.phoneNumber,
                values.address,
                userInfo.roleId
            );

            api.success({
                message: "Thành công",
                description: "Đã cập nhật thành công!",
            });
            setTimeout(() => {
                navigate("/client/home");
            }, 2000);
        } catch (err) {
            api.error({
                message: "Thất bại",
                description: "Đã cập nhật thất bại!",
            });
            console.error(err);
        }
    };

    return (
        <>
            {contextHolder}
            <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Chỉnh sửa thông tin cá nhân</h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email' },
                            { type: 'email', message: 'Email không hợp lệ' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                    >
                        <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default EditPersonal;
