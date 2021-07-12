import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import EncoderPanel from './Encoder';
import DecoderPanel from './Decoder';
import Img2VisPanel from './Img2Vis';
import PipelinePanel from './Pipeline';
import Vis2ImgPanel from './Vis2Img';
import { StegSiderInfo, STEG_SIDER_INFOS } from './consts/stegSiderInfo';
import './index.less';

const { Content, Sider } = Layout;

export default function App() {
  const [stegScene, setStegScene] = useState<StegSiderInfo>(STEG_SIDER_INFOS[3]);
  const [siderCollapsed, setSiderCollapsed] = useState<boolean>(false);

  const StegSider = ({ curStegInfo }: { curStegInfo: StegSiderInfo }) => {
    return (
      <div>
        <div className={'tmpLogo'}><h1>vis-steg demos</h1></div>
        <Menu theme="light" defaultSelectedKeys={[curStegInfo.type]} mode="inline">
          {STEG_SIDER_INFOS.map((scene) => (
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
    case 'Pipeline':
      stegContent = <PipelinePanel width="400px" />;
      break;
    case 'Encoder':
      stegContent = <EncoderPanel width="500px" />;
      break;
    case 'Decoder':
      stegContent = <DecoderPanel width="500px" />;
      break;
    case 'Vis2Img':
      stegContent = <Vis2ImgPanel width="500px" />;
      break;
    case 'Img2Vis':
      stegContent = <Img2VisPanel width="400px" />;
      break;
    default:
      break;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={siderCollapsed} trigger={null} theme="light"></Sider>
      <Sider
        collapsible
        collapsed={siderCollapsed}
        theme="light"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
        onCollapse={(collapsed) => {
          setSiderCollapsed(collapsed);
        }}
      >
        <StegSider curStegInfo={stegScene} />
      </Sider>

      <Layout className={'layout'}>
        <Content> {stegContent} </Content>
      </Layout>
    </Layout>
  );
}
