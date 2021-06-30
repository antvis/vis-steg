import React from 'react';
import { PictureFilled, DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ImagePreview from '../components/ImagePreview';
import { downloadPng } from '../util';
import './index.less';

const EncodedImgCard = ({ encodedImg }: { encodedImg: string | undefined }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        <Button
          style={{
            float: 'right',
            marginRight: '0px',
            marginBottom: '0px',
          }}
          type="link"
          icon={<DownloadOutlined />}
          size={'middle'}
          disabled={!encodedImg}
          onClick={() => {
            downloadPng(encodedImg, 'encodedImg');
          }}
        />
      </div>

      {encodedImg ? (
        <ImagePreview image={encodedImg}></ImagePreview>
      ) : (
        <div className={'localContainer'}>
          <p className={'localLogo'}>
            <PictureFilled />
          </p>
        </div>
      )}
    </div>
  );
};

export default EncodedImgCard;
