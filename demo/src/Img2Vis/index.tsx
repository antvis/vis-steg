import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import DecoderCard from '../Decoder/DecoderCard';
import DecodeSecretCard from '../Decoder/DecodeSecretCard';
import { g2plotRender } from '../util';
import './index.less';

const Img2VisPanel = ({ width }: { width: string | number }) => {
  const [decSecret, setDecSecret] = useState<string>('');

  const getDecSecret = (secret: string) => {
    setDecSecret(secret);
  };

  let decSecretJSON: JSON;
  if (decSecret.length > 0) {
    try {
      decSecretJSON = JSON.parse(decSecret);
    }
    catch (err) {
      // eslint-disable-next-line no-alert
      alert('Failed to render the visualization!');
      decSecretJSON = JSON.parse(JSON.stringify(decSecret));
    }
  }
  else {
    decSecretJSON = JSON.parse(JSON.stringify(decSecret));
  }

  useEffect(() => {
    // Object.keys(decSecretJSON).forEach((key) => {
    //   console.log(decSecretJSON[key]);
    // });

    let plot: any;

    if (decSecretJSON.constructor === Object && decSecretJSON !== undefined &&
      // eslint-disable-next-line no-prototype-builtins
      decSecretJSON.hasOwnProperty('data') && decSecretJSON.hasOwnProperty('config')) {
      const { data } = decSecretJSON;
      fetch(data).then((res) => {
        return res.json();
      }).then((data) => {
        plot = g2plotRender('test_container', decSecretJSON.type, data, decSecretJSON.config);
      });
      return function cleanup() {
        plot.destroy();
      };
    }
  }, [decSecretJSON]);

  return (
    <div className={'img2VisPanel'}>
      <div
        style={{
          width: `${width}`,
        }}
      >
        <DecoderCard setDecSecret={getDecSecret} />
      </div>

      <div
        style={{
          width: `${width}`,
        }}
      >
        <Card hoverable className={'uploadImgPanel'} title="Visualization">
          <div id={'test_container'}></div>
        </Card>

        <DecodeSecretCard decSecret={decSecret} />

      </div>
    </div>
  );
};

export default Img2VisPanel;
