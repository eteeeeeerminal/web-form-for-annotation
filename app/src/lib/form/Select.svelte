<script lang="ts">
	import { createField } from 'felte';
	import Select, { Option } from '@smui/select';
	import ValidationMessage from './ValidationMessage.svelte';

	export let prop: SelectProp;
	if (prop.selected == null) {
		prop.selected = '';
	}

	const { field, onInput, onBlur } = createField(prop.name);

	$: onInput(prop.selected);
</script>

<div use:field on:blur={onBlur} role="listbox" tabindex="0">
	<Select
		bind:value={prop.selected}
		label="選んでください"
		variant="standard"
		style="margin: 0.6rem 1rem 0.6rem;"
	>
		<Option value="" />
		{#each prop.values as value}
			<Option {value}>{value}</Option>
		{/each}
	</Select>

	<ValidationMessage name={prop.name} />
</div>
