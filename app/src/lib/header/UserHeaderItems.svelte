<script lang="ts">
	import Button, { Label } from '@smui/button';
	import type { MenuComponentDev } from '@smui/menu';
	import Menu from '@smui/menu';
	import { Anchor } from '@smui/menu-surface';
	import List, { Item, Text, Separator } from '@smui/list';

	import { signOut } from '$lib/api/auth';
	import type { User } from '$lib/api/auth';

	export let currentUser: User;

	let menu: MenuComponentDev;
	let anchor: HTMLDivElement;
	let anchorClasses: { [k: string]: boolean } = {};
</script>

<Button style={'margin:5px;'} href="/dataset" color="secondary" variant="unelevated">
	<Label>Dataset</Label>
</Button>
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
	<Button on:click={() => menu.setOpen(true)} variant="outlined">
		<Label>{currentUser.displayName}</Label>
	</Button>
	<Menu bind:this={menu} anchor={false} bind:anchorElement={anchor} anchorCorner="BOTTOM_LEFT">
		<List>
			<Item on:SMUI:action={signOut}>Sign Out</Item>
		</List>
	</Menu>
</div>
