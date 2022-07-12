<script lang="ts">
  import { DecodedResult } from "../../decoder";
  import Code from "../Code.svelte";

  export let result: DecodedResult;
</script>

<div class="json">
  <div>
    <p>Original</p>
    <Code string={JSON.stringify(result.value)} />
  </div>
  <div>
    <p>Beautified</p>
    <Code string={JSON.stringify(result.value, null, 4)} />
  </div>
</div>

<style>
  div.json {
    display: flex;
    gap: 8px;
  }

  div.json > div {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  p {
    font-size: 1rem;
    margin-bottom: 4px;
  }
</style>
