import './index.less';
import UploadImgModal from '../components/UploadImgModal';
import { Card, Button, Spin, Input } from 'antd';
import React, { useState } from 'react';
import ImagePreview from '../components/ImagePreview';
import { PictureFilled } from '@ant-design/icons';
import { encodeImg } from '../util';
import classNames from 'classnames';

const { TextArea } = Input;

const EncoderPanel = () => {
  const [encodedImg, setEncodedImg] = useState<string>();
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
      .catch((err) => {
        alert('Failed to encode the secret!');
        setReloadUpImgPanel(reloadUpImgPanel ? false : true);
        setEncodedImg(undefined);
        setStopUploadImg(false);
      });
  };

  return (
    <div>
      <Card hoverable className={'uploadImgPanel'} title="Encoder">
        <Spin spinning={stopUploadImg}>
          <UploadImgModal key="Encode" reload={reloadUpImgPanel} setUploadImg={getUploadImg}></UploadImgModal>

          <div className={'sourceContainer'}>
            <p className={'sourceContainerText'}>Secret massages:</p>
            <TextArea
              placeholder={'Secrets...'}
              allowClear
              className={classNames('sourceContainerInput', 'urlInput')}
              maxLength={100}
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
                setReloadUpImgPanel(reloadUpImgPanel ? false : true);
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

      <Card hoverable className={'uploadImgPanel'} title="Encoded Image">
        {encodedImg ? (
          <ImagePreview image={encodedImg}></ImagePreview>
        ) : (
          <div className={'localContainer'}>
            <p className={'localLogo'}>
              <PictureFilled />
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EncoderPanel;
