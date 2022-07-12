import { Decoder } from "../decoder"
import Ascii from "../components/decoders/Ascii.svelte"

export default {
  name: "Ascii",
  fullName: "American Standard Code for Information Interchange",
  rfc: 20,
  inputType: "bytes",
  outputType: "text",
  display: Ascii,
  f: (bytes: ArrayBuffer) => {
    let byteArray = new Uint8Array(bytes)
    let outStr = ""
    for (var i = 0; i < byteArray.length; i++) {
      let b = byteArray[i]
      if (b >= 0 && b <= 255) {
        outStr += String.fromCharCode(b)
      } else {
        return [null, null]
      }
    }
    return [outStr, null]
  }
} as Decoder
