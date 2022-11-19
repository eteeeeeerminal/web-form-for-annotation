<script lang="ts">
	import DatasetCards from '$lib/dataset/DatasetCards.svelte';
</script>

<div class="center">
	<h2>データセット一覧</h2>
	<p>参加する実験を選んで、"アノテーションする" ボタンを押してください。</p>
	<p>
		初回回答時は、実験に関する説明と同意フォームが表示されます。説明を理解し、同意した方のみ、実験に参加していただけます。
	</p>
	<p>
		<b>実験を辞退される場合は、回答を修正するページから、共通フォームの回答を削除してください。</b>
	</p>
	<h3>更新履歴</h3>
	<p>
		11月18日: 回答が目標数集まったので締め切りました。近日中に、謝金の受け渡しについてメールいたします。
	</p>
	<p>
		11月4日: <b
			><red style="color:red">重要: </red>謝金受け渡しに関する内容を補足。Q&Aページの作成</b
		>
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
