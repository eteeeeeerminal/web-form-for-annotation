<script lang="ts">
	import SectionTitle from '$lib/form/SectionTitle.svelte';
	import Text from '$lib/form/Text.svelte';
	import AnnotationFormItem from '$lib/form/AnnotationFormItem.svelte';
	import Select from '$lib/form/Select.svelte';
	import CheckboxList from '$lib/form/CheckboxList.svelte';
	import {
		age,
		manyVWatch,
		manyVWatchQ,
		platformCheck,
		sex,
		snsCheck,
		watchFrequency,
		watchPeriod,
		watchPeriodQ
	} from './annotator-form';
	import { commonFormInitValues } from './init-values';

	export let initValues: DBData = commonFormInitValues;

	$: {
		watchFrequency.selected = String(initValues.watchFrequency);
		manyVWatch.selected = String(initValues.manyVWatch);
		watchPeriod.selected = String(initValues.watchPeriod);
		sex.selected = String(initValues.sex);
		age.selected = String(initValues.age);
		platformCheck.prop.values.forEach((_, i) => {
			if (Array.isArray(initValues.platformCheck)) {
				platformCheck.prop.checked[i] = initValues.platformCheck[i];
			}
		});
		snsCheck.prop.values.forEach((_, i) => {
			if (Array.isArray(initValues.snsCheck)) {
				snsCheck.prop.checked[i] = initValues.snsCheck[i];
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
	<CheckboxList prop={platformCheck.prop} />
</AnnotationFormItem>

<AnnotationFormItem question={snsCheck.question}>
	<CheckboxList prop={snsCheck.prop} />
</AnnotationFormItem>
