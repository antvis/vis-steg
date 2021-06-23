/* UTF8 encode and decode from http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html */
export function utf8Decode(bytes: number[]): string {
  const chars = [];
  let offset = 0;
  let c;
  let c2;
  let c3;

  while (offset < bytes.length) {
    c = bytes[offset];
    c2 = bytes[offset + 1];
    c3 = bytes[offset + 2];
    if (c < 128) {
      chars.push(String.fromCharCode(c));
      offset += 1;
    } else if (c > 191 && c < 224) {
      // eslint-disable-next-line no-bitwise
      chars.push(String.fromCharCode(((c & 31) << 6) | (c2 & 63)));
      offset += 2;
    } else {
      // eslint-disable-next-line no-bitwise
      chars.push(String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)));
      offset += 3;
    }
  }
  return chars.join("");
}

export function utf8Encode(str: string): number[] {
  const bytes = [];
  let offset = 0;
  const encodeStr = encodeURI(str);

  while (offset < encodeStr.length) {
    let char = encodeStr[offset];
    offset += 1;

    if (char !== "%") {
      bytes.push(char.charCodeAt(0));
    } else {
      char = encodeStr[offset] + encodeStr[offset + 1];
      bytes.push(parseInt(char, 16));
      offset += 2;
    }
  }
  return bytes;
}
