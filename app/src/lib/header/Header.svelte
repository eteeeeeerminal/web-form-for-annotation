<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Button, { Label } from '@smui/button';

	import { currentUser } from '$lib/api/auth';
	import UserHeaderItems from './UserHeaderItems.svelte';
	import PrimaryButton from '$lib/button/PrimaryButton.svelte';
	import SecondaryButton from '$lib/button/SecondaryButton.svelte';
</script>

<header>
	<TopAppBar variant="static" style="background: whitesmoke;" prominent={false} dense={true}>
		<Row>
			<Section>
				<Title>
					<SecondaryButton href="/" label="Web Form For Annotation" />
				</Title>
			</Section>
			<Section align="end" toolbar>
				{#if $currentUser == null}
					<PrimaryButton href="/sign-in" label="Sign in" />
				{:else}
					<UserHeaderItems currentUser={$currentUser} />
				{/if}
			</Section>
		</Row>
	</TopAppBar>
</header>
