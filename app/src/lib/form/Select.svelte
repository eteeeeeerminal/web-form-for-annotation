<script lang="ts">
	import { createField } from 'felte';
	import Select, { Option } from '@smui/select';

	export let prop: SelectProp;
	if (prop.selected == null) {
		prop.selected = '';
	}

	const { field, onInput } = createField(prop.name);

	$: onInput(prop.selected);
</script>

<div use:field>
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
</div>
