import React, { useEffect, useState } from 'react';
import { Card, Button, Spin } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';
import EncoderCard from '../Encoder/EncoderCard';
import { decodeImg } from '../util';
import DecodeSecretCard from '../Decoder/DecodeSecretCard';
import EncodedImgCard from '../Encoder/EncodedImgCard';
import StegSettingModal from '../components/StegSettingModal';
import { LSBDecodeOptions } from '../../../src';
import './index.less';

const PipelinePanel = ({ width }: { width: string | number }) => {
  const [encodedImg, setEncodedImg] = useState<string>();
  const [decSecret, setDecSecret] = useState<string>('');
  const [stopUploadImg, setStopUploadImg] = useState<boolean>(false);
  const [showDecodeSetting, setShowDecodeSetting] = useState<boolean>(false);
  const defaultLSBDecOpts = { decMode: 'binary' };
  const [curLSBDecOpts, setCurLSBDecOpts] = useState<LSBDecodeOptions>(defaultLSBDecOpts);

  const handleDecodeBtn = () => {
    setStopUploadImg(true);
    decodeImg(encodedImg, curLSBDecOpts)
      .then((result) => {
        if (result) {
          setDecSecret(result);
        } else {
          throw new Error('Failed to decode the secret!');
        }
        setStopUploadImg(false);
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert('Failed to decode the secret!');
        setDecSecret('');
        setStopUploadImg(false);
      });
  };

  useEffect(() => {
    if (encodedImg === undefined) setDecSecret('');
  }, [encodedImg]);

  const handleDecodeSettingOk = (opts: LSBDecodeOptions) => {
    const newOpts = cloneDeep(opts);
    setCurLSBDecOpts(newOpts);
    setShowDecodeSetting(false);
  };

  const handleDecodeSettingCancel = () => {
    setShowDecodeSetting(false);
  };

  return (
    <div className={'pipeLinePanel'}>
      <div
        style={{
          width: `${width}`,
        }}
      >
        <EncoderCard setEncodedImg={setEncodedImg} />
      </div>

      <div
        style={{
          width: `${width}`,
        }}
      >
        <Card
          hoverable
          className={'uploadImgPanel'}
          title="Encoded Image"
          extra={
            <div>
              <Button
                style={{
                  float: 'right',
                  marginRight: '0px',
                  marginBottom: '0px',
                }}
                type="link"
                icon={<SettingOutlined />}
                size={'middle'}
                onClick={() => {
                  setShowDecodeSetting(true);
                }}
              />
              <StegSettingModal
                type="DecodeSetting"
                visible={showDecodeSetting}
                onOk={handleDecodeSettingOk}
                onCancel={handleDecodeSettingCancel}
              ></StegSettingModal>
            </div>
          }
        >
          <EncodedImgCard encodedImg={encodedImg} />

          <Spin spinning={stopUploadImg}>
            <Button
              key={'Decode'}
              size="large"
              type="primary"
              style={{
                marginTop: '15px',
              }}
              block
              onClick={() => handleDecodeBtn()}
            >
              Decode
            </Button>
          </Spin>
        </Card>

        <DecodeSecretCard decSecret={decSecret} />
      </div>
    </div>
  );
};

export default PipelinePanel;
