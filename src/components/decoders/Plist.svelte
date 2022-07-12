<script lang="ts">
  import { DecodedResult } from "../../decoder";
  import Code from "../Code.svelte";

  export let result: DecodedResult;
</script>

<p>Plist properties displayed as JSON object</p>
<Code string={JSON.stringify(result.value, null, 4)} />

<style>
  p {
    font-size: 1rem;
    margin-bottom: 4px;
  }
</style>
