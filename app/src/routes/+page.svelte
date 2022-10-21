<script lang="ts">
	let showEmail = false;
</script>

<div class="center">
	<h1>Web Form For Annotation</h1>
	<p>
		このWebサイトは2022年度の電気通信大学坂本・松倉研究室のアノテーション実験用に作成されました。
	</p>
	<p>
		実験参加希望者は、右上のボタンからサインインしてください。<br />
		サインインしたら、DATASETページへ移動して、アノテーションするデータセットを選んでください。
	</p>
	<p>プログラムの製作者・サイト管理者・VTuber データセット作成: 田中 久温</p>
	<p>
		お問い合わせ:
		{#if showEmail}
			&#x74;&#x31;&#x39;&#x31;&#x30;&#x34;&#x30;&#x31;&#x40;&#x65;&#x64;&#x75;&#x2e;&#x63;&#x63;&#x2e;&#x75;&#x65;&#x63;&#x2e;&#x61;&#x63;&#x2e;&#x6a;&#x70;
		{:else}
			<button
				on:click={() => {
					showEmail = true;
				}}>メールアドレスを表示</button
			>
		{/if}
	</p>

	<h2>使用したライブラリ等</h2>
	フロントエンド
	<ul>
		<li>Svelte: <a href="https://svelte.jp/">https://svelte.jp/</a></li>
		<li>Svelte-kit: <a href="https://kit.svelte.jp/">https://kit.svelte.jp/</a></li>
		<li>
			Svelte Material UI: <a href="https://sveltematerialui.com/">https://sveltematerialui.com/</a>
		</li>
		<li>
			svelte-simple-modal: <a href="https://github.com/flekschas/svelte-simple-modal"
				>https://github.com/flekschas/svelte-simple-modal</a
			>
		</li>
		<li>Felte: <a href="https://felte.dev/">https://felte.dev/</a></li>
		<li>yup: <a href="https://github.com/jquense/yup">https://github.com/jquense/yup</a></li>
		<li>sass: <a href="https://github.com/sass/dart-sass">https://github.com/sass/dart-sass</a></li>
	</ul>
	バックエンド (Firebase:<a href="https://firebase.google.com/?hl=ja"
		>https://firebase.google.com/?hl=ja</a
	>)
	<ul>
		<li>Hosting: Firebase Hosting</li>
		<li>データベース: Firebase Firestore</li>
		<li>認証まわり: Firebase Authentication</li>
	</ul>
</div>

<style lang="scss">
	.center {
		margin: auto;
		width: 100%;
		max-width: $default-width;
	}
</style>
