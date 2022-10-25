<script lang="ts">
	import SectionTitle from '$lib/form/SectionTitle.svelte';
	import Text from '$lib/form/Text.svelte';
	import AnnotationFormItem from '$lib/form/AnnotationFormItem.svelte';
	import Select from '$lib/form/Select.svelte';
	import PaginationButton from '$lib/button/PaginationButton.svelte';
	import { watchFrequency, watchFrequencyQ } from './annotator-form';

	export let screeningOk: boolean;
	export let screen: () => void;

	let submitted = false;
</script>

{#if submitted}
	<Text>
		<p>回答ありがとうございました。</p>
		<p>
			本実験の参加条件を満たしていないので実験にご参加いただけません。ご協力ありがとうございました。
		</p>
	</Text>
{:else}
	<SectionTitle title="実験参加資格について" />
	<Text>
		<p>はじめに、本実験に参加できるかどうか確認します。</p>
		<p>以下の質問に回答した後、条件に合った方には実験参加の同意書を提示させていただきます。</p>
	</Text>

	<AnnotationFormItem question={watchFrequencyQ}>
		<Select prop={watchFrequency} />
	</AnnotationFormItem>

	<PaginationButton
		name="次へ"
		on:click={() => {
			screen();
			submitted = true;
			if (window != null) {
				window.scroll({ top: 0, behavior: 'smooth' });
			}
		}}
	/>
{/if}
