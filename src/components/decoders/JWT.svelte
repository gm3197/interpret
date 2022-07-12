<script lang="ts">
  import { DecodedResult } from "../../decoder";
  import Code from "../Code.svelte";

  export let result: DecodedResult;
</script>

<div class="jwt">
  <div>
    <p>Token</p>
    <div class="token">
      <span style:color="var(--tertiaryAccentColor)"
        >{result.value.raw.split(".")[0]}</span
      >.<span style:color="var(--secondaryAccentColor)"
        >{result.value.raw.split(".")[1]}</span
      >.{result.value.raw.split(".")[2]}
    </div>
  </div>
  <div>
    <p>Header</p>
    <Code
      string={JSON.stringify(result.value.header, null, 4)}
      fontColor="var(--tertiaryAccentColor)"
      height="100px"
    />
    <div class="spacer" />
    <p>Payload</p>
    <Code
      string={JSON.stringify(result.value.payload, null, 4)}
      fontColor="var(--secondaryAccentColor)"
      height="100px"
    />
  </div>
</div>

<style>
  div.jwt {
    display: flex;
    gap: 8px;
  }

  div.jwt > div {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    max-width: 50%;
  }

  p {
    font-size: 1rem;
    margin-bottom: 4px;
  }

  div.token {
    padding: 6px;
    border-radius: var(--radius);
    background: var(--secondaryBackgroundColor);
    word-wrap: anywhere;
    font-family: monospace;
    font-size: 1.1em;
  }

  div.spacer {
    margin-bottom: 12px;
  }

  div.token > span {
    font-family: monospace;
    font-size: 1.1em;
  }
</style>
