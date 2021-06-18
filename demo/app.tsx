import "./index.less";
import { Layout, Menu } from "antd";
import { useState } from "react";
import EncoderPanel from "./Encoder";
import DecoderPanel from "./Decoder";
import { PieChartOutlined, DesktopOutlined } from "@ant-design/icons";

const { Content, Sider } = Layout;

export default function App() {
  const [isEncPanel, setIsEncPanel] = useState<boolean>(true);
  const [siderCollapsed, setSiderCollapsed] = useState<boolean>(false);

  const EncDecSider = (props: { isEncPanel: boolean }) => {
    const isSiderEncPanel = props.isEncPanel;
    let defaultSelectedKeys = "Encode";
    if (!isSiderEncPanel) defaultSelectedKeys = "Decode";
    return (
      <div>
        <div className={"tmpLogo"} />
        <Menu theme="light" defaultSelectedKeys={[defaultSelectedKeys]} mode="inline">
          <Menu.Item
            key="Encode"
            icon={<PieChartOutlined />}
            onClick={() => {
              setIsEncPanel(true);
            }}
          >
            Encode
          </Menu.Item>
          <Menu.Item
            key="Decode"
            icon={<DesktopOutlined />}
            onClick={() => {
              setIsEncPanel(false);
            }}
          >
            Decode
          </Menu.Item>
        </Menu>
      </div>
    );
  };

  if (isEncPanel) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={siderCollapsed} trigger={null} theme="light"></Sider>
        <Sider
          collapsible
          collapsed={siderCollapsed}
          theme="light"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
          onCollapse={(collapsed) => {
            setSiderCollapsed(collapsed);
          }}
        >
          <EncDecSider isEncPanel={isEncPanel} />
        </Sider>

        <Layout className={"layout"}>
          <Content>
            <EncoderPanel />
          </Content>
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={siderCollapsed} trigger={null} theme="light"></Sider>
      <Sider
        collapsible
        collapsed={siderCollapsed}
        theme="light"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
        onCollapse={(collapsed, type) => {
          setSiderCollapsed(collapsed);
        }}
      >
        <EncDecSider isEncPanel={isEncPanel} />
      </Sider>

      <Layout className={"layout"}>
        <Content>
          <DecoderPanel />
        </Content>
      </Layout>
    </Layout>
  );
}
