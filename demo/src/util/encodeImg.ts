import { initOptions } from '../../../src/util/iniOptions';
import { LSBSteg, LSBEncodeOptions } from '../../../src';
import { loadImg } from './loadImg';

// Get the encoded image from img url
export async function encodeImg(
  imgUrl: string | undefined,
  secretInfo: string,
  stegOpts?: LSBEncodeOptions,
  stegMethod = 'lsb'
): Promise<string | undefined> {
  try {
    // TEMP
    console.log(stegMethod);
    const opts = initOptions(stegOpts, { encMode: 'binary', QRSize: 200, mxMsgLen: 130 });
    const { encMode, QRSize, mxMsgLen } = opts;
    const img = await loadImg(imgUrl);
    const containerImgCanvas = document.createElement('canvas');
    const containerCanvascxt = containerImgCanvas.getContext('2d');
    containerImgCanvas.width = img.width;
    containerImgCanvas.height = img.height;
    containerCanvascxt.drawImage(img, 0, 0);
    const containerImgData = containerCanvascxt.getImageData(0, 0, img.width, img.height);
    const containerImgBitmap = Array.from(containerImgData.data);
    let encodedImgData = new ImageData(containerImgCanvas.width, containerImgCanvas.height);

    if (stegMethod === 'lsb') {
      const testLSBSteg = new LSBSteg();
      const encodedImgBitmap = Uint8ClampedArray.from(
        await testLSBSteg.writeLSB({
          imgBitmapData: containerImgBitmap,
          imgHeight: img.height,
          imgWidth: img.width,
          secretInfo,
          encMode,
          QRSize,
          mxMsgLen,
        })
      );
      encodedImgData = new ImageData(encodedImgBitmap, containerImgCanvas.width, containerImgCanvas.height);
    }
    /* Incomplete
    else if (stegMethod === 'dct') {
      const testDctSteg = new DCTSteg();
      const encodedImgBitmap = Uint8ClampedArray.from(
        testDctSteg.writeDCT({
          imgBitmapData: containerImgBitmap,
          imgHeight: img.height,
          imgWidth: img.width,
          secretInfo,
        })
      );
      encodedImgData = new ImageData(encodedImgBitmap, containerImgCanvas.width, containerImgCanvas.height);
    }
    */
    if (encodedImgData.data.length > 0) {
      containerCanvascxt.putImageData(encodedImgData, 0, 0);
      const encImgURL: string = containerImgCanvas.toDataURL('image/png');
      return encImgURL;
    }
    return undefined;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
