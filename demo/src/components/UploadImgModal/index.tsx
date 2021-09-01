import React, { useState, useEffect } from 'react';
import { Tabs, Input, Upload } from 'antd';
import { PictureFilled } from '@ant-design/icons';
import classNames from 'classnames';
import ImagePreview from '../ImagePreview';
import './index.less';

const { TabPane } = Tabs;
const { Dragger } = Upload;

const UploadImgModal = ({
  reload,
  setUploadImg,
}: {
  reload: boolean;
  setUploadImg: (image: string | undefined) => void;
}) => {
  const [image, setImage] = useState<string>();
  useEffect(() => {
    setUploadImg(image);
  }, [image]);

  useEffect(() => {
    setImage(undefined);
  }, [reload]);

  const uploadImage = (info: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => setImage(reader.result as string));
    reader.readAsDataURL(info.file.originFileObj);
  };

  const inputImage = (event: any) => {
    setImage(event.target.value);
  };

  return (
    <div className="modal">
      <Tabs
        defaultActiveKey="local"
        onChange={() => {
          setImage(undefined);
        }}
      >
        <TabPane tab="Native Upload" key="local">
          {image ? (
            <ImagePreview image={image}></ImagePreview>
          ) : (
            <div>
              <Dragger
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                showUploadList={false}
                onChange={uploadImage}
                className={classNames('sourceContainer', 'localContainer')}
              >
                <p className={'localLogo'}>
                  <PictureFilled />
                </p>
                <p className={'localText'}>Browse or drag images</p>
              </Dragger>
            </div>
          )}
        </TabPane>
        <TabPane tab="By URL" key="url">
          {image ? (
            <ImagePreview image={image} />
          ) : (
            <div className={'sourceContainer'}>
              <p className={'sourceContainerText'}>Image URL:</p>
              <Input
                placeholder="http://"
                className={classNames('sourceContainerInput', 'urlInput')}
                onPressEnter={inputImage}
              />
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UploadImgModal;
