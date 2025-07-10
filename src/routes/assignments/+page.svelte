<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { getAssignments, deleteAssignment } from '$lib/services/firebase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebaseConfig';
	import { onAuthStateChanged } from 'firebase/auth';

	let assignments = [];
	let isAuthenticated = false;

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				isAuthenticated = true;
				load();
			} else {
				goto('/login');
			}
		});
	});

	const load = async () => {
		const data = await getAssignments();
		assignments = data.filter(
			(a) =>
				!(
					(!a.title || a.title.trim() === '') &&
					(!a.description || a.description.trim() === '') &&
					(!a.due_date || a.due_date.trim() === '') &&
					a.status === 'opened'
				)
		);
	};

	const remove = async (id) => {
		await deleteAssignment(id);
		await load();
	};
</script>

<svelte:head>
	<title>Author</title>
	<meta name="author" content="Anvar Gilmiev" >
	<meta name="description" content="Class Assignment Application" >
</svelte:head>

{#if isAuthenticated}
	<Header />

	<div class="container">
		<div class="card">
			<h1 class="all-tasks-heading">All Tasks</h1>
			<a href="/assignment/new" class="create-task-button">Create a New Task</a>
			<ul class="assignment-list">
				{#each assignments as assignment (assignment.id)}
					<li class="assignment-item">
						<div class="assignment-content">
							<a href={`/assignment/${assignment.id}`} class="task-title-button"
								>{assignment.title}</a
							>
							<div class="assignment-details">
								<p class="assignment-description">{assignment.description}</p>
								<p class="assignment-status">Status: {assignment.status}</p>
								<p class="assignment-due-date">
									<span class="bold-blue">Completion Date:</span>
									<span class="bold-blue-date">{assignment.due_date}</span>
								</p>
							</div>
						</div>
						<button on:click={() => remove(assignment.id)}>Delete</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

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

	.assignment-list {
		list-style: none;
		padding: 0;
	}

	.assignment-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border-bottom: 1px solid #e0e7ff;
	}

	.assignment-content {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.assignment-details {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-left: 1rem;
	}

	.assignment-description {
		color: #3730a3;
		padding: 0.25rem 0.5rem;
		border-radius: 0.5rem;
		white-space: nowrap;
		overflow-x: auto;
		max-width: 200px;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.assignment-description::-webkit-scrollbar {
		display: none;
	}

	.assignment-status {
		background-color: #e0e7ff;
		padding: 0.25rem 0.5rem;
		border-radius: 0.5rem;
		font-weight: 700;
		color: #3730a3;
		margin-top: 0.5rem;
	}

	.assignment-due-date {
		background-color: #f8fafc;
		padding: 0.25rem 0.5rem;
		border-radius: 0.5rem;
		margin-top: 0.5rem;
	}

	.task-title-button {
		background-color: #6366f1;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 0.75rem;
		text-decoration: none;
		font-weight: 500;
		font-size: 1.1rem;
		transition: background 0.2s;
	}

	.task-title-button:hover {
		background-color: #4f46e5;
	}

	.create-task-button {
		background-color: #6366f1;
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 0.75rem;
		text-decoration: none;
		font-weight: 500;
		font-size: 1.1rem;
		transition: background 0.2s;
		display: inline-block;
		margin-bottom: 1.5rem;
	}

	.create-task-button:hover {
		background-color: #4f46e5;
	}

	.all-tasks-heading {
		font-size: 2.2rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
		color: #3730a3;
		letter-spacing: -1px;
	}

	.bold-blue {
		font-weight: 700;
		color: #3730a3;
	}

	.bold-blue-date {
		font-weight: 700;
		color: #3730a3;
	}

	.assignment-item button {
		background: #e53e3e;
		color: white;
		border: none;
		border-radius: 0.75rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
		transition: background 0.2s;
	}

	.assignment-item button:hover {
		background: #c53030;
	}
</style>
