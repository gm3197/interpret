import { Decoder } from "../decoder"
import { decodeFirstSync } from "cbor-web"
import CBOR from "../components/decoders/CBOR.svelte"

export default {
  name: "CBOR",
  fullName: "Concise Binary Object Representation",
  rfc: 8949,
  inputType: "bytes",
  outputType: "cbor",
  display: CBOR,
  f: (bytes: ArrayBuffer) => {
    try {
      let cbor = decodeFirstSync(bytes)
      return [cbor, null]
    } catch {
      return [null, null]
    }
  }
} as Decoder
