<script lang="ts">
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import { createField } from 'felte';
	import ValidationMessage from './ValidationMessage.svelte';

	export let name: string;
	export let value: string = '';
	export let placeholder: string = '';
	export let helperText: string = '';

	const { field, onInput, onBlur } = createField(name);

	$: onInput(value);
</script>

<div use:field on:blur={onBlur} role="textbox">
	<Textfield
		bind:value
		label={placeholder}
		style="margin: 0.6rem 1rem 0.6rem; width: 93%;"
		textarea
	>
		{#if helperText}
			<HelperText slot="helper">{helperText}</HelperText>
		{/if}
	</Textfield>

	<ValidationMessage {name} />
</div>
