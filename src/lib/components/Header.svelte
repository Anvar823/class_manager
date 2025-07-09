<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebaseConfig';
	import { onAuthStateChanged } from 'firebase/auth';

	let isAuthenticated = false;

	onAuthStateChanged(auth, (user) => {
		isAuthenticated = !!user;
	});

	const handleNavigation = (path) => {
		if (path === '/assignments' && !isAuthenticated) {
			goto('/login');
		} else {
			goto(path);
		}
	};
</script>

<header
	style="background: #3730a3; padding: 1.5rem; color: white; display: flex; justify-content: space-between; align-items: center;"
>
	<a href="/" style="text-decoration: none; color: inherit;">
		<h1 style="font-size: 2rem; font-weight: 800; letter-spacing: 1px;">
			Class Assignment Manager
		</h1>
	</a>
	<nav style="display: flex; gap: 2rem;">
		<a
			href="/about"
			style="text-decoration: none; color: inherit; font-size: 2rem; font-weight: 600;">About</a
		>
		<a
			href="#"
			on:click|preventDefault={() => handleNavigation('/assignments')}
			style="text-decoration: none; color: inherit; font-size: 2rem; font-weight: 600;"
			>Go to Assignments</a
		>
		{#if isAuthenticated}
			<a
				href="#"
				on:click|preventDefault={() => handleNavigation('/logout')}
				style="text-decoration: none; color: inherit; font-size: 2rem; font-weight: 600;">Log Out</a
			>
		{:else}
			<a
				href="/login"
				style="text-decoration: none; color: inherit; font-size: 2rem; font-weight: 600;">Log In</a
			>
		{/if}
	</nav>
</header>
