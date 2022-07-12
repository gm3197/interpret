<script lang="ts">
	import InputBox from "./components/InputBox.svelte";
	import ResultsView from "./components/ResultsView.svelte";
	import { decodeRoot, DecodedValue } from "./decoder";

	let decodedResults: DecodedValue[] | null = null;
	let inputType: string = "";

	const onInputConfirm = (prettyName: string, dataType: string, data: any) => {
		inputType = prettyName;
		decodedResults = decodeRoot(dataType, data);
	};
</script>

<main>
	<h1>Interpret</h1>
	<p>Universal data parser for developers, reverse engineering, and more!</p>
	<InputBox {onInputConfirm} />
	{#if decodedResults}
		<br />
		<ResultsView results={decodedResults} {inputType} />
	{/if}
</main>

<style>
	main {
		padding: 1rem;
		width: 100%;
		max-width: 1000px;
		margin: 0 auto;
	}

	p {
		margin-bottom: 8px;
	}
</style>
