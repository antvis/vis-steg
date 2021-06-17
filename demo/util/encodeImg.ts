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
    let containerImgCanvas = document.createElement('canvas');
    let containerCanvascxt = containerImgCanvas.getContext('2d');
    containerImgCanvas.width = img.width;
    containerImgCanvas.height = img.height;
    containerCanvascxt.drawImage(img, 0, 0);
    let containerImgData = containerCanvascxt.getImageData(0, 0, img.width, img.height);
    // console.log(encodedImgData.height + ' ' + encodedImgData.width);

    let containerImgBitmap = Array.from(containerImgData.data);
    let encodedImgBitmap = Uint8ClampedArray.from(writeLSB(containerImgBitmap, secretInfo));
    let encodedImgData = new ImageData(encodedImgBitmap, containerImgCanvas.width, containerImgCanvas.height);

    containerCanvascxt.putImageData(encodedImgData, 0, 0);
    let encImgURL: string = containerImgCanvas.toDataURL('image/png');
    return encImgURL;
  } catch (err) {
    console.error(err);
    return;
  }
}
