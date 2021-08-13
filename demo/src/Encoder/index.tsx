import React, { useState } from 'react';
import { Card } from 'antd';
import EncoderCard from './EncoderCard';
import EncodedImgCard from './EncodedImgCard';
import './index.less';

const EncoderPanel = ({ width }: { width: string | number }) => {
  const [encodedImg, setEncodedImg] = useState<string>();

  const getEncodedImg = (image: string | undefined) => {
    setEncodedImg(image);
  };

  return (
    <div
      style={{
        width: `${width}`,
        marginTop: '25px',
      }}
    >
      <EncoderCard setEncodedImg={getEncodedImg} />

      <Card hoverable className={'uploadImgPanel'} title="Encoded Image">
        <EncodedImgCard encodedImg={encodedImg} />
      </Card>
    </div>
  );
};

export default EncoderPanel;
