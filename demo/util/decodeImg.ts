import { loadImg } from "./loadImg";
import { readLSB } from "../../src";

// Get the secret massage from img url
export async function decodeImg(imgUrl: string): Promise<string | undefined> {
  try {
    const img = await loadImg(imgUrl);
    let encImgCanvas = document.createElement('canvas');
    let encImgcontext = encImgCanvas.getContext('2d');
    encImgCanvas.width = img.width;
    encImgCanvas.height = img.height;
    encImgcontext.drawImage(img, 0, 0);
    let encodedImgData = encImgcontext.getImageData(0, 0, img.width, img.height);
    // console.log(encodedImgData.height + ' ' + encodedImgData.width);

    let encodedImgBitmap = Array.from(encodedImgData.data);
    let decodeSecret = readLSB(encodedImgBitmap);
    console.log('decodeSecret = ' + decodeSecret);
    if (decodeSecret == null || decodeSecret.length == 0) {
      throw new Error('Failed to decode the secret');
    }
    return decodeSecret;
  } catch (err) {
    console.error(err);
    return;
  }
}
