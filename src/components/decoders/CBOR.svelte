<script lang="ts">
  import { DecodedResult } from "../../decoder";
  import { arrayBufferToHex } from "../../lib";

  export let result: DecodedResult;
  $: cborObj = Object.fromEntries(result.value);
</script>

<table class="properties">
  <tr class="section-header">
    <td>Key/Value Pairs</td>
    <div class="line" /></tr
  >
  {#each Object.keys(cborObj) as key}
    <tr>
      <th>{key}</th>
      <td
        class={typeof cborObj[key] == "object" && cborObj[key].buffer
          ? "bytes"
          : ""}
        >{#if typeof cborObj[key] == "object" && cborObj[key].buffer}{arrayBufferToHex(
            cborObj[key].buffer
          )}{:else}{cborObj[key]}{/if}</td
      >
    </tr>
  {/each}
</table>

<style>
</style>
