<script lang="ts">
	import { createField } from 'felte';
	import Radio from '@smui/radio';
	import FormField from '@smui/form-field';

	export let name: string;
	export let values: string[];
	export let initStat: string | null = null;
	export let doNewLine: boolean = true;

	let selected: string = initStat ? initStat : '';

	const { field, onInput } = createField(name);

	// 更新時に onInput を呼びたい
	$: hoge = onInput(selected);
</script>

<div use:field>
	{#each values as value}
		<FormField style="margin: 0 2rem 0 0;">
			<Radio bind:group={selected} {value} />
			<span slot="label">{value}</span>
		</FormField>
	{/each}
</div>
