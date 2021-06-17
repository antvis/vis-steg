import { str2Bits } from "../util/processBits";

// TODO: 1. start check 2. legal check 3. error correction (e.g. Hamming Code)
export function writeLSB(imgBitmapData: Array<number>, secretInfo: string): Array<number> {
  function unSetBit(k: number) {
    return k % 2 == 1 ? (Math.max(k - 1, 0)) : k;
  }
  function setBit(k: number) {
    return k % 2 == 1 ? k : (Math.min(k + 1, 255));
  }
  let bitStream = str2Bits(secretInfo);
  let j = 0;
  for (let i = 0; i < imgBitmapData.length; i += 4) {
    imgBitmapData[i] = bitStream[j] ? setBit(imgBitmapData[i]) : unSetBit(imgBitmapData[i]);
    imgBitmapData[i + 1] = bitStream[j + 1] ? setBit(imgBitmapData[i + 1]) : unSetBit(imgBitmapData[i + 1]);
    imgBitmapData[i + 2] = bitStream[j + 2] ? setBit(imgBitmapData[i + 2]) : unSetBit(imgBitmapData[i + 2]);
    imgBitmapData[i + 3] = 255;
    j += 3;
  }
  return imgBitmapData;
}