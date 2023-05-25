import React from "react";
import "./LoginScreen.scss";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../api/Auth";
import { User } from "../../api/User";

export default function LoginScreen() {
    const navigate = useNavigate();

    async function onFinish(values) {
        try {
            const res = await Auth.login(values.email, values.password);
            if (res.token) {
                const token = await Auth.refresh(res.token);
                localStorage.setItem("token", token.refreshedToken);
                const user = await User.getByEmail(values.email);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("isAdmin", user.role === 'admin');
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="form-container">
            <div className="form-window">
                <div className="form-logo">
                    Blackout
                    <br />
                    Schedule
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
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 20,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Link to={"/registration"}>
                            <Button
                                htmlType="submit"
                                className="form-second-btn"
                            >
                                Registration
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
