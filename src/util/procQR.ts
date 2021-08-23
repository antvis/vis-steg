import { createCanvas } from 'canvas';
import QRCode from 'qrcode';
import Pica from 'pica';
import jsQR from 'jsqr';

export interface DecSecInfo {
  decodedString: string;
  QRUrl: string;
}

export async function generateSingleQRbits(msg: string, QRSize: number = 200): Promise<string> {
  let QRcanvas: any;
  if (typeof window === 'undefined') {
    // run in node env (for jest)
    QRcanvas = await QRCode.toCanvas(createCanvas(QRSize, QRSize), `${msg}`, { errorCorrectionLevel: 'H' });
  }
  else {
    QRcanvas = await QRCode.toCanvas(`${msg}`, { errorCorrectionLevel: 'H' });
  }
  const offScreenCanvas = document.createElement('canvas');
  offScreenCanvas.width = QRSize;
  offScreenCanvas.height = QRSize;
  const picaResizer = new Pica();
  await picaResizer.resize(QRcanvas, offScreenCanvas,
    {
      unsharpAmount: 160,
      unsharpRadius: 0.6,
      unsharpThreshold: 1
    });

  const offCanvascxt = offScreenCanvas.getContext('2d');
  const QRImgData = offCanvascxt.getImageData(0, 0, QRSize, QRSize);
  const QRImgDataPixArr = Array.from(QRImgData.data);
  let QRbits = '';
  for (let i = 0; i < QRImgDataPixArr.length; i += 4) {
    if (QRImgDataPixArr[i] <= 255 && QRImgDataPixArr[i] >= 128) {
      QRbits += '0';
    }
    else {
      QRbits += '1';
    }
  }
  return QRbits;
}

// seperate messages to several QRcodes
export async function generateQRbits(msg: string, QRSize: number = 200, mxMsgLen: number = 150, headStr: string = 'enc$'): Promise<string> {
  let mergeQRbits = '';
  const numQR = Math.ceil(msg.length / mxMsgLen);
  if (numQR >= 1) {
    const encInfo = { headStr, numQR, QRSize, mxMsgLen };
    mergeQRbits += await generateSingleQRbits(JSON.stringify(encInfo), 200);
    for (let i = 0; i < numQR; i += 1) {
      const tmpMsg = msg.slice(i * mxMsgLen, Math.min((i + 1) * mxMsgLen, msg.length));
      // eslint-disable-next-line no-await-in-loop
      mergeQRbits += await generateSingleQRbits(tmpMsg, QRSize);
    }
  }
  return mergeQRbits;
}

export async function generateQRbase64(msg: string, QRSize: number = 200): Promise<string> {
  const QRcanvas = await QRCode.toCanvas(`${msg}`, { errorCorrectionLevel: 'H' });
  const offScreenCanvas = document.createElement('canvas');
  offScreenCanvas.width = QRSize;
  offScreenCanvas.height = QRSize;
  const picaResizer = new Pica();
  await picaResizer.resize(QRcanvas, offScreenCanvas,
    {
      unsharpAmount: 160,
      unsharpRadius: 0.6,
      unsharpThreshold: 1
    });

  return offScreenCanvas.toDataURL('image/png');
}

export function decodeQR(QRImgData: Uint8ClampedArray, QRSize: number = 200): string {
  const QRcode = jsQR(QRImgData, QRSize, QRSize, { inversionAttempts: 'dontInvert' });
  if (QRcode) {
    console.log('Found QR code: ', QRcode);
    return QRcode.data;
  }
  return '';
}

// decode a QRcode from bits string
export function bits2QR(QRbits: string, QRSize: number = 200): string {
  const offScreenCanvas = document.createElement('canvas');
  offScreenCanvas.width = QRSize;
  offScreenCanvas.height = QRSize;
  // const offCanvascxt = offScreenCanvas.getContext('2d');
  const QRImgDataPixArr = [];
  for (let i = 0; i < QRbits.length; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (QRbits[i] === '0') {
        QRImgDataPixArr.push(255);
      }
      else {
        QRImgDataPixArr.push(0);
      }
    }
    QRImgDataPixArr.push(255);
  }
  const QRImgDataPixArrUint8 = Uint8ClampedArray.from(QRImgDataPixArr);
  const QRcode = jsQR(QRImgDataPixArrUint8, QRSize, QRSize, { inversionAttempts: 'dontInvert' });
  if (QRcode) {
    // const QRImgData = new ImageData(QRImgDataPixArrUint8, offScreenCanvas.width, offScreenCanvas.width);
    // offCanvascxt.putImageData(QRImgData, 0, 0);
    return QRcode.data;
  }
  throw new Error('Failed to decode the secret!');
}
