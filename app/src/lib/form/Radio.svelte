<script lang="ts">
	import { createField } from 'felte';
	import Radio from '@smui/radio';
	import FormField from '@smui/form-field';

	export let prop: RadioButtonProp;

	let selected: string = prop.initStat ? prop.initStat : '';

	const { field, onInput } = createField(prop.name);

	// 更新時に onInput を呼びたい
	$: hoge = onInput(selected);
</script>

<div use:field>
	{#each prop.values as value}
		<FormField style="margin: 0 2rem 0 0;">
			<Radio bind:group={selected} {value} />
			<span slot="label">{value}</span>
			{#if prop.doNewLine}
				<br/>
			{/if}
		</FormField>
	{/each}
</div>
