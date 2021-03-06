<h1 align="center">
<b>@antv/vis-steg</b>
</h1>

<div align="center">
Visualization Steganography: conceal information within visualization images.
</div>

## ✨ Features

- **Information Encoding and Decoding**: A javascript library for embedding information within visualization images.
  The decoding algorithm just relys on the encoded image.
- **String and Bits Array Transformation**: Converting a string to a bits array and vice versa using UTF8 encoding and decoding.

- **QR Code for Error Correction**: Add QR code as error correction code before encoding and after decoding.

## 📦 Installation

```bash
$ npm install
```

## 🔨 Getting Started

**Basic use**

- Information Encoding

```ts
import { LSBSteg } from './src';

const testLSBSteg = new LSBSteg();
const secretInfo = 'hello';
testLSBSteg.writeLSB({
  imgBitmapData: imgBitmapData,
  imgHeight: img.height,
  imgWidth: img.width,
  secretInfo,
});
```

- Information Decoding

```ts
import { LSBSteg } from './src';

const testLSBSteg = new LSBSteg();
const decodeSecret = testLSBSteg.readLSB({
  imgBitmapData: imgBitmapData,
  imgHeight: img.height,
  imgWidth: img.width,
});
```

**with QR Code ECC**

- Information Encoding

```ts
import { LSBSteg } from './src';

const testLSBSteg = new LSBSteg();
const secretInfo = 'hello';
testLSBSteg.writeLSB({
  imgBitmapData: imgBitmapData,
  imgHeight: img.height,
  imgWidth: img.width,
  secretInfo,
  encMode: 'QRcode',
  QRSize: 200,
  mxMsgLen: 130
});
```

- Information Decoding

```ts
import { LSBSteg } from './src';

const testLSBSteg = new LSBSteg();
const decodeSecret = testLSBSteg.readLSB({
  imgBitmapData: imgBitmapData,
  imgHeight: img.height,
  imgWidth: img.width,
  decMode: 'QRcode'
});
```

## :cookie: Demo
```bash
$ npm run start:demo
```

> Try the online [demo](https://antv.vision/vis-steg/) :point_left:
> 
> - [Pipeline](https://gw.alipayobjects.com/zos/antfincdn/QqZ19SeFwS/pipeline.gif)
> - [Vis-Image Transformation](https://gw.alipayobjects.com/zos/antfincdn/Wv%24IIck0F%24/vis-img-transfer.gif)

## :link: Links
- [API Reference](./docs/api/readme.md)
## :seedling: Supported Algorithms

- LSB: Least Significant Bit method for image steganography. The binary bits of the secret information was used to replace the bits of container image pixels. The replacing occurs from the least bit to the highest bit to retain the quality of container image.

  > ### LSB Encode Process
  >
  > - ### Input
  >
  > ```
  > - RGB (or gray) Image
  > - Secret String
  > - Encode Mode
  > - Options
  > ```
  >
  > - ### Process
  >
  > 1.  Adjust RGB (or gray) image to RGBA form.
  > 2.  Add a head string for further check.
  > 3.  Convert the head string, secret string length and secret string to bits array, and merge them together.
  > 4.  Embed the bits array into the container image. The replacing is from the least bit to the highest bit.

  > ### LSB Decode Process
  >
  > - ### Input
  >
  > ```
  > - RGBA Image
  > - Decode Mode
  > ```
  >
  > - ### Process
  >
  > 1.  Read the head string for decoding check.
  > 2.  Read the secret string length (64 bits).
  > 3.  Read the secret string bits array and convert it to string.

## License

MIT
