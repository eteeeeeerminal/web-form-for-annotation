<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Button, { Label } from '@smui/button';

	import { currentUser } from '$lib/api/auth';
	import UserHeaderItems from './UserHeaderItems.svelte';
</script>

<header>
	<TopAppBar variant="static" style="background: whitesmoke;" prominent={false} dense={true}>
		<Row>
			<Section>
				<Title>
					<Button href="/" color="secondary">
						<div class="title">Web Form For Annotation</div>
					</Button>
				</Title>
			</Section>
			<Section align="end" toolbar>
				{#if $currentUser == null}
					<Button href="/sign-in" variant="unelevated">
						<Label><div class="primary-button">Sign in</div></Label>
					</Button>
				{:else}
					<UserHeaderItems currentUser={$currentUser} />
				{/if}
			</Section>
		</Row>
	</TopAppBar>
</header>

<style lang="scss">
	.title {
		color: $text-color;
	}

	.primary-button {
		color: $background-color2;
	}
</style>
