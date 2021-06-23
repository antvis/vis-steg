import { LSBSteg } from "../src";

describe("test", () => {
  it("enc and dec should work", () => {
    const imgArrayLength = 64 * 128 * 4;
    const testImgArray = new Array(imgArrayLength);
    for (let i = 0; i < imgArrayLength; i += 1) {
      testImgArray[i] = Math.floor(Math.random() * 256);
    }
    // eslint-disable-next-line 
    const acceptCharacter = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ', '·', ',', '.', ':', ';', '+', '-', '*', '/', '\\', '~', '!', '@', '#', '$', '%', '^', '&', '`', "'", '=', '<', '>', '[', ']', '(', ')', '?', '_', '{', '}', '|'];
    const secretArrayLength = 20;
    const testSecretArray = new Array(secretArrayLength);
    for (let i = 0; i < secretArrayLength; i += 1) {
      testSecretArray[i] = acceptCharacter[Math.floor(Math.random() * acceptCharacter.length)];
    }

    const testSecretString = testSecretArray.join("");
    const testLSBSteg = new LSBSteg();
    const encodedImg = testLSBSteg.writeLSB({ imgBitmapData: testImgArray, secretInfo: testSecretString });
    const decodedSecrets = testLSBSteg.readLSB({ imgBitmapData: encodedImg });
    expect(decodedSecrets).toBe(testSecretString);
  });
});
