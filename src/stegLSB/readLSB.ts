import { bits2Str } from "../util/processBits";

export function readLSB(imgBitmapData: Array<number>): string {
  let bitStream = new Array();
  for (let i = 0; i < imgBitmapData.length; i += 4) {
    bitStream.push(imgBitmapData[i] % 2);
    bitStream.push(imgBitmapData[i + 1] % 2);
    bitStream.push(imgBitmapData[i + 2] % 2);
  }
  let decodedSecret = bits2Str(bitStream);
  return decodedSecret;
}