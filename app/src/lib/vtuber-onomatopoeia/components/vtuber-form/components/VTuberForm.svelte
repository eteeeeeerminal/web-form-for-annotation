<script lang="ts">
	import { createForm } from 'felte';
	import { ValidationMessage, reporter } from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';

	import onomatopoeiaList from '$lib/img/onomatopoeia-list.jpg';
	import YouTubeVideo from '$lib/form/YouTubeVideo.svelte';
	import Text from '$lib/form/Text.svelte';
	import SubmitButton from '$lib/button/SubmitButton.svelte';
	import AnnotationFormItem from '$lib/form/AnnotationFormItem.svelte';
	import TextField from '$lib/form/TextField.svelte';
	import Select from '$lib/form/Select.svelte';
	import NPoint from '$lib/form/NPoint.svelte';
	import { getUserData } from '$lib/dataset/user-data';
	import { datasetId, loadVtuberData } from '$lib/vtuber-onomatopoeia/dataset/database';
	import { vtuberFormInitValues } from '../init-values';
	import { TIPIJ } from './TIPIJ';

	export let vtuberId: string;
	export let submitted: boolean;
	export let initValues: DBData = vtuberFormInitValues;

	const { submit } = getUserData(datasetId);

	// 関数直書きじゃなくて setLocale の中に書きたい
	yup.setLocale({
		mixed: {
			default: 'Not valid'
		}
	});
	const requiredText = '必須項目です。';
	const TIPIJSchema = Object.fromEntries(
		TIPIJ.map((value) => {
			return [value.name, yup.string().required(requiredText)];
		})
	);
	const schema = yup.object({
		alreadyKnow: yup.string().required(requiredText),
		firstOnomatopoeia: yup.string().required(requiredText),
		otherOnomatopoeia: yup.string().notRequired(),
		otherImpressions: yup.string().notRequired(),
		...TIPIJSchema
	});

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
		selected: String(initValues.alreadyKnow)
	};

	$: {
		selectProp.selected = String(initValues.alreadyKnow);
	}
</script>

<Text>VTuber の自己紹介動画を閲覧して、感じたままを回答してください。</Text>

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
			value={String(initValues.firstOnomatopoeia)}
			placeholder="オノマトペ1語で回答"
		/>
	</AnnotationFormItem>

	<AnnotationFormItem
		question="上記以外のオノマトペで、このVTuberを表していると思うオノマトペがあれば回答してください。"
	>
		<TextField
			name="otherOnomatopoeia"
			value={String(initValues.otherOnomatopoeia)}
			placeholder="オノマトペ数語で回答"
		/>
	</AnnotationFormItem>

	<AnnotationFormItem
		question="オノマトペ以外でそのVTuberはどのような印象ですか? 例: かっこいい、ダウナー、かわいい"
	>
		<TextField
			name="otherImpressions"
			value={String(initValues.otherImpressions)}
			placeholder="数語で回答"
		/>
	</AnnotationFormItem>

	<Text>
		オノマトペの例<br />
		<br />
		<img src={onomatopoeiaList} alt="オノマトペの例" style="width: 100%;" />
	</Text>

	<Text>この VTuber の性格について感じたままに回答してください。</Text>

	{#each TIPIJ as item}
		<AnnotationFormItem question={item.question}>
			<NPoint
				prop={{
					name: item.name,
					n: 7,
					leftWord: '全く違うと思う',
					rightWord: '強くそう思う',
					selected: String(initValues[item.name])
				}}
			/>
		</AnnotationFormItem>
	{/each}

	<SubmitButton
		on:click={() => {
			if ($isValid) {
				submit(vtuberId, vtuberVideo.title, $data);
				submitted = true;
				if (window != null) {
					window.scroll({ top: 0, behavior: 'smooth' });
				}
			}
		}}
	/>
	{JSON.stringify($data)}
</form>
