<script lang="ts">
	import { pickVtuber } from '$lib/vtuber-onomatopoeia/dataset/database';
	import VTuberForm from './components/VTuberForm.svelte';
	import { vtuberFormInitValues } from './init-values';

	let submitted = false;
	let initValues = vtuberFormInitValues;

	let vtuberId = pickVtuber();
	$: if (submitted) {
		vtuberId = pickVtuber();
		submitted = false;
		initValues = vtuberFormInitValues;
	}
</script>

<VTuberForm {vtuberId} bind:submitted {initValues} />

不具合報告フォーム
