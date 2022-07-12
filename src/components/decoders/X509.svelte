<script lang="ts">
  import { DecodedResult } from "../../decoder";
  import { Certificate } from "pkijs";
  import { oids } from "../../decoders/x509";
  import { camelCaseToString, arrayBufferToHex } from "../../lib";

  export let result: DecodedResult;
  $: certificate = result.value as Certificate;
</script>

<h2>Details</h2>
<table class="properties">
  <tbody>
    <tr class="section-header">
      <td>Subject</td>
      <div class="line" /></tr
    >
    {#each certificate.subject.typesAndValues as value}
      <tr>
        <th
          >{#if oids[value.type]}{camelCaseToString(oids[value.type])}{:else}<a
              href="https://oid-rep.orange-labs.fr/get/{value.type}"
              target="_blank">{value.type}</a
            >{/if}</th
        >
        <td>{value.value.valueBlock.value}</td>
      </tr>
    {/each}
  </tbody>
  <tbody>
    <tr class="section-header">
      <td>Issuer</td>
      <div class="line" /></tr
    >
    {#each certificate.issuer.typesAndValues as value}
      <tr>
        <th>{camelCaseToString(oids[value.type])}</th>
        <td>{value.value.valueBlock.value}</td>
      </tr>
    {/each}
  </tbody>
  <tbody>
    <tr class="section-header">
      <td>Details</td>
      <div class="line" />
    </tr>
    <tr>
      <th>Serial Number</th>
      <td
        >{arrayBufferToHex(
          certificate.serialNumber.valueBlock.valueHexView
        ).toUpperCase()}</td
      >
    </tr>
    <tr>
      <th>Issued</th>
      <td>{certificate.notBefore.value.toLocaleString()}</td>
    </tr>
    <tr>
      <th>Expires</th>
      <td>{certificate.notAfter.value.toLocaleString()}</td>
    </tr>
  </tbody>
  <tbody>
    <tr class="section-header">
      <td>Public Key</td>
      <div class="line" />
    </tr>
    <tr>
      <th>Algorithm</th>
      <td
        >{#if oids[certificate.subjectPublicKeyInfo.algorithm.algorithmId]}{camelCaseToString(
            oids[certificate.subjectPublicKeyInfo.algorithm.algorithmId]
          )}{:else}<a
            href="https://oid-rep.orange-labs.fr/get/{certificate
              .subjectPublicKeyInfo.algorithm.algorithmId}"
            target="_blank"
            >{certificate.subjectPublicKeyInfo.algorithm.algorithmId}</a
          >{/if}</td
      >
    </tr>
    <tr>
      <th>Public Key</th>
      <td class="bytes"
        >{arrayBufferToHex(
          certificate.subjectPublicKeyInfo.subjectPublicKey.valueBlock
            .valueHexView
        ).toUpperCase()}</td
      >
    </tr>
    <tr>
      <th>Signature</th>
      <td class="bytes"
        >{certificate.signatureValue.valueBlock.valueHexView.length} bytes: {arrayBufferToHex(
          certificate.signatureValue.valueBlock.valueHexView
        ).toUpperCase()}</td
      >
    </tr>
  </tbody>
</table>
