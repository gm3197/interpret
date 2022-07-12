<script lang="ts">
  import { DecodedResult } from "../../decoder";

  export let result: DecodedResult;
  let outputWithLinks: string = "";
  $: {
    outputWithLinks = result.value
      .toString()
      .replace(
        /OBJECT IDENTIFIER : (\d(?:\.\d+)+)/g,
        `OBJECT IDENTIFIER : <a href="https://oid-rep.orange-labs.fr/get/$1" target="_blank" style="font-family:monospace;">$1</a>`
      );
  }
</script>

<div>
  {@html outputWithLinks}
</div>

<style>
  div {
    background: var(--secondaryBackgroundColor);
    padding: 6px;
    border-radius: var(--radius);
    font-family: monospace;
    white-space: pre-wrap;
    word-wrap: anywhere;
  }
</style>
