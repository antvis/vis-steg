import React, { useState } from 'react';
import DecoderCard from './DecoderCard';
import DecodeSecretCard from './DecodeSecretCard';
import './index.less';

const DecoderPanel = ({ width }: { width: string | number }) => {
  const [decSecret, setDecSecret] = useState<string>('');

  const getDecSecret = (secret: string) => {
    setDecSecret(secret);
  };

  return (
    <div
      style={{
        width: `${width}`,
        marginTop: '25px'
      }}
    >
      <DecoderCard setDecSecret={getDecSecret} />

      <DecodeSecretCard decSecret={decSecret} />

    </div >
  );
};

export default DecoderPanel;
