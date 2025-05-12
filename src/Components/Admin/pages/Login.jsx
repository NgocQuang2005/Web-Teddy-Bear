import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/image/logo.png'
import { loginAdmin } from '../../../services/api.services';

function Login() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values) => {
        const res = await loginAdmin(values.email, values.password)
        if (res.data) {
            // console.log(res.data.user)
            console.log(res.data.user)
            localStorage.setItem('token', JSON.stringify(res.data.user))
            localStorage.setItem('role', res.data.user.role)
            messageApi.open({
                type: 'success',
                content: 'Đăng nhập thành công',
            });

            navigate("/admin/home");
        } else {
            messageApi.open({
                type: 'error',
                content: JSON.stringify(res.message),
            });
        }
    };

    return (
        <>
            {contextHolder}
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2 object-cover" src={logo} alt="logo" />
                        Flowbite
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <Form
                                name="basic"
                                layout="vertical"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item name="remember" valuePropName="checked" className="mb-4">
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Form.Item className="mb-0">
                                    <Button type="primary" htmlType="submit" className="w-full">
                                        Sign In
                                    </Button>
                                </Form.Item>
                                <Link to={"/admin/register"}>Create account</Link>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
