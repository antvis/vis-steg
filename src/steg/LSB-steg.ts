import { initOptions } from "../util/iniOptions";
import { bits2Str, str2Bits } from "../util/processBits";

/**
 * LSB steg
 * @public
 */
export class LSBSteg {

  unSetBit(k: number) {
    return k % 2 === 1 ? Math.max(k - 1, 0) : k;
  }

  setBit(k: number) {
    return k % 2 === 1 ? k : Math.min(k + 1, 255);
  }

  /**
   * Return a decoded secret message
   *
   * @param options -
   */
  readLSB(options?: LSBDecodeOptions): string {
    const opts = initOptions(options, { imgBitmapData: [], imgHeight: 0, imgWidth: 0, imgChannel: 0 });
    const { imgBitmapData } = opts;
    const bitStream = [];
    for (let i = 0; i < imgBitmapData.length; i += 4) {
      bitStream.push(imgBitmapData[i] % 2);
      bitStream.push(imgBitmapData[i + 1] % 2);
      bitStream.push(imgBitmapData[i + 2] % 2);
    }
    const decodedSecret = bits2Str(bitStream);
    return decodedSecret;
  }

  writeLSB(options?: LSBEncodeOptions): number[] {
    const opts = initOptions(options, { imgBitmapData: [0], imgHeight: 0, imgWidth: 0, imgChannel: 0, secretInfo: "" });
    const { imgBitmapData, secretInfo } = opts;
    const bitStream = str2Bits(secretInfo);
    let j = 0;
    for (let i = 0; i < imgBitmapData.length; i += 4) {
      imgBitmapData[i] = bitStream[j] ? this.setBit(imgBitmapData[i]) : this.unSetBit(imgBitmapData[i]);
      imgBitmapData[i + 1] = bitStream[j + 1] ? this.setBit(imgBitmapData[i + 1]) : this.unSetBit(imgBitmapData[i + 1]);
      imgBitmapData[i + 2] = bitStream[j + 2] ? this.setBit(imgBitmapData[i + 2]) : this.unSetBit(imgBitmapData[i + 2]);
      imgBitmapData[i + 3] = 255;
      j += 3;
    }
    return imgBitmapData;
  }
}

/** @public */
export interface LSBEncodeOptions {
  imgBitmapData?: number[];
  imgHeight?: number;
  imgWidth?: number;
  imgChannel?: number;
  secretInfo?: string;
}

/** @public */
export interface LSBDecodeOptions {
  imgBitmapData?: number[];
  imgHeight?: number;
  imgWidth?: number;
  imgChannel?: number;
}
