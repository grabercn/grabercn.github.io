import React, { useState } from 'react';
import Home from './Home'; // Import the Home component
import { Form, Input, Button, Layout, Typography, message } from 'antd';
import { setCookie } from './helpers/cookieHelper'; // Helper function to set cookies

const { Title } = Typography;

const Setup = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isSetupComplete, setIsSetupComplete] = useState(false); // State to manage setup completion

    const onFinish = (values) => {
        setLoading(true);

        // Store user data in cookies
        setCookie('userName', values.userName, 7); // Store for 7 days
        setCookie('language', values.language, 7);  // Store for 7 days

        // Notify the user that the setup is complete
        message.success('Account setup complete!');
        setLoading(false);

        // Mark the setup as complete
        setIsSetupComplete(true); // Set to true after the setup is complete
    };

    // Conditionally render either the setup form or the Home component
    if (isSetupComplete) {
        return <Home />; // If setup is complete, render Home component
    }

    return (
        <Layout style={{ padding: '50px' }}>
            <Title level={2}>Setup Your Account</Title>
            <Form
                form={form}
                name="setup-form"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Full Name"
                    name="userName"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                    label="Language Preference"
                    name="language"
                    rules={[{ required: true, message: 'Please select your language!' }]}
                >
                    <Input placeholder="Enter preferred language" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default Setup;
