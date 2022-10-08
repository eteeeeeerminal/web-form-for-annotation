<script lang="ts">
	import { currentUser } from '$lib/api/auth';
	import Nav from './Nav.svelte';
	import NavItem from './NavItem.svelte';
	import SignOut from '$lib/api/auth-components/SignOut.svelte';
</script>

<header>
	<div class="system-name"><a href="./">Web Form For Annotation</a></div>
	<Nav>
		<NavItem>Answer</NavItem>
		{#if $currentUser == null}
			<NavItem href="./sign-in">ログインボタン</NavItem>
		{:else}
			<NavItem>ユーザー名/ドロップダウンメニュー</NavItem>
			<NavItem><SignOut /></NavItem>
		{/if}
	</Nav>
</header>

<style>
	header {
		background-color: whitesmoke;
	}

	.system-name {
		display: inline-block;
	}
</style>
