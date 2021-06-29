import React, { useState } from 'react';
import { Card, Button, Spin, Input } from 'antd';
import classNames from 'classnames';
import UploadImgModal from '../components/UploadImgModal';
import { encodeImg } from '../util';
import './index.less';

const { TextArea } = Input;

const EncoderCard = ({ setEncodedImg }: { setEncodedImg: (image: string) => void }) => {
  const [inputSecret, setInputSecret] = useState<string>('');
  const [stopUploadImg, setStopUploadImg] = useState<boolean>(false);
  const [reloadUpImgPanel, setReloadUpImgPanel] = useState<boolean>(false);
  const [upImg, setUpImg] = useState<string>();

  const getUploadImg = (image: string) => {
    setUpImg(image);
  };

  const handleEncodeBtn = () => {
    setStopUploadImg(true);
    // console.log("inputSecret = " + inputSecret);
    if (inputSecret === undefined) setInputSecret('');
    encodeImg(upImg, inputSecret)
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
        setReloadUpImgPanel(!reloadUpImgPanel);
        setEncodedImg(undefined);
        setStopUploadImg(false);
      });
  };

  return (
    <Card hoverable className={'uploadImgPanel'} title="Encoder">
      <Spin spinning={stopUploadImg}>
        <UploadImgModal key="Encode" reload={reloadUpImgPanel} setUploadImg={getUploadImg}></UploadImgModal>

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
              // setInputSecret("");
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
