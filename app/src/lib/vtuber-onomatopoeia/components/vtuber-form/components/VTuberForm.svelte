<script lang="ts">
	import { createForm } from 'felte';
	import { ValidationMessage, reporter } from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';

	import YouTubeVideo from '$lib/form/YouTubeVideo.svelte';
	import SubmitButton from '$lib/button/SubmitButton.svelte';
	import AnnotationFormItem from '$lib/form/AnnotationFormItem.svelte';
	import TextField from '$lib/form/TextField.svelte';
	import Select from '$lib/form/Select.svelte';
	import NPoint from '$lib/form/NPoint.svelte';
	import TextArea from '$lib/form/TextArea.svelte';
	import { loadVtuberData } from './load-vtuber-data';
	import { getUserData } from '$lib/dataset/user-data';
	import { datasetId } from '$lib/vtuber-onomatopoeia/dataset/database';

	export let vtuberId: string;
	export let submitted: boolean;
	export let initValues: { [key: string]: string } = {
		alreadyKnow: '',
		firstOnomatopoeia: ''
	};

	const { submit } = getUserData(datasetId);

	yup.setLocale({
		mixed: {
			default: 'Not valid'
		}
	});
	const schema = yup.object({});

	const { form, data, isValid } = createForm({
		initialValues: initValues,
		onSubmit: (values) => {},
		extend: [validator({ schema }), reporter]
	});

	$: vtuberVideo = loadVtuberData(vtuberId);
	const selectProp: SelectProp = {
		name: 'alreadyKnow',
		values: [
			'聞いたこともない',
			'聞いたことはある',
			'動画を視聴したことがある',
			'何度か動画を視聴した',
			'定期的に視聴している'
		],
		initStat: initValues.alreadyKnow
	};
</script>

<YouTubeVideo {...vtuberVideo} />

<form use:form>
	<AnnotationFormItem question="このVTuberをすでに知っていましたか?">
		<Select prop={selectProp} />
	</AnnotationFormItem>

	<AnnotationFormItem
		question="このVTuberをオノマトペ1語で表して下さい。思いつかない場合は、以下に提示してあるオノマトペの例の中から選択してください。"
	>
		<TextField
			name="firstOnomatopoeia"
			value={initValues.firstOnomatopoeia}
			placeholder="オノマトペ1語で回答"
		/>
	</AnnotationFormItem>

	<SubmitButton
		on:click={() => {
			if ($isValid) {
				submit(vtuberId, vtuberVideo.title, $data);
				submitted = true;
			}
		}}
	/>
	{JSON.stringify($data)}
</form>
