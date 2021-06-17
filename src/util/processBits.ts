/* String and Bits transfer is from https://github.com/zeruniverse/CryptoStego */
import { utf8Encode, utf8Decode } from "./utf8EncDec";

export function str2Bits(str: string): Array<number> {
  let utf8Array = utf8Encode(str);
  let bitsResult = new Array();
  for (let i = 0; i < utf8Array.length; i++) {
    for (let j = 128; j > 0; j = Math.floor(j / 2)) {
      if (Math.floor(utf8Array[i] / j)) {
        bitsResult.push(1);
        utf8Array[i] -= j;
      } else {
        bitsResult.push(0);
      }
    }
  }
  for (let i = 0; i < 24; i++) {
    bitsResult.push(1);
  }
  return bitsResult;
}

export function bits2Str(bitArray: Array<number>) {
  let msgArray = new Array();
  var msgArrayLen = Math.floor(bitArray.length / 8);
  for (let i = 0; i < msgArrayLen; i++) {
    let data = 0;
    let tmp = 128;
    for (let j = 0; j < 8; j++) {
      data += bitArray[i * 8 + j] * tmp;
      tmp = Math.floor(tmp / 2);
    }
    if (data == 255) break;
    msgArray.push(data);
  }
  return utf8Decode(msgArray);
}
