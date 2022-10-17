<script lang="ts">
	import SectionTitle from '$lib/form/SectionTitle.svelte';
	import Text from '$lib/form/Text.svelte';
	import AnnotationFormItem from '$lib/form/AnnotationFormItem.svelte';
	import Select from '$lib/form/Select.svelte';
	import Checkbox from '$lib/form/Checkbox.svelte';
	import {
		age,
		manyVWatch,
		manyVWatchQ,
		platformCheck,
		sex,
		snsCheck,
		watchFrequency,
		watchFrequencyQ,
		watchPeriod,
		watchPeriodQ
	} from './anotator-form';
	import { commonFormInitValues } from './init-values';

	export let initValues: DBData = commonFormInitValues;

	$: {
		watchFrequency.selected = String(initValues.watchFrequency);
		manyVWatch.selected = String(initValues.manyVWatch);
		watchPeriod.selected = String(initValues.watchPeriod);
		sex.selected = String(initValues.sex);
		age.selected = String(initValues.age);
		platformCheck.props.forEach((value, i) => {
			if (Array.isArray(initValues.platformCheck)) {
				value.checked = initValues.platformCheck[i];
			}
		});
		snsCheck.props.forEach((value, i) => {
			if (Array.isArray(initValues.snsCheck)) {
				value.checked = initValues.snsCheck[i];
			}
		});
	}
</script>

<SectionTitle title="アノテーターの VTuber 視聴歴について" />
<Text>
	以下の設問での VTuber は以下の活動者を指しています。<br />
	<p>
		1. VTuberと名乗っている活動者
		<br />
		2. VTuberと名乗っていないが、バーチャルなアバターを持ち、バーチャルなプロフィールを持ち、それを使った動画作品を投稿している活動者(Vライバー,
		Vsinger など)
	</p>
	※ YouTube以外のプラットフォームで活動している人も含む
</Text>

<AnnotationFormItem question={watchFrequencyQ}>
	<Select prop={watchFrequency} />
</AnnotationFormItem>

<AnnotationFormItem question={manyVWatchQ}>
	<Select prop={manyVWatch} />
</AnnotationFormItem>

<AnnotationFormItem question={watchPeriodQ}>
	<Select prop={watchPeriod} />
</AnnotationFormItem>

<SectionTitle title="アノテーター自身について" />
<Text>アノテーターの傾向を把握するために、アノテーター自身についてお尋ねします。</Text>

<AnnotationFormItem>
	<Select prop={sex} />
</AnnotationFormItem>

<AnnotationFormItem>
	<Select prop={age} />
</AnnotationFormItem>

<AnnotationFormItem question={platformCheck.question}>
	{#each platformCheck.props as prop}
		<Checkbox {prop} />
	{/each}
</AnnotationFormItem>

<AnnotationFormItem question={snsCheck.question}>
	{#each snsCheck.props as prop}
		<Checkbox {prop} />
	{/each}
</AnnotationFormItem>
