import "./index.less";
import { Card } from "antd";
import { useState } from "react";
import ImagePreview from "../components/ImagePreview";
import { PictureFilled } from "@ant-design/icons";
import EncoderCard from "./EncoderCard";

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
      </Card>
    </div>
  );
};

export default EncoderPanel;
