<script lang="ts">
  import { DecodedResult } from "../../decoder";
  import { arrayBufferToHex, asciiStringToArrayBuffer } from "../../lib";

  export let result: DecodedResult;

  let hexBytes: string[] = [];
  let hoveredByte: number | null = null;

  $: {
    let hex = arrayBufferToHex(asciiStringToArrayBuffer(result.value));
    hexBytes = [];
    for (let i = 0; i < hex.length / 2; i++) {
      hexBytes.push(hex.substring(i * 2, i * 2 + 2));
    }
  }
</script>

<div class="ascii-container">
  <div class="hex">
    <p>Input bytes as hexadecimal</p>
    <div>
      {#each hexBytes as byte, i}
        <span
          on:mouseenter={() => {
            hoveredByte = i;
          }}
          on:mouseleave={() => {
            hoveredByte = null;
          }}
          class={hoveredByte == i ? "selected" : ""}>{byte}</span
        >
      {/each}
    </div>
  </div>
  <div class="ascii">
    <p>Ascii String</p>
    <div>
      {#each result.value.split("") as char, i}
        {#if char == "\n"}
          {#if hoveredByte == i}
            <span class="selected">\n</span>
          {/if}
          <br />
        {:else}
          <span
            on:mouseenter={() => {
              hoveredByte = i;
            }}
            on:mouseleave={() => {
              hoveredByte = null;
            }}
            class={hoveredByte == i ? "selected" : ""}>{char}</span
          >
        {/if}
      {/each}
    </div>
  </div>
</div>

<style>
  div.ascii-container {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  div.ascii-container > div {
    flex-grow: 1;
    max-width: 50%;
  }

  div.ascii-container > div > div {
    padding: 6px;
    border-radius: var(--radius);
    background: var(--secondaryBackgroundColor);
  }

  span {
    font-family: monospace;
    cursor: none;
  }

  div.hex div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  div.hex span {
    margin-right: 8px;
  }

  div.ascii div {
    word-wrap: anywhere;
  }

  span.selected {
    background: var(--secondaryAccentColor);
    outline: 3px solid var(--secondaryAccentColor);
  }

  p {
    font-size: 1rem;
    margin-bottom: 4px;
  }
</style>
