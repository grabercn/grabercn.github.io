import React, { useState } from "react";
import { Button, Row, Col, Space } from "antd";
import { AppstoreOutlined, SearchOutlined, DesktopOutlined } from '@ant-design/icons';
import CookieClicker from "../../cookie/Cookie";
import PhotoHome from "../../photography/PhotoHome"
import MusicHome from "../../music/MusicHome"
import LinesBackground from "../../../animations/LinesBackground";

// App list with components and other metadata
const appList = [
  {
    name: "Photography",
    icon: <AppstoreOutlined />,
    component: <PhotoHome />,
  },
  {
    name: "Music",
    icon: <SearchOutlined />,
    component: <MusicHome />,
  },
  {
    name: "Cookie Clicker",
    icon: <DesktopOutlined />,
    component: <CookieClicker />,
  },
];

const AppButtonList = () => {
  const [selectedApp, setSelectedApp] = useState(null);

  const handleAppClick = (component) => {
    setSelectedApp(component);
  };

  return (
    <div style={{marginTop: '20px'}}>
      <LinesBackground />

      {/* Render Button List */}
      <Row gutter={[16, 16]} justify="center">
        {appList.map((app, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button
                type="primary"
                block
                icon={app.icon}
                onClick={() => handleAppClick(app.component)} // Set the component when clicked
                style={{
                  padding: "15px",
                  fontSize: "16px",
                  textAlign: "center",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                {app.name}
              </Button>
            </Space>
          </Col>
        ))}
      </Row>

      {/* Render the selected app component */}
      <div style={{ marginTop: "20px" }}>
        {selectedApp ? (
          selectedApp
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <h3>Select an app to view</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppButtonList;
