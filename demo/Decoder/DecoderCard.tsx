import "./index.less";
import UploadImgModal from "../components/UploadImgModal";
import { Card, Button, Spin } from "antd";
import { useState } from "react";
import { decodeImg } from "../util";

const DecoderCard = ({ setDecSecret }: { setDecSecret: (secret: string) => void }) => {
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
  );
};

export default DecoderCard;
