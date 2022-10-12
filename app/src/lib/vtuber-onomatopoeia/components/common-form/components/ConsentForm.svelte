<script lang="ts">
	import SectionTitle from '$lib/form/SectionTitle.svelte';
	import Text from '$lib/form/Text.svelte';
	import Checkbox from '$lib/form/Checkbox.svelte';
	import AnnotationFormItem from '$lib/form/AnnotationFormItem.svelte';
	import { itemsToCheckboxProps } from '$lib/form/form';

	const checkboxValues = ['hoge', 'fuga', 'piyo'];

	const checkbox = {
		question:
			'上述の研究内容について、目的・方法・予期される問題等について十分な説明を受け、以下の項目を理解しました。',
		props: itemsToCheckboxProps('consentCheck', checkboxValues)
	};
</script>

<SectionTitle title="本実験に関して同意のお願い" />

<Text>
	&emsp;ここに同意書の内容。あああああああああああああああああああああああああああああああ
</Text>

<Text>
	&emsp;ここに同意書の内容2。あああああああああああああああああああああああああああああああ
</Text>

<AnnotationFormItem question={checkbox.question}>
	{#each checkbox.props as prop}
		<Checkbox {prop} />
	{/each}
</AnnotationFormItem>
