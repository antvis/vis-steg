/* String and Bits transfer is from https://github.com/zeruniverse/CryptoStego */
import { utf8Encode, utf8Decode } from "./utf8EncDec";

export function str2Bits(str: string): number[] {
  const utf8Array = utf8Encode(str);
  const bitsResult = [];
  for (let i = 0; i < utf8Array.length; i += 1) {
    for (let j = 128; j > 0; j = Math.floor(j / 2)) {
      if (Math.floor(utf8Array[i] / j)) {
        bitsResult.push(1);
        utf8Array[i] -= j;
      } else {
        bitsResult.push(0);
      }
    }
  }
  for (let i = 0; i < 24; i += 1) {
    bitsResult.push(1);
  }
  return bitsResult;
}

export function bits2Str(bitArray: number[]) {
  const msgArray = [];
  const msgArrayLen = Math.floor(bitArray.length / 8);
  for (let i = 0; i < msgArrayLen; i += 1) {
    let data = 0;
    let tmp = 128;
    for (let j = 0; j < 8; j += 1) {
      data += bitArray[i * 8 + j] * tmp;
      tmp = Math.floor(tmp / 2);
    }
    if (data === 255) break;
    msgArray.push(data);
  }
  return utf8Decode(msgArray);
}
