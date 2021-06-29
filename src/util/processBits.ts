/* String and Bits transfer is from https://github.com/zeruniverse/CryptoStego */
import { utf8Encode, utf8Decode } from './utf8EncDec';

export function str2Bits(str: string): string {
  const utf8Array = utf8Encode(str);
  let bitsResult = '';
  for (let i = 0; i < utf8Array.length; i += 1) {
    for (let j = 128; j > 0; j = Math.floor(j / 2)) {
      if (Math.floor(utf8Array[i] / j)) {
        bitsResult += '1';
        utf8Array[i] -= j;
      } else {
        bitsResult += '0';
      }
    }
  }
  return bitsResult;
}

export function bits2Str(bitArray: string): string {
  const msgArray = [];
  const msgArrayLen = Math.floor(bitArray.length / 8);
  for (let i = 0; i < msgArrayLen; i += 1) {
    let data = 0;
    let tmp = 128;
    for (let j = 0; j < 8; j += 1) {
      data += parseInt(bitArray[i * 8 + j], 10) * tmp;
      tmp = Math.floor(tmp / 2);
    }
    msgArray.push(data);
  }
  return utf8Decode(msgArray);
}
