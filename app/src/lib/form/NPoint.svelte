<script lang="ts">
	import { createField } from 'felte';
	import Radio from '@smui/radio';
	import FormField from '@smui/form-field';
	import ValidationMessage from './ValidationMessage.svelte';

	export let prop: NPointProp;

	const values = Array.from(new Array(prop.n), (_, i) => String(i + 1));

	const { field, onInput, onBlur } = createField(prop.name);

	$: onInput(prop.selected);
</script>

<div use:field on:blur={onBlur} role="radio" aria-checked="true" class="center" tabindex="0">
	<div class="left-word">{prop.leftWord}</div>
	<div class="scale-outer">
		<div class="scale-inner">
			{#each values as value}
				<FormField>
					<div class="scale-point">
						<div class="number">{value}</div>
						<Radio style="padding: 10px 0;" bind:group={prop.selected} {value} />
					</div>
				</FormField>
			{/each}
		</div>
	</div>
	<div class="right-word">{prop.rightWord}</div>
</div>
<ValidationMessage name={prop.name} />

<style lang="scss">
	.center {
		display: flex;
		justify-content: center;
		flex-flow: row;
		width: 100%;

		margin-bottom: 1rem;
	}

	.number {
		display: inline;
	}

	.scale-outer {
		display: inline-block;
		width: 50%;
	}

	.scale-inner {
		display: flex;
		justify-content: space-around;
	}

	.scale-point {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;

		width: fit-content;
	}

	.left-word {
		display: inline-block;
		margin: auto 0.5rem 0.5rem auto;
	}

	.right-word {
		display: inline-block;
		margin: auto auto 0.5rem 0.5rem;
	}
</style>
