<script lang="ts">
	import { onMount } from 'svelte';
	import { getAssignmentById } from '$lib/services/firebase';
	import { goto } from '$app/navigation';

	let assignment = null;

	export let data = {
		id: ''
	};

	onMount(async () => {
		assignment = await getAssignmentById(data.id);
	});

	const backToAssignments = () => {
		goto('/assignments');
	};
</script>

<div class="container">
	{#if assignment}
		<div class="card">
			<h1>{assignment.title}</h1>
			<p><strong>description:</strong> {assignment.description}</p>
			<p><strong>status:</strong> {assignment.status}</p>
			<p><strong>completion date:</strong> {assignment.due_date}</p>
			<a href="#" on:click={backToAssignments}>back to tasks</a>
		</div>
	{:else}
		<p>loading...</p>
	{/if}
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
		max-width: 600px;
		overflow: hidden;
	}

	.card h1 {
		font-size: 2.2rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
		color: #3730a3;
		letter-spacing: -1px;
	}

	.card p {
		font-size: 1.1rem;
		color: #444;
		margin-bottom: 1rem;
	}

	.card a {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: #6366f1;
		color: white;
		border-radius: 0.75rem;
		text-decoration: none;
		font-weight: 500;
		font-size: 1.1rem;
		box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
		transition: background 0.2s;
	}

	.card a:hover {
		background: #4f46e5;
	}
</style>
