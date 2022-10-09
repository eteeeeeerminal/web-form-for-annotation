<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Button, { Label } from '@smui/button';

	import { currentUser } from '$lib/api/auth';
	import UserHeaderItems from './UserHeaderItems.svelte';
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
					<UserHeaderItems currentUser={$currentUser} />
				{/if}
			</Section>
		</Row>
	</TopAppBar>
</header>
