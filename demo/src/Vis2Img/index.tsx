import React, { useState } from 'react';
import { Card } from 'antd';
import EncodedImgCard from '../Encoder/EncodedImgCard';
import VisCard from './VisCard';
import './index.less';

const Vis2ImgPanel = ({ width }: { width: string | number }) => {
  const [encodedImg, setEncodedImg] = useState<string>();

  return (
    <div
      style={{
        width: `${width}`,
        marginTop: '25px',
      }}
    >
      <VisCard setEncodedImg={setEncodedImg} />

      <Card hoverable className={'uploadImgPanel'} title="Encoded Image">
        <EncodedImgCard encodedImg={encodedImg} />
      </Card>
    </div>
  );
};

export default Vis2ImgPanel;
