import { Decoder } from "../decoder"
import { base64ToArrayBuffer, base64urlToBase64 } from "../lib"

export default {
  name: "URI Encoding",
  rfc: 3986,
  inputType: "text",
  outputType: "text",
  f: (text: string) => {
    try {
      let decoded = decodeURIComponent(text)
      if (decoded != text) {
        return [decoded, null]
      } else {
        return [null, null]
      }
    } catch {
      return [null, null]
    }
  }
} as Decoder
