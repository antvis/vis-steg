import React, { useState } from 'react';
import { Card } from 'antd';
import { PictureFilled } from '@ant-design/icons';
import ImagePreview from '../components/ImagePreview';
import EncoderCard from './EncoderCard';
import './index.less';

const EncoderPanel = ({ width }: { width: string | number }) => {
  const [encodedImg, setEncodedImg] = useState<string>();

  const getEncodedImg = (image: string) => {
    setEncodedImg(image);
  };

  return (
    <div
      style={{
        width: `${width}`,
      }}
    >
      <EncoderCard setEncodedImg={getEncodedImg} />

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
