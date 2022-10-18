<script lang="ts">
	import SectionTitle from '$lib/form/SectionTitle.svelte';
	import Text from '$lib/form/Text.svelte';
	import Radio from '$lib/form/Radio.svelte';
	import AnnotationFormItem from '$lib/form/AnnotationFormItem.svelte';
	import { checkboxValues } from './consent-checkbox-info';
	import ConcentFormText from './ConcentFormText.svelte';
	import { commonFormInitValues } from './init-values';
	import CheckboxList from '$lib/form/CheckboxList.svelte';
	import { constructStringArray } from './init-values';

	export let initValues: DBData = commonFormInitValues;

	let consentRadio: RadioButtonProp = {
		name: 'consentRadio',
		values: ['同意しない', '同意する']
	};

	let consentCheck: CheckboxListProp = {
		name: 'consentCheck',
		values: checkboxValues,
		checked: constructStringArray(checkboxValues.length)
	};

	$: {
		if (Array.isArray(initValues.consentCheck)) {
			initValues.consentCheck.forEach((value, i) => {
				consentCheck.checked[i] = value;
			});
		}
		consentRadio.selected = String(initValues.consentRadio);
	}
</script>

<SectionTitle title="本実験に関して同意のお願い" />
<ConcentFormText />

<Text>
	&emsp;次のリンクから「実験の説明と同意依頼文」を読み、本研究の趣旨を十分理解していただくようお願いします。
	<br />
	<a href="https://drive.google.com/file/d/1-MA1VHSyk3Om40Du1WOmrRr3tGQIRy2v/view?usp=sharing">
		説明と同意依頼文-アノテーション実験.pdf
	</a>
</Text>

<AnnotationFormItem
	question="上述の研究内容について、目的・方法・予期される問題等について十分な説明を受け、以下の項目を理解しました。"
>
	<CheckboxList prop={consentCheck} />
</AnnotationFormItem>

<AnnotationFormItem>
	<Radio prop={consentRadio} />
</AnnotationFormItem>
