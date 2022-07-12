import { Decoder } from "../decoder"
import { AsnType } from "asn1js"
import { CertificationRequest } from "pkijs"
import CSR from "../components/decoders/CSR.svelte"

export default {
  name: "PKCS #10",
  fullName: "Certification Signing Request",
  rfc: 2986,
  inputType: "asn1",
  outputType: "csr",
  display: CSR,
  f: (asn1: AsnType) => {
    try {
      let cert = new CertificationRequest({ schema: asn1 })
      return [cert, null]
    } catch {
      return [null, null]
    }
  }
} as Decoder
