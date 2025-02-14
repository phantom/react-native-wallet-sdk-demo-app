import "react-native-get-random-values";
import { Buffer } from "buffer";

Buffer.prototype.subarray = function subarray(start: number, end: number) {
  const newBuf = Uint8Array.prototype.subarray.call(this, start, end);
  Object.setPrototypeOf(newBuf, Buffer.prototype);

  return newBuf;
};

global.Buffer = global.Buffer || Buffer;
