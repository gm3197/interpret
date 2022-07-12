import { Decoder } from "../decoder"
import { hexToArrayBuffer } from "../lib"

export default {
  name: "Hex",
  fullName: "Hexadecimal / Base16",
  rfc: 3548,
  inputType: "text",
  outputType: "bytes",
  f: (text: string) => {
    if (/^([0-9a-f][0-9a-f] ?)+$/gi.test(text)) {
      return [hexToArrayBuffer(text.replace(/\s/g, "")), null]
    } else {
      return [null, null]
    }
  }
} as Decoder
