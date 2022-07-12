import asciiDecoder from "./decoders/ascii"
import base64Decoder from "./decoders/base64"
import base64urlDecoder from "./decoders/base64url"
import hexDecoder from "./decoders/hex"
import jsonDecoder from "./decoders/json"
import jwtDecoder from "./decoders/jwt"
import asn1Decoder from "./decoders/asn1"
import x509Decoder from "./decoders/x509"
import csrDecoder from "./decoders/csr"
import pemDecoder from "./decoders/pem"
import cmsDecoder from "./decoders/cms"
import uriencodingDecoder from "./decoders/uriencoding"
import cborDecoder from "./decoders/cbor"
import plistDecoder from "./decoders/plist"

import { SvelteComponentDev } from "svelte"

export type Decoder = {
  name: string
  fullName?: string
  rfc?: number
  inputType: string
  outputType: string
  display?: SvelteComponentDev
  f: (input: any) => [any | null, any | null]
}

export type DecodedValue = {
  decoder?: Decoder
  type: string
  displayProps?: any
  value: any
}

let decoders: Decoder[] = [
  hexDecoder,
  base64Decoder,
  base64urlDecoder,
  jsonDecoder,
  jwtDecoder,
  asn1Decoder,
  x509Decoder,
  csrDecoder,
  cmsDecoder,
  pemDecoder,
  cborDecoder,
  plistDecoder,
  uriencodingDecoder,
  asciiDecoder,
]

export const registerDecoder = (decoder: Decoder) => {
  decoders.push(decoder)
}

export const decodeRoot = (type: string, data: any): DecodedValue[] => {
  let results = decode([{
    type,
    value: data
  }])
  return results.slice(1, results.length)
}

const decode = (previousDecodings: DecodedValue[]): DecodedValue[] => {
  let lastDecoding = previousDecodings[previousDecodings.length-1]
  let type = lastDecoding.type
  let data = lastDecoding.value

  let appropriateDecoders = decoders.filter((d) => d.inputType == type)
  for (var i = 0; i < appropriateDecoders.length; i++) {
    let decoder = appropriateDecoders[i]
    let [r, displayProps] = decoder.f(data)
    if (r) {
      return decode(previousDecodings.concat([{
        decoder,
        type: decoder.outputType,
        displayProps,
        value: r,
      }]))
    }
  }
  return previousDecodings
}
