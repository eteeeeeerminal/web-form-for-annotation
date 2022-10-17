<script lang="ts">
	import { createField } from 'felte';
	import CheckBox from '@smui/checkbox';
	import FormField from '@smui/form-field';

	export let prop: CheckboxProp;

	const { field, onInput, onBlur } = createField(prop.name);

	let checked = prop.checked ? [prop.checked] : [];
	$: onInput(checked);
</script>

<div use:field on:blur={onBlur}>
	<FormField>
		<CheckBox bind:group={checked} value={prop.value} />
		<span slot="label">{prop.value}</span>
	</FormField>
	<br />
</div>
