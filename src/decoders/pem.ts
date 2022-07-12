import { Decoder } from "../decoder"
import { base64ToArrayBuffer } from "../lib"

const pemRegex = /-----BEGIN (.*?)-----\n?((?:(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}(?:==)?|[A-Za-z0-9+/]{3}(?:=)?)?\n?)+)\n?-----END (.*?)-----[\n\r]*/

export default {
  name: "PEM",
  fullName: "Privacy-Enhanced Mail",
  rfc: 7468,
  inputType: "text",
  outputType: "bytes",
  f: (text: string) => {
    pemRegex.lastIndex = 0
    let r = text.match(pemRegex)
    if (r && r.length == 4) {
      return [base64ToArrayBuffer(r[2].replace(/\n/g,"")), null]
    } else {
      return [null, null]
    }
  }
} as Decoder
