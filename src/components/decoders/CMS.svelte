<script lang="ts">
  import { DecodedResult } from "../../decoder";
  import { SignedData } from "pkijs";

  export let result: DecodedResult;
  $: signedData = result.displayProps as SignedData;
  let signatureValid = false;

  $: {
    signedData
      .verify({
        signer: 0,
        checkChain: false,
      })
      .then((valid) => {
        signatureValid = valid;
      })
      .catch(() => {
        signatureValid = false;
      });
  }
</script>

<h2>Details</h2>
<p>Signature valid: {signatureValid ? "Yes" : "No"}</p>
