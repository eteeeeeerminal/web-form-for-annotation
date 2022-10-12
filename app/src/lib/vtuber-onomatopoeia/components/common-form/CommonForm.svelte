<script lang="ts">
	import { createForm } from 'felte';
	import { ValidationMessage, reporter } from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';

	import SectionTitle from '$lib/form/SectionTitle.svelte';
	import Text from '$lib/form/Text.svelte';
	import ConsentForm from './components/ConsentForm.svelte';

	export let annotationLog: AnnotationLog | null;
	let submitted: any;

	yup.setLocale({
		mixed: {
			default: 'Not valid'
		}
	});
	const schema = yup.object({});

	const { form, data } = createForm({
		onSubmit: (values) => {
			submitted = values;
		}
	});
</script>

<form use:form>
	<ConsentForm />
	<input type="submit" value="回答" />
</form>

同意のチェックリスト 同意のラジオボックス

<pre>
 {JSON.stringify($data, null, 2)}
</pre>

<SectionTitle title="謝金支払いについて" />
<Text>謝金支払いについて</Text>

<SectionTitle title="アノテーター自身についての質問" />

// ページング実装して3つに分けたいぃ
