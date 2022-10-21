<script lang="ts">
	import { createField } from 'felte';
	import Radio from '@smui/radio';
	import FormField from '@smui/form-field';
	import ValidationMessage from './ValidationMessage.svelte';

	export let prop: RadioButtonProp;

	const { field, onInput, onBlur } = createField(prop.name);

	$: onInput(prop.selected);
</script>

<div use:field on:blur={onBlur} role="radio" aria-checked="true" tabindex="0">
	{#each prop.values as value}
		<FormField style="margin: 0 2rem 0 0;">
			<Radio bind:group={prop.selected} {value} />
			<span slot="label">{value}</span>
			{#if prop.doNewLine}
				<br />
			{/if}
		</FormField>
	{/each}

	<ValidationMessage name={prop.name} />
</div>
