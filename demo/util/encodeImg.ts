import { loadImg } from "./loadImg";
import { writeLSB } from "../../src";

// Get the encoded image from img url
export async function encodeImg(
  imgUrl: string,
  secretInfo: string,
  stegMethod: string = "lsb",
): Promise<string | undefined> {
  try {
    const img = await loadImg(imgUrl);
    const containerImgCanvas = document.createElement('canvas');
    const containerCanvascxt = containerImgCanvas.getContext('2d');
    containerImgCanvas.width = img.width;
    containerImgCanvas.height = img.height;
    containerCanvascxt.drawImage(img, 0, 0);
    const containerImgData = containerCanvascxt.getImageData(0, 0, img.width, img.height);

    const containerImgBitmap = Array.from(containerImgData.data);
    const encodedImgBitmap = Uint8ClampedArray.from(writeLSB(containerImgBitmap, secretInfo));
    const encodedImgData = new ImageData(encodedImgBitmap, containerImgCanvas.width, containerImgCanvas.height);

    containerCanvascxt.putImageData(encodedImgData, 0, 0);
    const encImgURL: string = containerImgCanvas.toDataURL('image/png');
    return encImgURL;
  } catch (err) {
    // console.error(err);
    return;
  }
}
