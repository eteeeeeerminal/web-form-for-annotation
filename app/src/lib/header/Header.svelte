<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import type { MenuComponentDev } from '@smui/menu';
	import Menu from '@smui/menu';
	import { Anchor } from '@smui/menu-surface';
	import List, { Item, Text, Separator } from '@smui/list';
	import Button, { Label } from '@smui/button';

	import { currentUser, signOut } from '$lib/api/auth';

	let menu: MenuComponentDev;
	let anchor: HTMLDivElement;
	let anchorClasses: { [k: string]: boolean } = {};
</script>

<header>
	<TopAppBar variant="static" prominent={false} dense={true} color="secondary">
		<Row>
			<Section>
				<Title><Button color="secondary" href="/">Web Form For Annotation</Button></Title>
			</Section>
			<Section align="end" toolbar>
				{#if $currentUser == null}
					<Button href="/sign-in" variant="outlined">
						<Label>Sign in</Label>
					</Button>
				{:else}
					<Button style={'margin:5px;'} href="/dataset" variant="unelevated">
						<Label>Dataset</Label>
					</Button>
					<div
						class={Object.keys(anchorClasses).join(' ')}
						style={'margin: 0px 15px'}
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
							<Label>{$currentUser.displayName}</Label>
						</Button>
						<Menu
							bind:this={menu}
							anchor={false}
							bind:anchorElement={anchor}
							anchorCorner="BOTTOM_LEFT"
						>
							<List>
								<Item on:SMUI:action={signOut}>Sign Out</Item>
							</List>
						</Menu>
					</div>
				{/if}
			</Section>
		</Row>
	</TopAppBar>
</header>
