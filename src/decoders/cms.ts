import { Decoder } from "../decoder"
import { AsnType } from "asn1js"
import { ContentInfo, SignedData } from "pkijs"
import CMS from "../components/decoders/CMS.svelte"

export default {
  name: "PKCS #7",
  fullName: "Cryptographic Message Syntax",
  rfc: 5652,
  inputType: "asn1",
  outputType: "bytes",
  display: CMS,
  f: (asn1: AsnType) => {
    try {
      let cms = new ContentInfo({ schema: asn1 })
      if (cms.contentType == ContentInfo.SIGNED_DATA) {
        let signedData = new SignedData({ schema: cms.content })
        return [signedData.encapContentInfo.eContent.getValue(), signedData]
      } else {
        return [null, null]
      }
    } catch (err) {
      return [null, null]
    }
  }
} as Decoder
