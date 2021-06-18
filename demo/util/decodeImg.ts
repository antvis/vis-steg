import { loadImg } from "./loadImg";
import { readLSB } from "../../src";

// Get the secret massage from img url
export async function decodeImg(imgUrl: string): Promise<string | undefined> {
  try {
    const img = await loadImg(imgUrl);
    const encImgCanvas = document.createElement('canvas');
    const encImgcontext = encImgCanvas.getContext('2d');
    encImgCanvas.width = img.width;
    encImgCanvas.height = img.height;
    encImgcontext.drawImage(img, 0, 0);
    const encodedImgData = encImgcontext.getImageData(0, 0, img.width, img.height);

    const encodedImgBitmap = Array.from(encodedImgData.data);
    const decodeSecret = readLSB(encodedImgBitmap);
    if (decodeSecret == null || decodeSecret.length === 0) {
      throw new Error('Failed to decode the secret');
    }
    return decodeSecret;
  } catch (err) {
    // console.error(err);
    return;
  }
}