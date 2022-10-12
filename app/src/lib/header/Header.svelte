<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Button, { Label } from '@smui/button';

	import { currentUser } from '$lib/api/auth';
	import UserHeaderItems from './UserHeaderItems.svelte';
</script>

<header>
	<TopAppBar variant="static" prominent={false} dense={true}>
		<Row>
			<Section>
				<Title><Button href="/">Web Form For Annotation</Button></Title>
			</Section>
			<Section align="end" toolbar>
				{#if $currentUser == null}
					<Button href="/sign-in" color="secondary" variant="unelevated">
						<Label>Sign in</Label>
					</Button>
				{:else}
					<UserHeaderItems currentUser={$currentUser} />
				{/if}
			</Section>
		</Row>
	</TopAppBar>
</header>
