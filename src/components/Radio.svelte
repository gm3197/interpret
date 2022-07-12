<script lang="ts">
  export let options: string[];
  export let selectedOption: number = 0;
</script>

<p>
  {#each options as o, i}
    <span
      class={"option" + (i == selectedOption ? " selected" : "")}
      on:click={() => {
        selectedOption = i;
      }}>{o}</span
    >
  {/each}
</p>

<style>
  span.option {
    margin-left: 8px;
    cursor: pointer;
    font-weight: normal;
  }

  span.selected {
    color: var(--secondaryAccentColor);
  }
</style>
