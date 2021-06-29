import React from 'react';
import { Card, Typography } from 'antd';

const { Paragraph } = Typography;

const DecodeSecretCard = ({ decSecret }: { decSecret: string }) => {
  return (
    <Card hoverable className={'uploadImgPanel'} title="Decoded Secrets"
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div>
          <Paragraph
            style={{
              float: 'right',
              marginRight: '0px',
              marginBottom: '0px',
            }}
            copyable={{ text: decSecret }}
          >
          </Paragraph>
        </div>

        <Paragraph>
          <pre>
            <div id="test"
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
    </Card >
  );
};

export default DecodeSecretCard;
