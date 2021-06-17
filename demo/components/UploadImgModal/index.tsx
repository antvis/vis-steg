import { Tabs, Input, Upload } from 'antd';
import { PictureFilled, PlusOutlined } from '@ant-design/icons';
import ImagePreview from '../ImagePreview';
import classNames from 'classnames';
import './index.less';
import { useState, useEffect } from 'react';

const { TabPane } = Tabs;
const { Dragger } = Upload;

const UploadImgModal = ({ reload = false,
  setUploadImg = (image: string) => { },
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
    <div
      className="modal"
    >
      <Tabs
        defaultActiveKey="local"
        onChange={() => {
          setImage(undefined);
        }}
      >
        <TabPane tab="本地上传" key="local">
          {image ? (
            <ImagePreview image={image}></ImagePreview>
          ) : (
            <div>
              <Dragger
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                showUploadList={false}
                onChange={uploadImage}
                className={classNames(
                  "sourceContainer",
                  "localContainer",
                )}
              >
                <p className={"localLogo"}>
                  <PictureFilled />
                </p>
                <p className={"localText"}>浏览或拖拽图片</p>
              </Dragger>
            </div>
          )}
        </TabPane>
        <TabPane tab="以url传图" key="url">
          {image ? (
            <ImagePreview image={image} />
          ) : (
            <div className={"sourceContainer"}>
              <p className={"sourceContainerText"}>图片URL:</p>
              <Input
                placeholder="http://"
                className={classNames(
                  "sourceContainerInput",
                  "urlInput",
                )}
                onPressEnter={inputImage}
              />
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default UploadImgModal;