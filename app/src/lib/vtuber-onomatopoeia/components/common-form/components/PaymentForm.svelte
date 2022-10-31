<script lang="ts">
	import SectionTitle from '$lib/form/SectionTitle.svelte';
	import Text from '$lib/form/Text.svelte';
	import AnnotationFormItem from '$lib/form/AnnotationFormItem.svelte';
	import TextField from '$lib/form/TextField.svelte';
	import { commonFormInitValues } from './init-values';

	export let initValues: DBData = commonFormInitValues;
</script>

<SectionTitle title="謝金支払いについて" />
<Text>
	<p>
		謝金の支払いは図書カードで行います。図書カードの受け渡しには、研究室に来ていただく必要があります。
		受け渡しの詳細は、後ほどメールアドレスに送信します。
	</p>
	<p>謝金は6人アノテーションするたびに1000円分の図書カードをお渡しする予定です。</p>
</Text>

<AnnotationFormItem question="氏名を入力してください。">
	<TextField name="name" value={String(initValues.name)} placeholder="氏名を入力" />
</AnnotationFormItem>

<AnnotationFormItem
	question="謝金の支払いに関するやりとりをするために、emailアドレスを記入して下さい。"
>
	<TextField name="email" value={String(initValues.email)} placeholder="メールアドレスを入力" />
</AnnotationFormItem>
