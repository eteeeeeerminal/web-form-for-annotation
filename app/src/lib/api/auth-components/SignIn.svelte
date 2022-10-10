<script lang="ts">
	import firebase from 'firebase/compat/app';
	import { auth } from '../firebase';
	import 'firebaseui/dist/firebaseui.css';
	import { onMount } from 'svelte';

	onMount(() => {
		import('firebaseui').then((firebaseui) => {
			const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
			ui.start('#firebaseui-auth-container', {
				signInSuccessUrl: '/',
				signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
			});
		});
	});
</script>

<div id="firebaseui-auth-container" />
