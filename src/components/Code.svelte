<script lang="ts">
  export let string: string;
  export let fontColor: string = "black";
  export let height: string = "220px";
</script>

<textarea disabled style:color={fontColor} style:min-height={height}
  >{string}</textarea
>

<style>
  textarea {
    border: none;
    background: var(--secondaryBackgroundColor);
    padding: 6px;
    border-radius: var(--radius);
    resize: vertical;
  }
</style>
