<script lang="ts">
  import { DecodedResult } from "../../decoder";
  import { CertificationRequest } from "pkijs";
  import { oids } from "../../decoders/x509";
  import { camelCaseToString, arrayBufferToHex } from "../../lib";

  export let result: DecodedResult;
  $: certificateRequest = result.value as CertificationRequest;
</script>

<h2>Details</h2>
<table class="properties">
  <tbody>
    <tr class="section-header">
      <td>Requested Subject</td>
      <div class="line" /></tr
    >
    {#each certificateRequest.subject.typesAndValues as value}
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
      <td>Public Key</td>
      <div class="line" />
    </tr>
    <tr>
      <th>Algorithm</th>
      <td
        >{#if oids[certificateRequest.subjectPublicKeyInfo.algorithm.algorithmId]}{camelCaseToString(
            oids[certificateRequest.subjectPublicKeyInfo.algorithm.algorithmId]
          )}{:else}<a
            href="https://oid-rep.orange-labs.fr/get/{certificateRequest
              .subjectPublicKeyInfo.algorithm.algorithmId}"
            target="_blank"
            >{certificateRequest.subjectPublicKeyInfo.algorithm.algorithmId}</a
          >{/if}</td
      >
    </tr>
    <tr>
      <th>Public Key</th>
      <td class="bytes"
        >{arrayBufferToHex(
          certificateRequest.subjectPublicKeyInfo.subjectPublicKey.valueBlock
            .valueHexView
        ).toUpperCase()}</td
      >
    </tr>
    <tr>
      <th>Signature</th>
      <td class="bytes"
        >{certificateRequest.signatureValue.valueBlock.valueHexView.length} bytes:
        {arrayBufferToHex(
          certificateRequest.signatureValue.valueBlock.valueHexView
        ).toUpperCase()}</td
      >
    </tr>
  </tbody>
</table>
