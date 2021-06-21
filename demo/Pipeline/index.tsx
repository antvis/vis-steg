import "./index.less";
import { Card, Button, Spin, Typography } from "antd";
import { useState } from "react";
import ImagePreview from "../components/ImagePreview";
import { PictureFilled } from "@ant-design/icons";
import EncoderCard from "../Encoder/EncoderCard";
import { decodeImg } from "../util";

const { Paragraph } = Typography;

const PipelinePanel = ({ width }: { width: string | number }) => {
  const [encodedImg, setEncodedImg] = useState<string>();
  const [decSecret, setDecSecret] = useState<string>("");
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
          throw new Error("Failed to decode the secret!");
        }
        setStopUploadImg(false);
      })
      .catch((err) => {
        alert("Failed to decode the secret!");
        setReloadUpImgPanel(reloadUpImgPanel ? false : true);
        setDecSecret("");
        setStopUploadImg(false);
      });
  };

  const getEncodedImg = (image: string) => {
    setEncodedImg(image);
  };

  return (
    <div className={"pipeLinePanel"}>
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
        <Card hoverable className={"uploadImgPanel"} title="Encoded Image">
          {encodedImg ? (
            <ImagePreview image={encodedImg}></ImagePreview>
          ) : (
            <div className={"localContainer"}>
              <p className={"localLogo"}>
                <PictureFilled />
              </p>
            </div>
          )}
          <Spin spinning={stopUploadImg}>
            <Button
              key={"Decode"}
              size="large"
              type="primary"
              style={{
                marginTop: "15px",
              }}
              block
              onClick={() => handleDecodeBtn()}
            >
              Decode
            </Button>
          </Spin>
        </Card>

        <Card hoverable className={"uploadImgPanel"} title="Decoded Secrets">
          <Paragraph>
            <pre>{decSecret}</pre>
          </Paragraph>
        </Card>
      </div>
    </div>
  );
};

export default PipelinePanel;
