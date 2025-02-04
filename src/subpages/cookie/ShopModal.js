import React from "react";
import { Modal, Row, Col, Card, Button, Tag, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const { Paragraph, Title } = Typography;

const ShopModal = ({ visible, onClose, cookies, upgrades, onBuyUpgrade }) => {
  return (
    <Modal
      title="Shop"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={900}
      bodyStyle={{
        padding: "30px",
        maxHeight: "70vh",
        overflowY: "auto",
      }}
      style={{
        top: "10vh", // Ensuring it doesn’t overlap with header
      }}
    >
      <Title level={4} style={{ textAlign: "center", marginBottom: "30px" }}>
        Available Upgrades
      </Title>
      <Row gutter={[20, 20]}>
        {upgrades.map((upgrade, index) => (
          <Col key={index} xs={24} sm={12} lg={8}>
            <Card
              title={<strong>{upgrade.name}</strong>}
              hoverable
              style={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s",
                paddingBottom: "20px", // Added padding to make the card less cramped
              }}
              bodyStyle={{
                padding: "20px",
                textAlign: "center",
                fontSize: "14px",
                minHeight: "200px", // Ensure enough space for content
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              {/* Upgrade Description */}
              <Paragraph>{upgrade.description}</Paragraph>
              
              {/* Tags */}
              <div style={{ marginBottom: "10px" }}>
                {upgrade.autoClickerEffect > 0 && (
                  <Tag color="geekblue" style={{ marginBottom: "5px", maxWidth: "100%" }}>
                    Auto Clicker: {upgrade.autoClickerEffect} per sec
                  </Tag>
                )}
                {upgrade.effect > 0 && (
                  <Tag color="magenta" style={{ marginBottom: "5px", maxWidth: "100%" }}>
                    Boosts Click Rate: {upgrade.effect} per click
                  </Tag>
                )}
                {upgrade.bought ? (
                  <Tag color="green" style={{ fontSize: "14px", marginBottom: "5px" }}>
                    Purchased
                  </Tag>
                ) : (
                  <Tag color="blue" style={{ fontSize: "14px", marginBottom: "5px" }}>
                    {`Cost: ${upgrade.cost} cookies`}
                  </Tag>
                )}
              </div>

              {/* Buy Button */}
              {!upgrade.bought && (
                <Button
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  onClick={() => onBuyUpgrade(index, upgrade)}
                  disabled={cookies < upgrade.cost}
                  block
                  style={{
                    backgroundColor: "#0073e6",
                    borderColor: "#005bb5",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  {`Buy for ${upgrade.cost} cookies`}
                </Button>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Modal>
  );
};

export default ShopModal;
