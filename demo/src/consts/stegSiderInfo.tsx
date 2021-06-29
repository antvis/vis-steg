import React from 'react';
import { GatewayOutlined, AppstoreOutlined, CodeOutlined, BarChartOutlined } from '@ant-design/icons';

export type StegSiderType = 'Pipeline' | 'Encoder' | 'Decoder' | 'Img2Vis' | 'Vis2Img';

export interface StegSiderInfo {
  name: string;
  type: StegSiderType;
  icon: React.ReactNode;
}

export const STEG_SIDER_INFOS: StegSiderInfo[] = [
  {
    name: 'Pipeline',
    type: 'Pipeline',
    icon: <GatewayOutlined />,
  },
  {
    name: 'Encoder',
    type: 'Encoder',
    icon: <CodeOutlined />,
  },
  {
    name: 'Decoder',
    type: 'Decoder',
    icon: <AppstoreOutlined />,
  },
  {
    name: 'Vis2Img',
    type: 'Vis2Img',
    icon: <BarChartOutlined />,
  },
  {
    name: 'Img2Vis',
    type: 'Img2Vis',
    icon: <BarChartOutlined />,
  },
];
