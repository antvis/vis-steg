import pkg from "../package.json";
export const version = pkg.version;

export * from "./stegLSB/readLSB";
export * from "./stegLSB/writeLSB";
