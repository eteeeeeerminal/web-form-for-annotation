<script lang="ts">
	import { createField } from 'felte';
	import Radio from '@smui/radio';
	import FormField from '@smui/form-field';

	export let prop: RadioButtonProp;

	const { field, onInput } = createField(prop.name);

	$: onInput(prop.selected);
</script>

<div use:field>
	{#each prop.values as value}
		<FormField style="margin: 0 2rem 0 0;">
			<Radio bind:group={prop.selected} {value} />
			<span slot="label">{value}</span>
			{#if prop.doNewLine}
				<br />
			{/if}
		</FormField>
	{/each}
</div>
