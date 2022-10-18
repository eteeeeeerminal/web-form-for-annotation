<script lang="ts">
	import { createField } from 'felte';
	import Checkbox from './Checkbox.svelte';
	import ValidationMessage from './ValidationMessage.svelte';

	export let prop: CheckboxListProp;

	const { field, onBlur } = createField(prop.name);
</script>

<div use:field on:blur={onBlur} role="checkbox" aria-checked={undefined} tabindex="0">
	{#each prop.values as value, i}
		<Checkbox
			prop={{
				name: prop.name + '.' + i,
				value: value,
				checked: prop.checked?.includes(value) ? value : ''
			}}
		/>
	{/each}

	<ValidationMessage name={prop.name} />
</div>
