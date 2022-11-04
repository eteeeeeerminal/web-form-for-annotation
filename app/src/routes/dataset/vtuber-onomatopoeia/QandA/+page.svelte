<script lang="ts">
	import Title from '$lib/form/Title.svelte';
</script>

<div class="center">
	<div class="centered-item">
		<h2>Q and A</h2>
		<h3>Q1: いくつ回答すればいいですか?</h3>
		<p>
			最低でも12動画分の印象を回答おねがいします。また上限は特に定めておりません。無理のない範囲で協力おねがいします。
		</p>
		<h3>Q2: VTuber でも参加できますか?</h3>
		<p>
			VTuber 好きであれば、VTuber
			本人でも回答いただけます。ただし、自分自身の登場する動画への回答はスキップしてください。
		</p>
		<h3>Q3: 実名の入力が必要ですか?</h3>
		<p>
			謝金の受け渡しの際に、電気通信大学におこしいただいて受領書を書いてもらう必要があります。フォーム上には実名以外の入力も可能ですが、大学へ提出する書類へ実名でサインしていただきます。
		</p>
		<h3>Q4: 謝金受け取りについて</h3>
		<p>
			謝金受取は電気通信大学に来ていただいて、受領書を書いていただきます。
			<red style="color: red; font-weight: bold;">
				謝金を受け取っていただけない、あるいは受領書へサインしていただけない場合は参加できません。
				受領書は住所と実名のサインが必要です。
			</red>
		</p>
	</div>
</div>

<style lang="scss">
	.center {
		max-width: 95vw;
		margin: auto;
	}

	.centered-item {
		max-width: $form-item-width;
		margin: auto;
		display: block;
	}
</style>
