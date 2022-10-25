<script lang="ts">
	import { getContext } from 'svelte';
	import type { Modal } from 'svelte-simple-modal';

	import { currentUser, deleteUser } from '$lib/api/auth';
	import PrimaryButton from '$lib/button/PrimaryButton.svelte';
	import SecondaryButton from '$lib/button/SecondaryButton.svelte';

	const { close } = getContext('simple-modal') as Modal;
</script>

<p>本当にアカウントを削除しますか？</p>
<p><b>アカウントを削除すると二度と復旧できません。</b></p>
<p>また、回答していただいたデータは実験終了後に削除されます。</p>

<PrimaryButton
	label="削除する"
	on:click={() => {
		if ($currentUser != null) deleteUser($currentUser);
		close();
	}}
/>
<SecondaryButton
	label="削除しない"
	on:click={() => {
		close();
	}}
/>
