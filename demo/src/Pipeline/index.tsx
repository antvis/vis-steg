import React, { useState } from 'react';
import { Card, Button, Spin } from 'antd';
import EncoderCard from '../Encoder/EncoderCard';
import { decodeImg } from '../util';
import DecodeSecretCard from '../Decoder/DecodeSecretCard';
import EncodedImgCard from '../Encoder/EncodedImgCard';
import './index.less';

const PipelinePanel = ({ width }: { width: string | number }) => {
  const [encodedImg, setEncodedImg] = useState<string>();
  const [decSecret, setDecSecret] = useState<string>('');
  const [stopUploadImg, setStopUploadImg] = useState<boolean>(false);
  const [reloadUpImgPanel, setReloadUpImgPanel] = useState<boolean>(false);

  const handleDecodeBtn = () => {
    setStopUploadImg(true);
    decodeImg(encodedImg)
      .then((result) => {
        if (result) {
          // console.log("decodeSecret = " + result);
          setDecSecret(result);
        } else {
          throw new Error('Failed to decode the secret!');
        }
        setStopUploadImg(false);
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert('Failed to decode the secret!');
        setReloadUpImgPanel(!reloadUpImgPanel);
        setDecSecret('');
        setStopUploadImg(false);
      });
  };

  const getEncodedImg = (image: string) => {
    setEncodedImg(image);
  };

  return (
    <div className={'pipeLinePanel'}>
      <div
        style={{
          width: `${width}`,
        }}
      >
        <EncoderCard setEncodedImg={getEncodedImg} />
      </div>

      <div
        style={{
          width: `${width}`,
        }}
      >
        <Card hoverable className={'uploadImgPanel'} title="Encoded Image">
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
