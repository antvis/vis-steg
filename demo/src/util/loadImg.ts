// Load a image in a promise
export function loadImg(url: string | undefined): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (url === undefined)
      reject(new Error('Image is undefined'));
    else {
      img.addEventListener('load', () => {
        resolve(img);
      });
      img.addEventListener('error', () => {
        reject(new Error(`Failed to load image URL: ${url}`));
      });
      img.crossOrigin = 'anonymous';
      img.src = url;
    }
  });
}
