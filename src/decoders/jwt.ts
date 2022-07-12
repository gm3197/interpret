import { Decoder } from "../decoder"
import { base64urlToBase64 } from "../lib"
import Jwt from "../components/decoders/JWT.svelte"

export type JWT = {
  raw: string
  header: any
  payload: any
}

export default {
  name: "JWT",
  fullName: "JSON Web Token",
  rfc: 7519,
  inputType: "text",
  outputType: "jwt",
  display: Jwt,
  f: (text: string) => {
    try {
      let parts = text.split(".")
      if (parts.length != 3) {
        return [null, null]
      }
      let header = JSON.parse(window.atob(base64urlToBase64(parts[0])))
      let payload = JSON.parse(window.atob(base64urlToBase64(parts[1])))
      return [{
        raw: text,
        header,
        payload
      } as JWT, null]
    } catch {
      return [null, null]
    }
  }
} as Decoder
