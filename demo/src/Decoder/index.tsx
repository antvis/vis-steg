import "./index.less";
import UploadImgModal from "../components/UploadImgModal";
import { Card, Button, Spin, Typography } from "antd";
import { useState } from "react";
import { decodeImg } from "../util";

const { Paragraph } = Typography;

const DecoderPanel = () => {
  const [decSecret, setDecSecret] = useState<string>("");
  const [stopUploadImg, setStopUploadImg] = useState<boolean>(false);
  const [reloadUpImgPanel, setReloadUpImgPanel] = useState<boolean>(false);
  const [upImg, setUpImg] = useState<string>();

  const getUploadImg = (image: string) => {
    setUpImg(image);
  };

  const handleDecodeBtn = () => {
    setStopUploadImg(true);
    decodeImg(upImg)
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

  return (
    <div>
      <Card hoverable className={"uploadImgPanel"} title="Decoder">
        <Spin spinning={stopUploadImg}>
          <UploadImgModal key="Decode" reload={reloadUpImgPanel} setUploadImg={getUploadImg}></UploadImgModal>

          <div className={"buttonBox"}>
            <Button
              key={"Cancel"}
              size="large"
              style={{
                width: "45%",
              }}
              onClick={() => {
                setReloadUpImgPanel(reloadUpImgPanel ? false : true);
                setDecSecret("");
              }}
            >
              Cancel
            </Button>

            <Button
              key={"Decode"}
              size="large"
              type="primary"
              style={{
                width: "45%",
              }}
              onClick={() => handleDecodeBtn()}
            >
              Decode
            </Button>
          </div>
        </Spin>
      </Card>

      <Card hoverable className={"uploadImgPanel"} title="Decoded Secrets">
        <Paragraph>
          <pre>{decSecret}</pre>
        </Paragraph>
      </Card>
    </div>
  );
};

export default DecoderPanel;
