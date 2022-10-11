<script lang="ts">
	import SectionTitle from '$lib/form/SectionTitle.svelte';
	import Text from '$lib/form/Text.svelte';

	export let annotationLog: AnnotationLog | null;
</script>

<SectionTitle title="本実験に関して同意のお願い" />

<Text>&emsp;ここに同意書の内容。</Text>

同意のチェックリスト 同意のラジオボックス

<SectionTitle title="謝金支払いについて" />
<Text>謝金支払いについて</Text>

<SectionTitle title="アノテーター自身についての質問" />

// ページング実装して3つに分けたいぃ
