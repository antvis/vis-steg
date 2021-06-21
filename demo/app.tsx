import "./index.less";
import { Layout, Menu } from "antd";
import { useState } from "react";
import EncoderPanel from "./Encoder";
import DecoderPanel from "./Decoder";
import { StegSiderInfo } from "./ consts/stegSiderInfo";
import { STEG_SIDER_INFOS } from "./ consts/stegSiderInfo";
import PipelinePanel from "./Pipeline";

const { Content, Sider } = Layout;

export default function App() {
  const [stegScene, setStegScene] = useState<StegSiderInfo>(STEG_SIDER_INFOS[0]);
  const [siderCollapsed, setSiderCollapsed] = useState<boolean>(false);

  const StegSider = ({ curStegInfo }: { curStegInfo: StegSiderInfo }) => {
    return (
      <div>
        <div className={"tmpLogo"} />
        <Menu theme="light" defaultSelectedKeys={[curStegInfo.type]} mode="inline">
          {STEG_SIDER_INFOS.map((scene, idx) => (
            <Menu.Item
              key={scene.type}
              icon={scene.icon}
              onClick={() => {
                setStegScene(scene);
              }}
            >
              {scene.type}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    );
  };

  let stegContent = <></>;
  switch (stegScene.type) {
    case "Pipeline":
      stegContent = <PipelinePanel width="400px" />;
      break;
    case "Encoder":
      stegContent = <EncoderPanel width="500px" />;
      break;
    case "Decoder":
      stegContent = <DecoderPanel width="500px" />;
    default:
      break;
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
        <StegSider curStegInfo={stegScene} />
      </Sider>

      <Layout className={"layout"}>
        <Content> {stegContent} </Content>
      </Layout>
    </Layout>
  );
}
