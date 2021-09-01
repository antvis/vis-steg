import React, { useState } from 'react';
import { Card, Button, Spin } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';
import StegSettingModal from '../components/StegSettingModal';
import { LSBDecodeOptions } from '../../../src';
import UploadImgModal from '../components/UploadImgModal';
import { decodeImg } from '../util';
import './index.less';

const DecoderCard = ({ setDecSecret }: { setDecSecret: (secret: string) => void }) => {
  const [stopUploadImg, setStopUploadImg] = useState<boolean>(false);
  const [reloadUpImgPanel, setReloadUpImgPanel] = useState<boolean>(false);
  const [upImg, setUpImg] = useState<string>();
  const [showDecodeSetting, setShowDecodeSetting] = useState<boolean>(false);
  const defaultLSBDecOpts = { decMode: 'binary' };
  const [curLSBDecOpts, setCurLSBDecOpts] = useState<LSBDecodeOptions>(defaultLSBDecOpts);

  const handleDecodeBtn = () => {
    setStopUploadImg(true);
    decodeImg(upImg, curLSBDecOpts)
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
        // Maybe keep the failed decoding try is better
        // setReloadUpImgPanel(!reloadUpImgPanel);
        setDecSecret('');
        setStopUploadImg(false);
      });
  };

  const handleDecodeSettingOk = (opts: LSBDecodeOptions) => {
    const newOpts = cloneDeep(opts);
    setCurLSBDecOpts(newOpts);
    setShowDecodeSetting(false);
  };

  const handleDecodeSettingCancel = () => {
    setShowDecodeSetting(false);
  };

  return (
    <Card
      hoverable
      className={'uploadImgPanel'}
      title="Decoder"
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
      <Spin spinning={stopUploadImg}>
        <UploadImgModal key="Decode" reload={reloadUpImgPanel} setUploadImg={setUpImg}></UploadImgModal>

        <div className={'buttonBox'}>
          <Button
            key={'Cancel'}
            size="large"
            style={{
              width: '45%',
            }}
            onClick={() => {
              setReloadUpImgPanel(!reloadUpImgPanel);
              setDecSecret('');
            }}
          >
            Cancel
          </Button>

          <Button
            key={'Decode'}
            size="large"
            type="primary"
            style={{
              width: '45%',
            }}
            onClick={() => handleDecodeBtn()}
          >
            Decode
          </Button>
        </div>
      </Spin>
    </Card>
  );
};

export default DecoderCard;
