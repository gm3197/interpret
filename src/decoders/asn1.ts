import { Decoder } from "../decoder"
import { fromBER } from "asn1js"
import Asn1 from "../components/decoders/Asn1.svelte"

export default {
  name: "ASN.1",
  fullName: "Abstract Syntax Notation One",
  rfc: 3641,
  inputType: "bytes",
  outputType: "asn1",
  display: Asn1,
  f: (bytes: ArrayBuffer) => {
    try {
      let asn1 = fromBER(bytes)
      if (asn1.result.error) {
        return [null, null]
      } else {
        return [asn1.result, null]
      }
    } catch {
      return [null, null]
    }
  }
} as Decoder
