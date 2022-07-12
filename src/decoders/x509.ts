import { Decoder } from "../decoder"
import { AsnType } from "asn1js"
import { Certificate } from "pkijs"
import X509 from "../components/decoders/X509.svelte"

export default {
  name: "X.509",
  fullName: "Public Key Certificate",
  rfc: 5280,
  inputType: "asn1",
  outputType: "x509",
  display: X509,
  f: (asn1: AsnType) => {
    try {
      let cert = new Certificate({ schema: asn1 })
      return [cert, null]
    } catch {
      return [null, null]
    }
  }
} as Decoder

export const oids: {
  [key: string]: string
} = {}

const addOid = (id: string, name: string) => {
  oids[id] = name
  oids[name] = id
}

// algorithm OIDs
addOid('1.2.840.113549.1.1.1', 'rsaEncryption');
// Note: md2 & md4 not implemented
//addOid('1.2.840.113549.1.1.2', 'md2WithRSAEncryption');
//addOid('1.2.840.113549.1.1.3', 'md4WithRSAEncryption');
addOid('1.2.840.113549.1.1.4', 'md5WithRSAEncryption');
addOid('1.2.840.113549.1.1.5', 'sha1WithRSAEncryption');
addOid('1.2.840.113549.1.1.7', 'RSAES-OAEP');
addOid('1.2.840.113549.1.1.8', 'mgf1');
addOid('1.2.840.113549.1.1.9', 'pSpecified');
addOid('1.2.840.113549.1.1.10', 'RSASSA-PSS');
addOid('1.2.840.113549.1.1.11', 'sha256WithRSAEncryption');
addOid('1.2.840.113549.1.1.12', 'sha384WithRSAEncryption');
addOid('1.2.840.113549.1.1.13', 'sha512WithRSAEncryption');
// Edwards-curve Digital Signature Algorithm (EdDSA) Ed25519
addOid('1.3.101.112', 'EdDSA25519');
addOid('1.2.840.10045.2.1', "ECDSA")

addOid('1.2.840.10040.4.3', 'dsa-with-sha1');

addOid('1.3.14.3.2.7', 'desCBC');

addOid('1.3.14.3.2.26', 'sha1');
// Deprecated equivalent of sha1WithRSAEncryption
addOid('1.3.14.3.2.29', 'sha1WithRSASignature');
addOid('2.16.840.1.101.3.4.2.1', 'sha256');
addOid('2.16.840.1.101.3.4.2.2', 'sha384');
addOid('2.16.840.1.101.3.4.2.3', 'sha512');
addOid('2.16.840.1.101.3.4.2.4', 'sha224');
addOid('2.16.840.1.101.3.4.2.5', 'sha512-224');
addOid('2.16.840.1.101.3.4.2.6', 'sha512-256');
addOid('1.2.840.113549.2.2', 'md2');
addOid('1.2.840.113549.2.5', 'md5');

// pkcs#7 content types
addOid('1.2.840.113549.1.7.1', 'data');
addOid('1.2.840.113549.1.7.2', 'signedData');
addOid('1.2.840.113549.1.7.3', 'envelopedData');
addOid('1.2.840.113549.1.7.4', 'signedAndEnvelopedData');
addOid('1.2.840.113549.1.7.5', 'digestedData');
addOid('1.2.840.113549.1.7.6', 'encryptedData');

// pkcs#9 oids
addOid('1.2.840.113549.1.9.1', 'emailAddress');
addOid('1.2.840.113549.1.9.2', 'unstructuredName');
addOid('1.2.840.113549.1.9.3', 'contentType');
addOid('1.2.840.113549.1.9.4', 'messageDigest');
addOid('1.2.840.113549.1.9.5', 'signingTime');
addOid('1.2.840.113549.1.9.6', 'counterSignature');
addOid('1.2.840.113549.1.9.7', 'challengePassword');
addOid('1.2.840.113549.1.9.8', 'unstructuredAddress');
addOid('1.2.840.113549.1.9.14', 'extensionRequest');
addOid('0.9.2342.19200300.100.1.1', 'userId') // rfc4519

addOid('1.2.840.113549.1.9.20', 'friendlyName');
addOid('1.2.840.113549.1.9.21', 'localKeyId');
addOid('1.2.840.113549.1.9.22.1', 'x509Certificate');

// pkcs#12 safe bags
addOid('1.2.840.113549.1.12.10.1.1', 'keyBag');
addOid('1.2.840.113549.1.12.10.1.2', 'pkcs8ShroudedKeyBag');
addOid('1.2.840.113549.1.12.10.1.3', 'certBag');
addOid('1.2.840.113549.1.12.10.1.4', 'crlBag');
addOid('1.2.840.113549.1.12.10.1.5', 'secretBag');
addOid('1.2.840.113549.1.12.10.1.6', 'safeContentsBag');

// password-based-encryption for pkcs#12
addOid('1.2.840.113549.1.5.13', 'pkcs5PBES2');
addOid('1.2.840.113549.1.5.12', 'pkcs5PBKDF2');

addOid('1.2.840.113549.1.12.1.1', 'pbeWithSHAAnd128BitRC4');
addOid('1.2.840.113549.1.12.1.2', 'pbeWithSHAAnd40BitRC4');
addOid('1.2.840.113549.1.12.1.3', 'pbeWithSHAAnd3-KeyTripleDES-CBC');
addOid('1.2.840.113549.1.12.1.4', 'pbeWithSHAAnd2-KeyTripleDES-CBC');
addOid('1.2.840.113549.1.12.1.5', 'pbeWithSHAAnd128BitRC2-CBC');
addOid('1.2.840.113549.1.12.1.6', 'pbewithSHAAnd40BitRC2-CBC');

// hmac OIDs
addOid('1.2.840.113549.2.7', 'hmacWithSHA1');
addOid('1.2.840.113549.2.8', 'hmacWithSHA224');
addOid('1.2.840.113549.2.9', 'hmacWithSHA256');
addOid('1.2.840.113549.2.10', 'hmacWithSHA384');
addOid('1.2.840.113549.2.11', 'hmacWithSHA512');

// symmetric key algorithm oids
addOid('1.2.840.113549.3.7', 'des-EDE3-CBC');
addOid('2.16.840.1.101.3.4.1.2', 'aes128-CBC');
addOid('2.16.840.1.101.3.4.1.22', 'aes192-CBC');
addOid('2.16.840.1.101.3.4.1.42', 'aes256-CBC');

// certificate issuer/subject OIDs
addOid('2.5.4.3', 'commonName');
addOid('2.5.4.4', 'surname');
addOid('2.5.4.5', 'serialNumber');
addOid('2.5.4.6', 'countryName');
addOid('2.5.4.7', 'localityName');
addOid('2.5.4.8', 'stateOrProvinceName');
addOid('2.5.4.9', 'streetAddress');
addOid('2.5.4.10', 'organizationName');
addOid('2.5.4.11', 'organizationalUnitName');
addOid('2.5.4.12', 'title');
addOid('2.5.4.13', 'description');
addOid('2.5.4.15', 'businessCategory');
addOid('2.5.4.17', 'postalCode');
addOid('2.5.4.42', 'givenName');
addOid('1.3.6.1.4.1.311.60.2.1.2', 'jurisdictionOfIncorporationStateOrProvinceName');
addOid('1.3.6.1.4.1.311.60.2.1.3', 'jurisdictionOfIncorporationCountryName');

// X.509 extension OIDs
addOid('2.16.840.1.113730.1.1', 'nsCertType');
addOid('2.16.840.1.113730.1.13', 'nsComment'); // deprecated in theory; still widely used
addOid('2.5.29.1', 'authorityKeyIdentifier'); // deprecated, use .35
addOid('2.5.29.2', 'keyAttributes'); // obsolete use .37 or .15
addOid('2.5.29.3', 'certificatePolicies'); // deprecated, use .32
addOid('2.5.29.4', 'keyUsageRestriction'); // obsolete use .37 or .15
addOid('2.5.29.5', 'policyMapping'); // deprecated use .33
addOid('2.5.29.6', 'subtreesConstraint'); // obsolete use .30
addOid('2.5.29.7', 'subjectAltName'); // deprecated use .17
addOid('2.5.29.8', 'issuerAltName'); // deprecated use .18
addOid('2.5.29.9', 'subjectDirectoryAttributes');
addOid('2.5.29.10', 'basicConstraints'); // deprecated use .19
addOid('2.5.29.11', 'nameConstraints'); // deprecated use .30
addOid('2.5.29.12', 'policyConstraints'); // deprecated use .36
addOid('2.5.29.13', 'basicConstraints'); // deprecated use .19
addOid('2.5.29.14', 'subjectKeyIdentifier');
addOid('2.5.29.15', 'keyUsage');
addOid('2.5.29.16', 'privateKeyUsagePeriod');
addOid('2.5.29.17', 'subjectAltName');
addOid('2.5.29.18', 'issuerAltName');
addOid('2.5.29.19', 'basicConstraints');
addOid('2.5.29.20', 'cRLNumber');
addOid('2.5.29.21', 'cRLReason');
addOid('2.5.29.22', 'expirationDate');
addOid('2.5.29.23', 'instructionCode');
addOid('2.5.29.24', 'invalidityDate');
addOid('2.5.29.25', 'cRLDistributionPoints'); // deprecated use .31
addOid('2.5.29.26', 'issuingDistributionPoint'); // deprecated use .28
addOid('2.5.29.27', 'deltaCRLIndicator');
addOid('2.5.29.28', 'issuingDistributionPoint');
addOid('2.5.29.29', 'certificateIssuer');
addOid('2.5.29.30', 'nameConstraints');
addOid('2.5.29.31', 'cRLDistributionPoints');
addOid('2.5.29.32', 'certificatePolicies');
addOid('2.5.29.33', 'policyMappings');
addOid('2.5.29.34', 'policyConstraints'); // deprecated use .36
addOid('2.5.29.35', 'authorityKeyIdentifier');
addOid('2.5.29.36', 'policyConstraints');
addOid('2.5.29.37', 'extKeyUsage');
addOid('2.5.29.46', 'freshestCRL');
addOid('2.5.29.54', 'inhibitAnyPolicy');

// extKeyUsage purposes
addOid('1.3.6.1.4.1.11129.2.4.2', 'timestampList');
addOid('1.3.6.1.5.5.7.1.1', 'authorityInfoAccess');
addOid('1.3.6.1.5.5.7.3.1', 'serverAuth');
addOid('1.3.6.1.5.5.7.3.2', 'clientAuth');
addOid('1.3.6.1.5.5.7.3.3', 'codeSigning');
addOid('1.3.6.1.5.5.7.3.4', 'emailProtection');
addOid('1.3.6.1.5.5.7.3.8', 'timeStamping');
