<script lang="ts">
  import Button from "./Button.svelte";
  import Radio from "./Radio.svelte";
  import {
    arrayBufferToBase64,
    base64ToArrayBuffer,
    hexToArrayBuffer,
    binaryStringToArrayBuffer,
    base64urlToBase64,
  } from "../lib";

  export let onInputConfirm: (
    prettyName: string,
    dataType: string,
    data: any
  ) => void;

  let data: string = "";
  let dataType: "binary" | "hex" | "base64" | "base64url" | "ascii" | null =
    null;
  let dataTypeSelected: number;
  let fileSelectBtn: HTMLInputElement;
  let dataIsValid = true;
  let reader = new FileReader();

  const onGoBtnPressed = () => {
    if (dataType == "base64") {
      onInputConfirm(dataType, "bytes", base64ToArrayBuffer(data));
    } else if (dataType == "base64url") {
      onInputConfirm(
        dataType,
        "bytes",
        base64ToArrayBuffer(base64urlToBase64(data))
      );
    } else if (dataType == "hex") {
      onInputConfirm(
        dataType,
        "bytes",
        hexToArrayBuffer(data.replace(/\s/g, ""))
      );
    } else if (dataType == "binary") {
      onInputConfirm(dataType, "bytes", binaryStringToArrayBuffer(data));
    } else if (dataType == "ascii") {
      onInputConfirm(dataType, "text", data);
    }
  };

  reader.onload = () => {
    data = arrayBufferToBase64(reader.result as ArrayBuffer);
    dataTypeSelected = 0;
  };

  const fileSelected = () => {
    if (fileSelectBtn.files.length > 0) {
      reader.readAsArrayBuffer(fileSelectBtn.files[0]);
    }
  };

  $: {
    if (dataTypeSelected == 0) {
      dataIsValid = true;
      if (/^[01 ]+$/g.test(data) && data.replace(/\s/g, "").length % 8 == 0) {
        dataType = "binary";
      } else if (/^([0-9a-f][0-9a-f] ?)+$/gi.test(data)) {
        dataType = "hex";
      } else if (
        /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}(?:==)?|[A-Za-z0-9+/]{3}(?:=)?)?$/g.test(
          data
        )
      ) {
        dataType = "base64";
      } else if (
        /^(?:[A-Za-z0-9\-\_]{4})*(?:[A-Za-z0-9\-\_]{2}(?:==)?|[A-Za-z0-9\-\_]{3}(?:=)?)?$/g.test(
          data
        )
      ) {
        dataType = "base64url";
      } else {
        dataType = "ascii";
      }
    } else if (dataTypeSelected == 1) {
      dataType = "binary";
      dataIsValid =
        /^[01 ]+$/g.test(data) && data.replace(/\s/g, "").length % 8 == 0;
    } else if (dataTypeSelected == 2) {
      dataType = "hex";
      dataIsValid = /^([0-9a-f][0-9a-f] ?)+$/gi.test(data);
    } else if (dataTypeSelected == 3) {
      dataType = "base64";
      dataIsValid =
        /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}(?:==)?|[A-Za-z0-9+/]{3}(?:=)?)?$/g.test(
          data
        );
    } else if (dataTypeSelected == 4) {
      dataType = "ascii";
      dataIsValid = true;
    }
  }
</script>

<div class="input">
  <div class="top">
    <p>Input format:</p>
    <Radio
      options={[
        data.length > 0 && dataTypeSelected == 0
          ? dataType.charAt(0).toUpperCase() +
            dataType.substring(1, dataType.length) +
            " - Detected"
          : "Auto-detect",
        "Binary",
        "Hex",
        "Base64",
        "Ascii",
      ]}
      bind:selectedOption={dataTypeSelected}
    />
  </div>
  <textarea
    placeholder={dataTypeSelected == 0
      ? "Paste some data here."
      : "Paste some " + dataType + " data here."}
    bind:value={data}
    autofocus
  />
  <div class="buttons">
    <Button
      secondary
      title="Load from file "
      symbol="&#128193;"
      onClick={() => {
        fileSelectBtn.click();
      }}
    />
    {#if data.length > 0}
      {#if dataIsValid}
        <p class="info">
          {#if dataType == "binary"}
            {data.replace(/\s/g, "").length / 8} bytes
          {:else if dataType == "hex"}
            {data.replace(/\s/g, "").length / 2} bytes
          {:else if dataType == "base64"}
            {window.atob(data).length} bytes
          {:else if dataType == "base64url"}
            {window.atob(base64urlToBase64(data)).length} bytes
          {:else if dataType == "ascii"}
            {data.length} characters
          {/if}
        </p>
      {:else}
        <p class="error">
          Invalid {dataType}
        </p>
      {/if}
    {/if}
    <Button
      title="GO"
      symbol="&#9656;"
      disabled={data.length == 0 || !dataIsValid}
      onClick={onGoBtnPressed}
    />
  </div>
  <input
    on:change={fileSelected}
    class="hidden"
    type="file"
    bind:this={fileSelectBtn}
  />
</div>

<style>
  div.input {
    background: var(--backgroundColor);
    width: 100%;
    padding: 6px;
    display: flex;
    flex-direction: column;
    border-radius: var(--radius);
    position: relative;
    z-index: 10;
  }

  textarea {
    border: none;
    resize: none;
    font-family: monospace;
    height: 119px;
    margin: 4px 0px;
  }

  div.top {
    font-size: 0.8rem;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  div.buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  p.info {
    font-size: 0.75rem;
    font-family: monospace;
    display: block;
  }

  p.error {
    font-size: 0.75rem;
    font-family: monospace;
    color: red;
  }

  .hidden {
    display: none;
  }
</style>
