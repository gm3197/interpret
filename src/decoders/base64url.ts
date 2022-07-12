import { Decoder } from "../decoder"
import { base64ToArrayBuffer, base64urlToBase64 } from "../lib"

export default {
  name: "Base64url",
  rfc: 4648,
  inputType: "text",
  outputType: "bytes",
  f: (text: string) => {
    if (/^(?:[A-Za-z0-9\-\_]{4})*(?:[A-Za-z0-9\-\_]{2}(?:==)?|[A-Za-z0-9\-\_]{3}(?:=)?)?$/g.test(text)) {
      return [base64ToArrayBuffer(base64urlToBase64(text)), null]
    } else {
      return [null, null]
    }
  }
} as Decoder
