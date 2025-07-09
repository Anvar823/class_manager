<script>
	import { logOut } from '$lib/auth';
	import { goto } from '$app/navigation';

	const handleLogOut = async () => {
		try {
			await logOut();
			goto('/');
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};

	handleLogOut();
</script>

<div class="container">
	<div class="card">
		<h1>Logging Out...</h1>
	</div>
</div>

<style>
	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
		padding: 2rem;
	}

	.card {
		background: white;
		padding: 2.5rem 2rem;
		border-radius: 1.25rem;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
		min-width: 340px;
		text-align: center;
		width: 100%;
		max-width: 400px;
		overflow: hidden;
	}

	.card h1 {
		font-size: 2.2rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
		color: #3730a3;
		letter-spacing: -1px;
	}
</style>
