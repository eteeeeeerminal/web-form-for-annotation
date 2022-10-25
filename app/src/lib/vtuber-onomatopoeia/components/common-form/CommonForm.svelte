<script lang="ts">
	import { createForm } from 'felte';
	import { ValidationMessage, reporter } from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';

	import ConsentForm from './components/ConsentForm.svelte';
	import PaymentForm from './components/PaymentForm.svelte';
	import AnnotatorForm from './components/AnnotatorForm.svelte';
	import { checkboxValues } from './components/consent-checkbox-info';

	import { getUserData } from '$lib/dataset/user-data';
	import { datasetId } from '$lib/vtuber-onomatopoeia/dataset/database';
	import { commonFormInitValues } from './components/init-values';
	import { checkCheckBoxLength } from '$lib/form/form';
	import Buttons from './components/Buttons.svelte';
	import ScreeningForm from './components/ScreeningForm.svelte';
	import { screen } from './components/screening';

	const { submit } = getUserData(datasetId);
	const commonFormKey = 'common';
	const formName = '共通フォーム';

	export let submitted: boolean = false;
	export let initValues: DBData = commonFormInitValues;

	// メッセージを関数直書きじゃなくて, setLocale にしたい
	yup.setLocale({
		mixed: {
			default: 'Not valid'
		},
		string: {
			email: 'Must be a valid email'
		}
	});

	const requiredText = '必須項目です。';
	const schema = yup.object({
		consentCheck: yup
			.array()
			.test('適切な長さか', 'すべての項目をご理解いただくようお願いします。', (v) =>
				checkCheckBoxLength(v, checkboxValues.length, checkboxValues.length)
			)
			.required(),
		consentRadio: yup
			.string()
			.equals(['同意する'], '同意した方のみ実験に参加できます。')
			.required(),
		name: yup.string().required(requiredText),
		email: yup.string().email('有効なアドレスを入力してください。').required(requiredText),
		watchFrequency: yup.string().required(requiredText),
		manyVWatch: yup.string().required(requiredText),
		watchPeriod: yup.string().required(requiredText),
		sex: yup.string().required(requiredText),
		age: yup.string().required(requiredText),
		platformCheck: yup
			.array()
			.test('適切な長さか', '1つ以上チェックしてください。', (v) => checkCheckBoxLength(v, 1, 7)),
		snsCheck: yup
			.array()
			.test('適切な長さか', '1つ以上チェックしてください。', (v) => checkCheckBoxLength(v, 1, 6))
	});

	const { form, data, isValid } = createForm({
		initialValues: initValues,
		onSubmit: (values) => {},
		extend: [validator({ schema }), reporter]
	});

	let screeningOk = false;

	let pageNum = 0;
	const pages = [ConsentForm, PaymentForm, AnnotatorForm];
</script>

<form use:form>
	{#if screeningOk}
		{#each pages as page, i}
			<div class={i != pageNum ? 'hidden' : ''}>
				<svelte:component this={page} {initValues} />
			</div>
		{/each}
		<Buttons
			bind:pageNum
			pageMax={pages.length - 1}
			onSubmit={() => {
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
	{:else}
		<ScreeningForm
			bind:screeningOk
			screen={() => {
				screeningOk = screen($data);
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
