<script lang="ts">
	import { getContext } from 'svelte';
	import type { Modal } from 'svelte-simple-modal';
	import Button from '@smui/button';
	import type { MenuComponentDev } from '@smui/menu';
	import Menu from '@smui/menu';
	import { Anchor } from '@smui/menu-surface';
	import List, { Item, Separator } from '@smui/list';

	import { signOut } from '$lib/api/auth';
	import type { User } from '$lib/api/auth';
	import PrimaryButton from '$lib/button/PrimaryButton.svelte';
	import DeleteUserPopup from './DeleteUserPopup.svelte';

	export let currentUser: User;

	let menu: MenuComponentDev;
	let anchor: HTMLDivElement;
	let anchorClasses: { [k: string]: boolean } = {};

	const { open } = getContext('simple-modal') as Modal;
	const showDeletePopup = () => open(DeleteUserPopup, {});
</script>

<PrimaryButton href="/dataset" label="Dataset" />

<div
	class={Object.keys(anchorClasses).join(' ')}
	style={'margin: 0rem 1rem'}
	use:Anchor={{
		addClass: (className) => {
			if (!anchorClasses[className]) {
				anchorClasses[className] = true;
			}
		},
		removeClass: (className) => {
			if (anchorClasses[className]) {
				delete anchorClasses[className];
				anchorClasses = anchorClasses;
			}
		}
	}}
	bind:this={anchor}
>
	<Button
		on:click={() => menu.setOpen(true)}
		color="secondary"
		variant="outlined"
		style="border: thin solid lightgray"
	>
		<div class="secondary-button">{currentUser.displayName}</div>
	</Button>
	<Menu bind:this={menu} anchor={false} bind:anchorElement={anchor} anchorCorner="BOTTOM_LEFT">
		<List>
			<Item on:SMUI:action={showDeletePopup}>Delete User</Item>
			<Separator />
			<Item on:SMUI:action={signOut}>Sign Out</Item>
		</List>
	</Menu>
</div>

<style lang="scss">
	.primary-button {
		color: $background-color2;
	}

	.secondary-button {
		color: $text-color;
	}
</style>
