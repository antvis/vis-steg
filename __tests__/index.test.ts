/**
 * @jest-environment jsdom
 */
import { LSBSteg } from '../src';

describe('test', () => {
  it('enc and dec should work', async () => {
    let testCase = 10;
    const mxImgSide = 600;
    const mnImgSide = 300;
    const imgChannelList = [1, 3, 4];
    const acceptCharacterStr = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z, ,·,.,:,;,+,-,*,/,~,!,@,#,$,%,^,&,`,=,<,>,[,],(,),?,_,{,},|';
    const acceptCharacter = acceptCharacterStr.split(',');
    acceptCharacter.push(',');
    acceptCharacter.push('\\');
    acceptCharacter.push('\'');
    const QRsizeList = [200, 300, 400];
    const mxMsgLenList = [140, 230, 360];
    while (testCase > 0) {
      // console.log(`testCase = ${testCase}`);
      const imgHeight = Math.floor(Math.random() * (mxImgSide - mnImgSide + 1)) + mnImgSide;
      const imgWidth = Math.floor(Math.random() * (mxImgSide - mnImgSide + 1)) + mnImgSide;
      const imgChannel = imgChannelList[Math.floor(Math.random() * imgChannelList.length)];
      const imgArrayLength = imgHeight * imgWidth * imgChannel;
      const testImgArray = new Array(imgArrayLength);
      for (let i = 0; i < imgArrayLength; i += 1) {
        testImgArray[i] = Math.floor(Math.random() * 256);
      }
      let mnMsgLen = Math.floor((imgHeight * imgWidth * 3) / 8) + 1;
      let mxMsgLen = Math.floor(imgHeight * imgWidth * 3 / 2 - 150);
      // prepare for QRcode mode
      const tmpIdx = Math.floor(Math.random() * QRsizeList.length);
      const tmpQRsize = QRsizeList[tmpIdx];
      const tmpMxMsgLen = mxMsgLenList[tmpIdx];
      if (testCase < 5) {
        // QRcode mode
        mxMsgLen = Math.floor((imgHeight * imgWidth * 3 * 8 * tmpMxMsgLen) / (tmpQRsize * tmpQRsize)) - tmpMxMsgLen;
        console.log(`tmpQRsize = ${tmpQRsize} tmpMxMsgLen = ${tmpMxMsgLen} mxMsgLen = ${mxMsgLen}`);
        if (mxMsgLen <= 1)
          // eslint-disable-next-line no-continue
          continue;
        mnMsgLen = 1;
      }
      const secretArrayLength = Math.floor(Math.random() * (mxMsgLen - mnMsgLen + 1)) + mnMsgLen;
      const testSecretArray = new Array(secretArrayLength);
      for (let i = 0; i < secretArrayLength; i += 1) {
        testSecretArray[i] = acceptCharacter[Math.floor(Math.random() * acceptCharacter.length)];
      }
      const testSecretString = testSecretArray.join('');
      const testLSBSteg = new LSBSteg();
      let decodedSecrets: string;
      if (testCase < 5) {
        // test QRcode mode
        // eslint-disable-next-line no-await-in-loop
        const encodedImg = await testLSBSteg.writeLSB({
          imgBitmapData: testImgArray,
          imgHeight,
          imgWidth,
          secretInfo: testSecretString,
          encMode: 'QRcode',
          QRSize: tmpQRsize,
          mxMsgLen: tmpMxMsgLen,
        });
        decodedSecrets = testLSBSteg.readLSB({ imgBitmapData: encodedImg, imgHeight, imgWidth, decMode: 'QRcode' });
      }
      else {
        // eslint-disable-next-line no-await-in-loop
        const encodedImg = await testLSBSteg.writeLSB({
          imgBitmapData: testImgArray,
          imgHeight,
          imgWidth,
          secretInfo: testSecretString,
          encMode: 'binary',
        });
        decodedSecrets = testLSBSteg.readLSB({ imgBitmapData: encodedImg, imgHeight, imgWidth, decMode: 'binary' });
      }
      expect(decodedSecrets).toBe(testSecretString);
      testCase -= 1;
    }
  });
});
