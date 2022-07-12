<script lang="ts">
  export let title: string;
  export let secondary = false;
  export let symbol: string | null = null;
  export let onClick: () => void = () => {};
  export let disabled = false;
  export let active = false;
  export let noBold = false;
</script>

<button
  class={(secondary ? "secondary" : "primary") +
    (active ? " active" : "") +
    (noBold ? " noBold" : "")}
  on:click={onClick}
  {disabled}
  >{title}{#if symbol}<span class="icon">{symbol}</span>{/if}</button
>

<style>
  button {
    border: none;
    padding: 2px 6px 1px 6px;
    font-size: 0.8rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: var(--radius);
  }

  button.primary {
    background: var(--accentColor);
    color: white;
  }

  button.primary:not(:disabled):hover {
    background: var(--accentColorDarker);
  }

  button.primary:disabled {
    background: var(--accentColorLighter);
  }

  button.primary:not(:disabled):active {
    background: var(--accentColorDarkerer);
  }

  button.secondary {
    background: transparent;
    color: var(--buttonTextColor);
  }

  button:disabled {
    cursor: not-allowed;
  }

  button.secondary:not(:disabled):hover {
    background: var(--secondaryBackgroundColor);
  }

  button.secondary:not(:disabled):active {
    background: var(--tertiaryBackgroundColor);
  }

  button.secondary.active {
    outline: 2px solid var(--secondaryAccentColor);
  }

  .icon {
    margin-left: 2px;
  }

  button.noBold {
    font-weight: normal;
  }
</style>
