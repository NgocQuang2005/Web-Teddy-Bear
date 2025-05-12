import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { Link } from 'react-router-dom';
import { registerClient } from '../../../services/api.services';

function Register() {
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    const handleClick = async values => {
        const res = await registerClient(values.fullname, values.email, values.password, values.phonenumber, values.address);
        if (res.data) {
            api["success"]({
                message: 'Create user',
                description: 'Tạo tài khoản thành công',
            });
            form.resetFields();
        } else {
            api["error"]({
                message: "Error create user",
                description: JSON.stringify(res.message)
            });
        }
    };



    return (

        <>
            {contextHolder}
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Flowbite
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <Form
                                form={form}
                                name="register"
                                layout="vertical"
                                onFinish={handleClick}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Full Name"
                                    name="fullname"
                                    rules={[{ required: true, message: 'Please input your full name!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Please input your email!' },
                                        { type: 'email', message: 'The input is not valid E-mail!' },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Phone"
                                    name="phonenumber"
                                    rules={[{ required: true, message: 'Please input your phone!' },
                                    {
                                        validator: (_, value) =>
                                            value && /^[0-9]{9,11}$/.test(value)
                                                ? Promise.resolve()
                                                : Promise.reject('Phone number must be 9-11 digits!'),
                                    },]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Address"
                                    name="address"
                                    rules={[{ required: true, message: 'Please input your address!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' },
                                    {
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                        message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái hoa, chữ cái thường và chữ số!'
                                    }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    label="Confirm Password"
                                    name="confirm"
                                    dependencies={['password']}
                                    rules={[
                                        { required: true, message: 'Please confirm your password!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Passwords do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item className="mb-0">
                                    <Button type="primary" htmlType="submit" className="w-full">
                                        Register
                                    </Button>
                                </Form.Item>
                                <Link to={"/"}>You already have an account.</Link>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;
