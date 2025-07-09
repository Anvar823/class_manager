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

<header class="header">
	<a href="/" class="logo">
		<h1>Class Assignment Manager</h1>
	</a>
	<nav class="nav">
		<a href="/about" class="nav-link">About</a>
		<a href="#" class="nav-link" on:click|preventDefault={() => handleNavigation('/assignments')}>
			Go to Assignments
		</a>
		{#if isAuthenticated}
			<a href="#" class="nav-link" on:click|preventDefault={() => handleNavigation('/logout')}>
				Log Out
			</a>
		{:else}
			<a href="/login" class="nav-link">Log In</a>
		{/if}
	</nav>
</header>

<style>
	.header {
		background: #3730a3;
		padding: 1.5rem;
		color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}

	.logo {
		text-decoration: none;
		color: inherit;
	}

	.logo h1 {
		font-size: 2rem;
		font-weight: 800;
		letter-spacing: 1px;
		margin: 0;
	}

	.nav {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.nav-link {
		text-decoration: none;
		color: inherit;
		font-size: 2rem;
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.header {
			flex-direction: column;
			align-items: flex-start;
			padding: 1rem;
		}

		.logo h1 {
			font-size: 1.5rem;
		}

		.nav {
			width: 100%;
			justify-content: space-around;
			margin-top: 1rem;
		}

		.nav-link {
			font-size: 1.3rem;
		}
	}
</style>
