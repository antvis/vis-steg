export interface StegSettingInfo {
  type: string;
  title: string;
  config: StegConfig[];
}

interface ConfigItem {
  id: string;
  label: string;
  child?: StegConfig[];
  showChild?: string;
}

type NumberConfig = ConfigItem & {
  type: 'number';
  defaultVal: number;
  minVal: number;
  maxVal: number;
  step: number;
};

type RadioConfig = ConfigItem & {
  type: 'radio';
  options: string[];
};

export type StegConfig = NumberConfig | RadioConfig;

export function isNumberConfig(config: StegConfig): config is NumberConfig {
  return config.type === 'number';
}

export function isRadioConfig(config: StegConfig): config is RadioConfig {
  return config.type === 'radio';
}

const QRcodeSize: NumberConfig = {
  type: 'number',
  id: 'QRSize',
  label: 'Size of each QRcode',
  defaultVal: 200,
  minVal: 200,
  maxVal: 400,
  step: 100
};

const eachMsgLen: NumberConfig = {
  type: 'number',
  id: 'mxMsgLen',
  label: 'Length of messages in a QRcode',
  defaultVal: 130,
  minVal: 50,
  maxVal: 400,
  step: 30
};

const stegAlgorithm: RadioConfig = {
  type: 'radio',
  id: 'stegAlgorithm',
  label: 'Steg Algorithm',
  options: ['LSB'],
};

const encodeMode: RadioConfig = {
  type: 'radio',
  id: 'encMode',
  label: 'Encode Mode',
  options: ['Binary', 'QRcode'],
  child: [QRcodeSize, eachMsgLen],
  showChild: 'QRcode'
};

const decodeMode: RadioConfig = {
  type: 'radio',
  id: 'decMode',
  label: 'Decode Mode',
  options: ['Binary', 'QRcode'],
};

export const ENCODE_SETTING_INFOS: StegSettingInfo =
{
  type: 'EncodeSetting',
  title: 'Encode Setting',
  config: [stegAlgorithm, encodeMode],
};

export const DECODE_SETTING_INFOS: StegSettingInfo =
{
  type: 'DecodeSetting',
  title: 'Decode Setting',
  config: [stegAlgorithm, decodeMode],
};
