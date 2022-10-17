<script lang="ts">
	import { pickVtuber } from '$lib/vtuber-onomatopoeia/dataset/database';
	import VTuberForm from './components/VTuberForm.svelte';

	let submitted = false;

	let vtuberId = pickVtuber();
	$: if (submitted) {
		vtuberId = pickVtuber();
		submitted = false;
	}
</script>

<VTuberForm {vtuberId} bind:submitted />

不具合報告フォーム
