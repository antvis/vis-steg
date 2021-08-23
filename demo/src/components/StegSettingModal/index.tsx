/* eslint-disable react/prop-types */
import React, { CSSProperties, FC, ReactNode, useState } from 'react';
import { Modal, InputNumber, Radio, Form } from 'antd';
import { cloneDeep } from 'lodash';
import { ENCODE_SETTING_INFOS, DECODE_SETTING_INFOS, StegConfig } from '../../consts/stegSettingInfo';
import { LSBEncodeOptions, LSBDecodeOptions } from '../../../../src';

const StegSettingModalWrapper = (props: {
  title: string;
  visible: boolean;
  onOk: any;
  onCancel: any;
  children: ReactNode;
  style?: CSSProperties;
}) => {
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      okText={'OK'}
      onOk={props.onOk}
      cancelText={'Cancel'}
      onCancel={props.onCancel}
      bodyStyle={{
        paddingTop: 0,
        paddingBottom: '15px',
        ...props.style,
      }}
      centered
    // destroyOnClose
    >
      {props.children}
    </Modal>
  );
};

type StegSettingType = 'EncodeSetting' | 'DecodeSetting';
const StegEncodeSettingModal = ({
  visible = false,
  onOk = (opts: LSBEncodeOptions | LSBDecodeOptions): void => { },
  onCancel = () => { },
}) => {
  const defaultLSBEncOpts = { encMode: 'binary', QRSize: 200, mxMsgLen: 130 };
  const [curLSBEncOpts, setCurLSBEncOpts] = useState<LSBEncodeOptions>(defaultLSBEncOpts);

  const updateStegConfigItem = (key: string, value: string | number) => {
    if (Object.keys(curLSBEncOpts).includes(key)) {
      if (key === 'encMode' && value === 'Binary') {
        setCurLSBEncOpts(defaultLSBEncOpts);
      }
      else {
        const newStegConfig = cloneDeep(curLSBEncOpts);
        newStegConfig[key] = value;
        setCurLSBEncOpts(newStegConfig);
      }
    }
  };

  const RadioFormItem = (item: StegConfig) => {
    return (
      <Radio.Group
        defaultValue={item.options[0]}
        onChange={(event) => updateStegConfigItem(item.id, event.target.value)}
      >
        {item.options.map((option) => (
          <Radio
            key={option}
            value={option}
          >
            <span> {option} </span>
          </Radio>
        ))}
      </Radio.Group>
    );
  };

  // not sure whether need to reset the forms when close the modal
  // useEffect(() => {
  //   if (visible === false) {
  //     setCurLSBEncOpts(defaultLSBEncOpts);
  //   }
  // }, [visible]);

  const QRSettingFormItem = (item: StegConfig) => {
    return (
      <div style={{ marginLeft: '0px', width: '320px' }}>
        {RadioFormItem(item)}

        {(item.showChild === curLSBEncOpts.encMode && item.child) ? (
          item.child.map((cItm) =>
          (<div style={{ width: '80%', marginTop: '10px' }} key={cItm.id}>
            <label>
              {cItm.label}
            </label>
            <InputNumber
              style={{
                width: '100%',
                marginTop: '5px'
              }}
              autoFocus={false}
              size="large"
              defaultValue={cItm.defaultVal}
              min={cItm.minVal}
              max={cItm.maxVal}
              step={cItm.step}
              onChange={(value) => updateStegConfigItem(cItm.id, value)}
            />
          </div>)
          )) : ('')
        }
      </div>
    );
  };

  const renderFormItems = () => {
    const formItems = [];
    ENCODE_SETTING_INFOS.config.map((item, idx) => {
      if (idx === 0) {
        formItems.push(
          {
            label: item.label,
            children: (
              <div key={item.id}>
                {RadioFormItem(item)}
              </div>
            ),
          }
        );
      }
      else {
        formItems.push(
          {
            label: item.label,
            children: (
              QRSettingFormItem(item)
            ),
          }
        );
      }
    });

    return (
      <Form name="stegEncSettingForm">
        {
          formItems.map((item, index) => {
            const { children, ...rest } = item;
            return (
              <Form.Item key={index} {...rest}
                style={{ flexDirection: 'row', margin: '10px' }}
              >
                {children}
              </Form.Item>
            );
          })
        }
      </Form>
    );
  };

  return (
    <StegSettingModalWrapper
      title={ENCODE_SETTING_INFOS.title}
      visible={visible}
      onOk={() => {
        onOk(curLSBEncOpts);
      }}
      onCancel={() => {
        onCancel();
      }}
    >

      <div>
        {renderFormItems()}
      </div>

    </StegSettingModalWrapper>
  );
};

const StegDecodeSettingModal = ({
  visible = false,
  onOk = (opts: LSBEncodeOptions | LSBDecodeOptions): void => { },
  onCancel = () => { },
}) => {

  const defaultLSBDecOpts = { decMode: 'binary' };
  const [curLSBDecOpts, setCurLSBDecOpts] = useState<LSBDecodeOptions>(defaultLSBDecOpts);

  const updateStegConfigItem = (key: string, value: string | number) => {
    if (Object.keys(curLSBDecOpts).includes(key)) {
      const newStegConfig = cloneDeep(curLSBDecOpts);
      newStegConfig[key] = value;
      setCurLSBDecOpts(newStegConfig);
    }
  };

  const RadioFormItem = (item: StegConfig) => {
    return (
      <Radio.Group
        defaultValue={item.options[0]}
        onChange={(event) => updateStegConfigItem(item.id, event.target.value)}
      >
        {item.options.map((option) => (
          <Radio
            key={option}
            value={option}
          >
            <span> {option} </span>
          </Radio>
        ))}
      </Radio.Group>
    );
  };

  const renderFormItems = () => {
    const formItems = [];
    DECODE_SETTING_INFOS.config.map((item, idx) => {
      formItems.push(
        {
          label: item.label,
          children: (
            <div key={item.id}>
              {RadioFormItem(item)}
            </div>
          ),
        }
      );
    });

    return (
      <Form name="stegDecSettingForm">
        {
          formItems.map((item, index) => {
            const { children, ...rest } = item;
            return (
              <Form.Item key={index} {...rest}
                style={{ flexDirection: 'row', margin: '10px' }}
              >
                {children}
              </Form.Item>
            );
          })
        }
      </Form>
    );
  };

  return (
    <StegSettingModalWrapper
      title={DECODE_SETTING_INFOS.title}
      visible={visible}
      onOk={() => {
        onOk(curLSBDecOpts);
      }}
      onCancel={() => {
        onCancel();
      }}
    >
      <div>
        {renderFormItems()}
      </div>
    </StegSettingModalWrapper>
  );
};

interface StegSettingModalProps {
  type: StegSettingType;
  visible?: boolean;
  onOk?: (opts: LSBEncodeOptions | LSBDecodeOptions) => void;
  onCancel?: () => void;
}

const StegSettingModal: FC<StegSettingModalProps> = (props) => {
  const { type } = props;

  switch (type) {
    case 'EncodeSetting':
      return <StegEncodeSettingModal {...props} />;
    case 'DecodeSetting':
      return <StegDecodeSettingModal {...props} />;
    default:
      return <></>;
  }
};

export default StegSettingModal;
