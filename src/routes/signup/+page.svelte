<script>
	import Header from '$lib/components/Header.svelte';
	import { signUp } from '$lib/auth';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let error = '';

	const handleSignUp = async () => {
		try {
			await signUp(email, password);
			goto('/assignments');
		} catch (err) {
			error = err.message;
		}
	};
</script>

<svelte:head>
  <title>Author</title>
  <meta name="author" content="Anvar Gilmiev" />
  <meta name="description" content="Class Assignment Application" />
</svelte:head>

<Header />

<div class="container">
	<div class="card">
		<h1>Sign Up</h1>
		<form on:submit|preventDefault={handleSignUp}>
			<div class="form-group">
				<label for="email">Email</label>
				<input id="email" type="email" bind:value={email} class="input-field" required />
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input id="password" type="password" bind:value={password} class="input-field" required />
			</div>
			{#if error}
				<p class="error">{error}</p>
			{/if}
			<div class="button-group">
				<button type="submit">Sign Up</button>
			</div>
		</form>
		<div class="login-link">
			<p>Already have an account? <a href="/login">Log In</a></p>
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			sans-serif;
	}

	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
		padding: 1rem;
	}

	.card {
		background: white;
		padding: 2rem 1.5rem;
		border-radius: 1rem;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
		width: 100%;
		max-width: 400px;
		box-sizing: border-box;
	}

	.card h1 {
		font-size: 1.8rem;
		font-weight: 700;
		margin-bottom: 1.25rem;
		color: #3730a3;
		letter-spacing: -0.5px;
		text-align: center;
	}

	.form-group {
		margin-bottom: 1.25rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: #3730a3;
		text-align: left;
		font-size: 0.95rem;
	}

	.input-field {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #c7d2fe;
		border-radius: 0.75rem;
		font-size: 1rem;
		font-family: inherit;
		color: #3730a3;
		box-sizing: border-box;
	}

	.input-field:focus {
		border-color: #6366f1;
		outline: none;
		box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
	}

	.error {
		color: #e53e3e;
		font-size: 0.875rem;
		margin: -0.5rem 0 0.75rem 0;
		text-align: left;
	}

	.button-group {
		display: flex;
		justify-content: center;
		margin-top: 0.5rem;
	}

	.button-group button {
		width: 100%;
		padding: 0.75rem;
		border-radius: 0.75rem;
		font-weight: 500;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s;
		background: #6366f1;
		color: white;
		border: none;
	}

	.button-group button:hover {
		background: #4f46e5;
		transform: translateY(-1px);
	}

	.button-group button:active {
		transform: translateY(0);
	}

	.login-link {
		margin-top: 1.5rem;
		text-align: center;
	}

	.login-link p {
		font-size: 0.95rem;
		color: #64748b;
		margin: 0;
	}

	.login-link a {
		color: #6366f1;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s;
	}

	.login-link a:hover {
		color: #4f46e5;
		text-decoration: underline;
	}

	/* Responsive adjustments */
	@media (max-width: 480px) {
		.container {
			padding: 1rem;
			justify-content: flex-start;
			padding-top: 2rem;
		}

		.card {
			padding: 1.5rem 1.25rem;
			border-radius: 0.75rem;
		}

		.card h1 {
			font-size: 1.6rem;
			margin-bottom: 1rem;
		}

		.form-group {
			margin-bottom: 1rem;
		}

		.input-field {
			padding: 0.65rem;
			font-size: 0.95rem;
		}

		.button-group button {
			padding: 0.7rem;
			font-size: 0.95rem;
		}
	}

	@media (max-width: 991px) {
		.card {
			padding: 1.25rem 1rem;
		}
		.card h1 {
			font-size: 1.5rem;
		}

		.login-link p {
			font-size: 0.9rem;
		}
	}
</style>
