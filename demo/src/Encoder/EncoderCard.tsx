import React, { useState } from 'react';
import { Card, Button, Spin, Input } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import StegSettingModal from '../components/StegSettingModal';
import { LSBEncodeOptions } from '../../../src';
import UploadImgModal from '../components/UploadImgModal';
import { encodeImg } from '../util';
import './index.less';

const { TextArea } = Input;

const EncoderCard = ({ setEncodedImg }: { setEncodedImg: (image: string | undefined) => void }) => {
  const [inputSecret, setInputSecret] = useState<string>('');
  const [stopUploadImg, setStopUploadImg] = useState<boolean>(false);
  const [reloadUpImgPanel, setReloadUpImgPanel] = useState<boolean>(false);
  const [upImg, setUpImg] = useState<string>();
  const [showEncodeSetting, setShowEncodeSetting] = useState<boolean>(false);
  const defaultLSBEncOpts = { encMode: 'binary', QRSize: 200, mxMsgLen: 130 };
  const [curLSBEncOpts, setCurLSBEncOpts] = useState<LSBEncodeOptions | undefined>(defaultLSBEncOpts);

  const handleEncodeBtn = () => {
    setStopUploadImg(true);
    if (inputSecret === undefined) setInputSecret('');
    encodeImg(upImg, inputSecret, curLSBEncOpts)
      .then((result) => {
        if (result) {
          setEncodedImg(result);
        } else {
          throw new Error('Failed to encode the secret!');
        }
        setStopUploadImg(false);
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert('Failed to encode the secret!');
        // Maybe keep the failed encoding try is better
        // setReloadUpImgPanel(!reloadUpImgPanel);
        // setInputSecret('');
        // setEncodedImg(undefined);
        setStopUploadImg(false);
      });
  };

  const handleEncodeSettingOk = (opts: LSBEncodeOptions) => {
    const newOpts = cloneDeep(opts);
    setCurLSBEncOpts(newOpts);
    setShowEncodeSetting(false);
  };

  const handleEncodeSettingCancel = () => {
    setShowEncodeSetting(false);
  };

  return (
    <Card
      hoverable
      className={'uploadImgPanel'}
      title="Encoder"
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
              setShowEncodeSetting(true);
            }}
          />
          <StegSettingModal
            type="EncodeSetting"
            visible={showEncodeSetting}
            onOk={handleEncodeSettingOk}
            onCancel={handleEncodeSettingCancel}
          ></StegSettingModal>
        </div>
      }
    >
      <Spin spinning={stopUploadImg}>
        <UploadImgModal key="Encode" reload={reloadUpImgPanel} setUploadImg={setUpImg}></UploadImgModal>

        <div className={'sourceContainer'}>
          <p className={'sourceContainerText'}>Secret massages:</p>
          <TextArea
            placeholder={'Secrets...'}
            allowClear
            className={classNames('sourceContainerInput', 'secretInput')}
            maxLength={200000}
            onChange={(e) => {
              setInputSecret(e.target.value);
            }}
            value={inputSecret}
          />
        </div>

        <div className={'buttonBox'}>
          <Button
            key={'Cancel'}
            size="large"
            style={{
              width: '45%',
            }}
            onClick={() => {
              setReloadUpImgPanel(!reloadUpImgPanel);
              setInputSecret('');
              setEncodedImg(undefined);
            }}
          >
            Cancel
          </Button>

          <Button
            key={'Encode'}
            size="large"
            type="primary"
            style={{
              width: '45%',
            }}
            onClick={() => handleEncodeBtn()}
          >
            Encode
          </Button>
        </div>
      </Spin>
    </Card>
  );
};

export default EncoderCard;
