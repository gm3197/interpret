import { Decoder } from "../decoder"
import { parse } from "../lib/plist"
import Plist from "../components/decoders/Plist.svelte"

export default {
  name: "PLIST",
  fullName: "Apple Property List",
  inputType: "text",
  outputType: "json",
  display: Plist,
  f: (text: string) => {
    try {
      return [parse(text), null]
    } catch (err) {
      console.log(err)
      return [null, null]
    }
  }
} as Decoder
