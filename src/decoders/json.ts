import { Decoder } from "../decoder"
import Json from "../components/decoders/JSON.svelte"

export default {
  name: "JSON",
  fullName: "JavaScript Object Notation",
  rfc: 7159,
  inputType: "text",
  outputType: "json",
  display: Json,
  f: (text: string) => {
    try {
      return [JSON.parse(text), null]
    } catch {
      return [null, null]
    }
  }
} as Decoder
