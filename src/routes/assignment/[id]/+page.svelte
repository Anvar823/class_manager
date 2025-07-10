<script lang="ts">
	import { onMount } from 'svelte';
	import { getAssignmentById, updateAssignmentStatus } from '$lib/services/firebase';
	import { goto } from '$app/navigation';

	let assignment = null;
	let newStatus = '';

	export let data = {
		id: ''
	};

	onMount(async () => {
		assignment = await getAssignmentById(data.id);
		newStatus = assignment.status;
	});

	const backToAssignments = () => {
		goto('/assignments');
	};

	const updateStatus = async () => {
		if (newStatus !== assignment.status) {
			await updateAssignmentStatus(data.id, newStatus);
			assignment.status = newStatus;
		}
	};

	const editAssignment = () => {
		goto(`/assignment/${data.id}/edit`);
	};
</script>

<svelte:head>
	<title>Author</title>
	<meta name="author" content="Anvar Gilmiev" />
	<meta name="description" content="Class Assignment Application" />
</svelte:head>

<div class="container">
	{#if assignment}
		<div class="card">
			<h1>{assignment.title}</h1>

			<div class="assignment-description">
				<strong>description:</strong>
				{assignment.description}
			</div>
			<div class="assignment-status">
				<strong>status:</strong>
				{assignment.status}
			</div>
			<div class="assignment-due-date">
				<strong>completion date:</strong>
				{assignment.due_date}
			</div>

			<div class="form-group">
				<label for="status">update status:</label>
				<select id="status" bind:value={newStatus}>
					<option value="in process">in process</option>
					<option value="completed">completed</option>
					<option value="postponed">postponed</option>
				</select>
			</div>

			<div class="button-group">
				<button on:click={updateStatus}>update status</button>
				<button on:click={editAssignment}>edit assignment</button>
				<a href="#" on:click={backToAssignments}>back to tasks</a>
			</div>
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

	.assignment-description {
		background-color: #f8fafc;
		padding: 1rem;
		border-radius: 0.75rem;
		margin-bottom: 1rem;
		color: #3730a3;
		font-size: 1.1rem;
		line-height: 1.6;
	}

	.assignment-status {
		background-color: #e0e7ff;
		padding: 0.75rem;
		border-radius: 0.75rem;
		margin-bottom: 1rem;
		color: #3730a3;
		font-size: 1.1rem;
		line-height: 1.6;
	}

	.assignment-due-date {
		background-color: #f8fafc;
		padding: 0.75rem;
		border-radius: 0.75rem;
		margin-bottom: 1rem;
		color: #3730a3;
		font-size: 1.1rem;
		line-height: 1.6;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: #3730a3;
	}

	.form-group select {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #c7d2fe;
		border-radius: 0.75rem;
		font-size: 1rem;
		font-family: inherit;
		color: #3730a3;
	}

	.button-group {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.button-group button,
	.button-group a {
		padding: 0.75rem 1.5rem;
		border-radius: 0.75rem;
		font-weight: 500;
		font-size: 1.1rem;
		cursor: pointer;
		transition: background 0.2s;
	}

	.button-group button {
		background: #6366f1;
		color: white;
		border: none;
	}

	.button-group button:hover {
		background: #4f46e5;
	}

	.button-group a {
		background: #e5e7eb;
		color: #3730a3;
		text-decoration: none;
	}

	.button-group a:hover {
		background: #d1d5db;
	}

	@media (max-width: 600px) {
		.card {
			padding: 1.5rem 1rem;
		}

		.card h1 {
			font-size: 1.8rem;
		}

		.form-group {
			margin-bottom: 1rem;
		}

		.form-group select {
			padding: 0.5rem;
			font-size: 0.9rem;
		}

		.button-group button,
		.button-group a {
			padding: 0.5rem 1rem;
			font-size: 0.9rem;
		}
	}
</style>
