import { enc } from "../src";

describe("test", () => {
  it("enc should work", () => {
    expect(enc()).toBe("hello");
  });
});
