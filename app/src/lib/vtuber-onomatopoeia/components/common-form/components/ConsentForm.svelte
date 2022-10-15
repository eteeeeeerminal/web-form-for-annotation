<script lang="ts">
	import SectionTitle from '$lib/form/SectionTitle.svelte';
	import Text from '$lib/form/Text.svelte';
	import Checkbox from '$lib/form/Checkbox.svelte';
	import Radio from '$lib/form/Radio.svelte';
	import AnnotationFormItem from '$lib/form/AnnotationFormItem.svelte';
	import { checkbox } from './checkbox-info';
	import ConcentFormText from './ConcentFormText.svelte';

	const consentRadio = {
		name: "consentRadio",
		values: ['同意しない', '同意する'],
	} as RadioButtonProp
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

<AnnotationFormItem question={checkbox.question}>
	{#each checkbox.props as prop}
		<Checkbox {prop} />
	{/each}
</AnnotationFormItem>

<AnnotationFormItem>
	<Radio prop={consentRadio}/>
</AnnotationFormItem>
