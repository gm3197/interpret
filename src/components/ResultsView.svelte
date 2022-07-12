<script lang="ts">
  import { DecodedResult } from "../decoder";
  import Button from "./Button.svelte";

  export let results: DecodedResult[];
  export let inputType: string;

  let selectedResult: number = results.length - 1;

  $: {
    if (results.length > 0) {
      selectedResult = results.length - 1;
    } else {
      selectedResult = 0;
    }
  }
</script>

<div class="results">
  <div class="steps">
    <p>Decoding steps:</p>
    <Button
      title="Input - {inputType.charAt(0).toUpperCase() +
        inputType.substring(1, inputType.length)}"
      secondary
      disabled
      noBold
    />
    {#each results as step, i}
      <span class="arrow">&#9656;</span>
      <Button
        title={step.decoder.name}
        secondary
        active={selectedResult == i}
        onClick={() => {
          selectedResult = i;
        }}
        noBold
      />
    {/each}
  </div>
  {#if results.length > 0}
    <div class="details">
      <p class="title">
        {results[selectedResult].decoder.name}
        {#if results[selectedResult].decoder.fullName}
          ({results[selectedResult].decoder.fullName})
        {/if}
      </p>
      {#if results[selectedResult].decoder.rfc}
        <p>
          Defined in: <a
            href="https://datatracker.ietf.org/doc/rfc{results[selectedResult]
              .decoder.rfc}"
            target="_blank">RFC {results[selectedResult].decoder.rfc}</a
          >
        </p>
      {/if}
      <div class="decoderDisplay">
        {#if results[selectedResult].decoder.display}
          <svelte:component
            this={results[selectedResult].decoder.display}
            result={results[selectedResult]}
          />
        {:else}
          <p class="noDisplay">No additional details.</p>
        {/if}
      </div>
    </div>
  {:else}
    <div class="details">
      <p>Not sure what this is...</p>
    </div>
  {/if}
</div>

<style>
  div.results {
    background: var(--backgroundColor);
    width: 100%;
    padding: 6px;
    display: flex;
    flex-direction: column;
    border-radius: var(--radius);
  }

  div.steps {
    text-align: center;
  }

  div.steps p {
    display: inline;
    font-weight: bold;
    font-size: 0.8rem;
  }

  span.arrow {
    color: var(--buttonTextColor);
    margin: 0px 4px;
  }

  span.arrow:first-of-type {
    margin: 0px;
  }

  div.details {
    margin-top: 8px;
    font-size: 0.8rem;
  }

  div.details p.title {
    font-size: 1.2rem;
    font-weight: bold;
  }

  div.decoderDisplay {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
  }

  p.noDisplay {
    text-align: center;
  }
</style>
