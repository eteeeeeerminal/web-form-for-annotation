<script lang="ts">
	import { createForm } from 'felte';
	import { ValidationMessage, reporter } from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';

	import ConsentForm from './components/ConsentForm.svelte';
	import SubmitButton from '$lib/button/SubmitButton.svelte';
	import PaginationButton from '$lib/button/PaginationButton.svelte';
	import PaymentForm from './components/PaymentForm.svelte';
	import AnnotatorForm from './components/AnnotatorForm.svelte';
	import { checkbox } from './components/checkbox-info';

	import { getUserData } from '$lib/dataset/user-data';
	import { datasetId } from '$lib/vtuber-onomatopoeia/dataset/database';
	import { commonFormInitValues } from './components/init-values';

	const { submit } = getUserData(datasetId);
	const commonFormKey = 'common';
	const formName = '共通フォーム';

	export let submitted: boolean = false;
	export let initValues: DBData = commonFormInitValues;

	yup.setLocale({
		mixed: {
			default: 'Not valid'
		}
	});
	const schema = yup.object({
		consentCheck: yup
			.array()
			.test((v) => {
				v = v?.filter((v) => Boolean(v));
				return v?.length === checkbox.props.length;
			})
			.required(),
		consentRadio: yup.string().equals(['同意する'], '同意した方のみ実験に参加できます。').required()
	});

	const { form, data, isValid } = createForm({
		initialValues: initValues,
		onSubmit: (values) => {},
		extend: [validator({ schema }), reporter]
	});

	let pageNum = 0;
	const pages = [ConsentForm, PaymentForm, AnnotatorForm];
</script>

<form use:form>
	{#each pages as page, i}
		<div class={i != pageNum ? 'hidden' : ''}>
			<svelte:component this={page} {initValues} />
		</div>
	{/each}
	{#if pageNum > 0}
		<PaginationButton
			name="戻る"
			on:click={() => {
				pageNum--;
			}}
		/>
	{/if}
	{#if pageNum < pages.length - 1}
		<PaginationButton
			name="次へ"
			on:click={() => {
				if ($isValid) pageNum++;
			}}
		/>
	{/if}
	{#if pageNum == pages.length - 1}
		<SubmitButton
			on:click={() => {
				if ($isValid) {
					submit(commonFormKey, formName, $data);
					submitted = true;
					if (window != null) {
						window.scroll({ top: 0, behavior: 'smooth' });
					}
				} else {
					pageNum = 0;
				}
			}}
		/>
	{/if}
</form>

<pre>
 {JSON.stringify($data, null, 2)}
</pre>

<style lang="scss">
	.hidden {
		display: none;
	}
</style>
