import React from "react";
import { GatewayOutlined, AppstoreOutlined, CodeOutlined } from "@ant-design/icons";

export type StegSiderType = "Pipeline" | "Encoder" | "Decoder";

export interface StegSiderInfo {
  name: string;
  type: StegSiderType;
  icon: React.ReactNode;
}

export const STEG_SIDER_INFOS: StegSiderInfo[] = [
  {
    name: "Pipeline",
    type: "Pipeline",
    icon: <GatewayOutlined />,
  },
  {
    name: "Encoder",
    type: "Encoder",
    icon: <CodeOutlined />,
  },
  {
    name: "Decoder",
    type: "Decoder",
    icon: <AppstoreOutlined />,
  },
];
