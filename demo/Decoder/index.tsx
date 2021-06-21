import "./index.less";
import { Card, Typography } from "antd";
import { useState } from "react";
import DecoderCard from "./DecoderCard";

const { Paragraph } = Typography;

const DecoderPanel = ({ width }: { width: string | number }) => {
  const [decSecret, setDecSecret] = useState<string>("");

  const getDecSecret = (secret: string) => {
    setDecSecret(secret);
  };

  return (
    <div
      style={{
        width: `${width}`,
      }}
    >
      <DecoderCard setDecSecret={getDecSecret} />
      <Card hoverable className={"uploadImgPanel"} title="Decoded Secrets">
        <Paragraph>
          <pre>{decSecret}</pre>
        </Paragraph>
      </Card>
    </div>
  );
};

export default DecoderPanel;
