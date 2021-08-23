import React, { useState, useEffect } from 'react';
import { ShareAltOutlined } from '@ant-design/icons';
import { Card, Typography, Button, Popover } from 'antd';
import ImagePreview from '../components/ImagePreview';
import { generateQRbase64 } from '../../../src/util/procQR';

const { Paragraph } = Typography;

const DecodeSecretCard = ({ decSecret }: { decSecret: string }) => {
  const [useTrigger, setUseTrigger] = useState<string>('');
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [QRbase64, setQRbase64] = useState<string>('');

  useEffect(() => {
    async function getQRbase64(msg: string, QRSize: number = 200) {
      const res = await generateQRbase64(msg, QRSize);
      setQRbase64(res);
      return res;
    }
    if (decSecret.length > 0 && decSecret.length <= 150) {
      getQRbase64(decSecret);
      setUseTrigger('hover');
      setBtnDisabled(false);
    }
    else {
      setQRbase64('');
      setUseTrigger('');
      setBtnDisabled(true);
    }
  }, [decSecret]);

  return (
    <Card hoverable className={'uploadImgPanel'} title="Decoded Secrets">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            direction: 'rtl',
          }}
        >
          <div>
            <Popover
              content={
                <div>
                  <ImagePreview image={QRbase64}></ImagePreview>
                </div>
              }
              trigger={useTrigger}
            >
              <Button
                style={{
                  marginTop: '-5px',
                }}
                type="link"
                icon={<ShareAltOutlined />}
                size={'middle'}
                disabled={btnDisabled}
              />
            </Popover>
          </div>

          <div>
            <Paragraph
              style={{
                // float: 'right',
                marginRight: '0px',
                marginBottom: '0px',
              }}
              copyable={{ text: decSecret }}
            ></Paragraph>
          </div>
        </div>

        <Paragraph>
          <pre>
            <div
              id="test"
              style={{
                overflow: 'auto',
                minHeight: '10px',
                maxHeight: '300px',
              }}
            >
              {decSecret}
            </div>
          </pre>
        </Paragraph>
      </div>
    </Card>
  );
};

export default DecodeSecretCard;
