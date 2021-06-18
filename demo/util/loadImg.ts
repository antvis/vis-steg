// Load a image in a promise
export function loadImg(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => {
      resolve(img);
    });
    img.addEventListener("error", () => {
      reject(new Error(`Failed to load image URL: ${url}`));
    });
    img.crossOrigin = "anonymous";
    img.src = url;
  });
}
