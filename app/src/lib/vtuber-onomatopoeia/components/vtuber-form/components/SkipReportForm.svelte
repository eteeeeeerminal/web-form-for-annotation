<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import { reporter } from '@felte/reporter-svelte';
	import * as yup from 'yup';

	import AnnotationFormItem from '$lib/form/AnnotationFormItem.svelte';
	import CheckboxList from '$lib/form/CheckboxList.svelte';
	import TextArea from '$lib/form/TextArea.svelte';
	import { constructStringArray } from '../../common-form/components/init-values';
	import PrimaryButton from '$lib/button/PrimaryButton.svelte';
	import SecondaryButton from '$lib/button/SecondaryButton.svelte';
	import { getUserData } from '$lib/dataset/user-data';
	import { datasetId } from '$lib/vtuber-onomatopoeia/dataset/database';
	import { checkCheckBoxLength } from '$lib/form/form';

	export let submitted: boolean;
	export let dataId: string;
	export let displayName: string;

	const problemCheckValues = [
		'アノテーションしたくないデータ',
		'データが壊れている',
		'不適切なデータ',
		'その他'
	];

	const initValues = {
		problemCheck: constructStringArray(problemCheckValues.length),
		reportForm: ''
	};

	const schema = yup.object({
		problemCheck: yup
			.array()
			.test('適切な長さか', '1つ以上チェックしてください。', (v) => checkCheckBoxLength(v, 1, 4))
			.required(),
		reportForm: yup.string().notRequired()
	});
	const { form, data, isValid } = createForm({
		initialValues: initValues,
		extend: [validator({ schema }), reporter]
	});

	const { skip } = getUserData(datasetId);

	let expanded = false;
</script>

<form use:form>
	<AnnotationFormItem question="スキップフォーム">
		{#if expanded}
			<p>
				データのアノテーションをスキップする場合は以下の項目に回答して、スキップボタンを押してください。
			</p>
			<CheckboxList
				prop={{
					name: 'problemCheck',
					values: problemCheckValues,
					checked: constructStringArray(problemCheckValues.length)
				}}
			/>

			<TextArea name="reportForm" placeholder="問題の詳細を回答してください。" />

			<SecondaryButton
				label="閉じる"
				on:click={() => {
					expanded = false;
				}}
			/>
			<PrimaryButton
				label="スキップ"
				on:click={() => {
					if ($isValid) {
						skip(dataId, displayName, $data);
						submitted = true;
						if (window != null) {
							window.scroll({ top: 0, behavior: 'smooth' });
						}
					}
				}}
				type="submit"
			/>
		{:else}
			<SecondaryButton
				label="開く"
				on:click={() => {
					expanded = true;
				}}
			/>
		{/if}
	</AnnotationFormItem>
</form>
