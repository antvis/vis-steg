import './index.less';
import UploadImgModal from '../components/UploadImgModal';
import { Layout, Card, Menu, Button, Spin, Input, Typography } from 'antd';
import { useState } from 'react';
import ImagePreview from '../components/ImagePreview';
import { PictureFilled } from '@ant-design/icons';
import { encodeImg, decodeImg } from '../util'
import classNames from 'classnames';
import {
  PieChartOutlined,
  DesktopOutlined,
} from '@ant-design/icons';

const { Content, Sider } = Layout;
const { Paragraph } = Typography;

export default function IndexPage() {
  const [encodedImg, setEncodedImg] = useState<string>();
  // const { image, setImage } = useModel('uploadImg');
  const [decSecret, setDecSecret] = useState<string>("");
  const [inputSecret, setInputSecret] = useState<string>("");
  const [stopUploadImg, setStopUploadImg] = useState<boolean>(false);
  const [isEncPanel, setIsEncPanel] = useState<boolean>(true);

  const [reloadUpImgPanel, setReloadUpImgPanel] = useState<boolean>(false);
  const [upImg, setUpImg] = useState<string>();

  const EncDecSider = (props: { isEncPanel: boolean }) => {
    const { isEncPanel = true } = props;
    let defaultSelectedKeys = "Encode";
    if (!isEncPanel) defaultSelectedKeys = "Decode";
    return (
      <Sider
        collapsible
        collapsed={false}
        theme="light"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className={"tmpLogo"} />
        <Menu theme="light" defaultSelectedKeys={[defaultSelectedKeys]} mode="inline">
          <Menu.Item
            key="Encode"
            icon={<PieChartOutlined />}
            onClick={() => {
              setIsEncPanel(true);
              setEncodedImg(undefined);
              setUpImg(undefined);
            }}
          >
            Encode
          </Menu.Item>
          <Menu.Item
            key="Decode"
            icon={<DesktopOutlined />}
            onClick={() => {
              setIsEncPanel(false);
              setEncodedImg(undefined);
              setUpImg(undefined);
            }}
          >
            Decode
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }

  const handleEncodeBtn = () => {
    setStopUploadImg(true);
    console.log("inputSecret = " + inputSecret);
    if (inputSecret === undefined) setInputSecret("");
    encodeImg(upImg, inputSecret)
      .then((result) => {
        if (result) {
          setEncodedImg(result);
        } else {
          setEncodedImg(undefined);
        }
        setStopUploadImg(false);
      })
      .catch((err) => {
        alert("Failed to encode the secret!");
        setReloadUpImgPanel(true);
        setEncodedImg(undefined);
        setStopUploadImg(false);
      });
  };

  const handleDecodeBtn = () => {
    setStopUploadImg(true);
    decodeImg(upImg)
      .then((result) => {
        if (result) {
          setDecSecret(result);
        } else {
          alert("Failed to decode the secret!");
          setDecSecret("");
        }
        setStopUploadImg(false);
      })
      .catch((err) => {
        alert("Failed to decode the secret!");
        setReloadUpImgPanel(true);
        setDecSecret("");
        setStopUploadImg(false);
      });
  };

  const getUploadImg = (image: string) => {
    // console.log("getUploadImg = " + image);
    setUpImg(image);
  }

  if (isEncPanel) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <EncDecSider isEncPanel={isEncPanel} />

        <Layout className={"layout"}>
          <Content>
            <Card hoverable className={"uploadImgPanel"} title="Encoder">
              <Spin spinning={stopUploadImg}>
                <UploadImgModal
                  key="Encode"
                  reload={reloadUpImgPanel}
                  setUploadImg={getUploadImg}
                ></UploadImgModal>

                <div className={"sourceContainer"}>
                  <p className={"sourceContainerText"}>Secret massages:</p>
                  <Input
                    placeholder={"Secrets..."}
                    className={classNames(
                      "sourceContainerInput",
                      "urlInput",
                    )}
                    maxLength={100}
                    onChange={(e) => {
                      setInputSecret(e.target.value);
                    }}
                  />
                </div>

                <div className={"buttonBox"}>
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

            <Card
              hoverable
              className={"uploadImgPanel"}
              title="Encoded Image"
            >
              {encodedImg ? (
                <ImagePreview image={encodedImg}></ImagePreview>
              ) : (
                <div className={"localContainer"}>
                  <p className={"localLogo"}>
                    <PictureFilled />
                  </p>
                </div>
              )}
            </Card>
          </Content>
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>

      <EncDecSider isEncPanel={isEncPanel} />

      <Layout className={"layout"}>
        <Content>
          <Card hoverable className={"uploadImgPanel"} title="Decoder">
            <Spin spinning={stopUploadImg}>
              <UploadImgModal
                key="Decode"
                reload={reloadUpImgPanel}
                setUploadImg={getUploadImg}
              ></UploadImgModal>

              <div className={"buttonBox"}>
                <Button
                  key={'Cancel'}
                  size="large"
                  style={{
                    width: '45%',
                  }}
                  onClick={() => {
                    setReloadUpImgPanel(reloadUpImgPanel ? false : true);
                    setDecSecret("");
                  }}
                >
                  Cancel
                </Button>

                <Button
                  key={'Decode'}
                  size="large"
                  type="primary"
                  style={{
                    width: '45%',
                  }}
                  onClick={() => handleDecodeBtn()}
                >
                  Decode
                </Button>
              </div>
            </Spin>
          </Card>

          <Card
            hoverable
            className={"uploadImgPanel"}
            title="Decoded Secrets"
          >

            <Paragraph>
              <pre>{decSecret}</pre>
            </Paragraph>

          </Card>
        </Content>
      </Layout>
    </Layout>
  );

}
