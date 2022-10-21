<script lang="ts">
	import DatasetCards from '$lib/dataset/DatasetCards.svelte';
</script>

<div class="center">
	<h2>データセット一覧</h2>
	<p>参加する実験を選んで、"アノテーションする" ボタンを押してください。</p>
	<p>
		初回回答時は、実験に関する説明と同意フォームが表示されます。説明を理解し、同意した方のみ、実験に参加していただけます。
	</p>

	<DatasetCards />
</div>

<style lang="scss">
	.center {
		margin: auto;
		width: 100%;
		max-width: $default-width;
	}
</style>
