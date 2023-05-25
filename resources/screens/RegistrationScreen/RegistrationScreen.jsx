import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../api/Auth";

export default function LoginScreen() {
    const navigate = useNavigate();

    async function onFinish(values) {
        try {
            const res = await Auth.registration(values.name, values.email, values.password)
            if (res.token) {
                const token = await Auth.refresh(res.token)
                localStorage.setItem('token', token.refreshedToken)
                localStorage.setItem('user', JSON.stringify(res.user))
                localStorage.setItem("isAdmin", res.user.role === 'admin');
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="form-container">
            <div className="form-window">
                <div className="form-logo">
                    Blackout<br/>Schedule
                    <img className="form-img" src="/icons/favicon.svg"></img>
                </div>

                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: "email",
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 6,
                            span: 16,
                        }}
                    >
                       <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Link to={"/login"}>
                            <Button
                                htmlType="submit"
                                className="form-second-btn"
                            >
                                Login
                            </Button>
                        </Link>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );
}
