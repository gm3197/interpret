import { Decoder } from "../decoder"
import { base64ToArrayBuffer } from "../lib"

export default {
  name: "Base64",
  rfc: 3548,
  inputType: "text",
  outputType: "bytes",
  f: (text: string) => {
    if (/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}(?:==)?|[A-Za-z0-9+/]{3}(?:=)?)?$/g.test(text)) {
      return [base64ToArrayBuffer(text), null]
    } else {
      return [null, null]
    }
  }
} as Decoder
