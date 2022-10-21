<script lang="ts">
	import { createField } from 'felte';
	import CheckBox from '@smui/checkbox';
	import FormField from '@smui/form-field';

	export let prop: CheckboxProp;

	const { field, onInput } = createField(prop.name);

	let checked = prop.checked ? [prop.checked] : [];
	$: onInput(checked);
</script>

<div use:field role="checkbox" aria-checked={Boolean(checked)}>
	<FormField>
		<CheckBox bind:group={checked} value={prop.value} />
		<span slot="label">{prop.value}</span>
	</FormField>
	<br />
</div>
