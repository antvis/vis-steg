import { readLSB, writeLSB } from "../src";

describe("test", () => {
  it("enc and dec should work", () => {
    let imgArrayLength = 64 * 128 * 4;
    let testImgArray = new Array(imgArrayLength);
    for (let i = 0; i < imgArrayLength; i++) {
      testImgArray[i] = Math.floor(Math.random() * 256);
    }
    let acceptCharacter = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ', '·', ',', '.', ':', ';', '+', '-', '*', '/', '\\', '~', '!', '@', '#', '$', '%', '^', '&', '`', "'", '=', '<', '>', '[', ']', '(', ')', '?', '_', '{', '}', '|'];
    let secretArrayLength = 20;
    let testSecretArray = new Array(secretArrayLength);
    for (let i = 0; i < secretArrayLength; i++) {
      testSecretArray[i] = acceptCharacter[Math.floor(Math.random() * acceptCharacter.length)];
    }

    let testSecretString = testSecretArray.join("");
    let encodedImg = writeLSB(testImgArray, testSecretString);
    let decodedSecrets = readLSB(encodedImg);
    console.log("testSecretString = " + testSecretString);
    console.log("decodedSecrets = " + decodedSecrets);
    expect(decodedSecrets).toBe(testSecretString);
  });
});
