/* eslint-disable operator-assignment */
// import { cloneDeep } from 'lodash';
import { initOptions } from "../util/iniOptions";
import { bits2Str, str2Bits } from "../util/processBits";

const maskValues = {
  maskONEValues: [1, 2, 4, 8, 16, 32, 64, 128],
  maskZEROValues: [254, 253, 251, 247, 239, 223, 191, 127],
};

/**
 * LSB steg
 * @public
 */
export class LSBSteg {
  private headStr = "enc$";

  private headBitsLen = this.headStr.length * 8;

  private bitIdx: number = 0;

  private maskONE: number = maskValues.maskONEValues[this.bitIdx];

  private maskZERO: number = maskValues.maskZEROValues[this.bitIdx];

  private curHeight: number = 0;

  private curWidth: number = 0;

  private curChannel: number = 0;

  private imgBitmapData: number[] = [];

  private imgHeight: number = 0;

  private imgWidth: number = 0;

  private imgChannel: number = 0;

  initProps() {
    this.headStr = "enc$";
    this.headBitsLen = this.headStr.length * 8;
    this.bitIdx = 0;
    this.maskONE = maskValues.maskONEValues[this.bitIdx];
    this.maskZERO = maskValues.maskZEROValues[this.bitIdx];
    this.curHeight = 0;
    this.curWidth = 0;
    this.curChannel = 0;
    this.imgBitmapData = [];
    this.imgHeight = 0;
    this.imgWidth = 0;
    this.imgChannel = 0;
  }

  // transfer a gray image or jpg image to RGBA form
  adjustImgData() {
    this.imgChannel = this.imgBitmapData.length / this.imgHeight / this.imgWidth;
    if (this.imgChannel === 4) return;
    const adjustImg = [];
    for (let i = 0; i < this.imgHeight; i += 1) {
      for (let j = 0; j < this.imgWidth; j += 1) {
        for (let k = 0; k < 3; k += 1) {
          if (this.imgChannel === 1)
            adjustImg.push(this.imgBitmapData[i * this.imgWidth + j]);
          else
            adjustImg.push(this.imgBitmapData[i * this.imgWidth * this.imgChannel + j * this.imgChannel + k]);
        }
        adjustImg.push(255);
      }
    }
    this.imgBitmapData = adjustImg;
    this.imgChannel = 4;
  }

  // get the binary value of an int as a byte
  getBinaryVal({ val, bitSize }: { val: number, bitSize: number }): string {
    let binVal = val.toString(2);
    while (binVal.length < bitSize) {
      binVal = `0${binVal}`;
    }
    return binVal;
  }

  nextSlot() {
    // only 3 (RGB) channels can be used
    if (this.curChannel === 2) {
      this.curChannel = 0;
      if (this.curWidth === this.imgWidth - 1) {
        this.curWidth = 0;
        if (this.curHeight === this.imgHeight - 1) {
          this.curHeight = 0;
          // the last mask 1000000
          if (this.maskONE === 128) {
            throw new Error("No available slot remaining (image filled)");
          }
          else {
            this.bitIdx += 1;
            this.maskONE = maskValues.maskONEValues[this.bitIdx];
            this.maskZERO = maskValues.maskZEROValues[this.bitIdx];
          }
        }
        else this.curHeight += 1;
      }
      else this.curWidth += 1;
    }
    else this.curChannel += 1;
  }

  putBits({ bits }: { bits: string }): number[] {
    // const imgBitmapData = cloneDeep(this.imgBitmapData);
    const { imgBitmapData } = this;
    for (let i = 0; i < bits.length; i += 1) {
      const curPos = this.curHeight * this.imgWidth * 4 + this.curWidth * 4;
      const RGBAVal = imgBitmapData.slice(curPos, curPos + 4);
      if (parseInt(bits[i], 10) === 1) {
        // eslint-disable-next-line no-bitwise
        RGBAVal[this.curChannel] = RGBAVal[this.curChannel] | this.maskONE;
      }
      else {
        // eslint-disable-next-line no-bitwise
        RGBAVal[this.curChannel] = RGBAVal[this.curChannel] & this.maskZERO;
      }
      imgBitmapData.splice(curPos, 4, ...RGBAVal);
      this.nextSlot();
    }
    return imgBitmapData;
  }

  readBits({ numBits }: { numBits: number }): string {
    const { imgBitmapData } = this;
    let bits = "";
    for (let i = 0; i < numBits; i += 1) {
      const curPos = this.curHeight * this.imgWidth * 4 + this.curWidth * 4 + this.curChannel;
      let val = imgBitmapData[curPos];
      // eslint-disable-next-line no-bitwise
      val = val & this.maskONE;
      this.nextSlot();
      if (val > 0) bits += "1";
      else bits += "0";
    }
    return bits;
  }

  /**
   * Return a decoded secret message
   *
   * @param options -
   */
  readLSB(options?: LSBDecodeOptions): string {
    const opts = initOptions(options, { imgBitmapData: [], imgHeight: 0, imgWidth: 0, imgChannel: 0 });
    const { imgBitmapData, imgHeight, imgWidth } = opts;
    this.initProps();
    this.imgHeight = imgHeight;
    this.imgWidth = imgWidth;
    this.imgBitmapData = imgBitmapData;
    this.imgChannel = this.imgBitmapData.length / this.imgHeight / this.imgWidth;
    if (this.imgChannel !== 4) {
      throw new Error("Decode image must have 4 channels!");
    }
    const decodedHeadBinary = this.readBits({ numBits: this.headBitsLen });
    const decodedHeadStr = bits2Str(decodedHeadBinary);
    if (decodedHeadStr !== this.headStr) {
      throw new Error("Failed to decode the secret!");
    }
    const infoLenBinary = this.readBits({ numBits: 64 });
    const infoLen = parseInt(infoLenBinary, 2);
    const bitStream = this.readBits({ numBits: infoLen * 8 });
    const decodedSecret = bits2Str(bitStream);
    return decodedSecret;
  }

  /**
   * Return an encoded image
   *
   * @param options -
   */
  writeLSB(options?: LSBEncodeOptions): number[] | undefined {
    const opts = initOptions(options, { imgBitmapData: [], imgHeight: 0, imgWidth: 0, imgChannel: 0, secretInfo: "" });
    const { imgBitmapData, imgHeight, imgWidth, secretInfo } = opts;
    this.initProps();
    this.imgHeight = imgHeight;
    this.imgWidth = imgWidth;
    this.imgBitmapData = imgBitmapData;
    this.adjustImgData();

    const headStrBinary = str2Bits(this.headStr);
    const bitStream = str2Bits(secretInfo);
    const infoLen = bitStream.length / 8;
    // remain more bits for other information, such as the head string
    if (imgHeight * imgWidth * 3 < infoLen + 100) {
      throw new Error("Carrier image not big enough to hold all the datas to steganography");
    }
    const infoLenBinary = this.getBinaryVal({ val: infoLen, bitSize: 64 });
    const mergeStream = headStrBinary + infoLenBinary + bitStream;
    const newImgBitmapData = this.putBits({ bits: mergeStream });
    return newImgBitmapData;
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
