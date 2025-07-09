<script lang="ts">
	import { getAssignments, deleteAssignment } from '$lib/services/firebase';
	let assignments = [];

	const load = async () => {
    	const data = await getAssignments();
    	assignments = data.filter(
        	(a) =>
            	!(
                	(!a.title || a.title.trim() === "") &&
                	(!a.description || a.description.trim() === "") &&
                	(!a.due_date || a.due_date.trim() === "") &&
                	a.status === "opened"
            	)
    	);
	};

	const remove = async (id) => {
		await deleteAssignment(id);
		await load();
	};

	load();
</script>

<div class="container">
	<div class="card">
		<h1>all tasks</h1>
		<a href="/assignment/new">create a new task</a>
		<ul class="assignment-list">
			{#each assignments as assignment (assignment.id)}
				<li class="assignment-item">
					<div class="assignment-content">
						<a href={`/assignment/${assignment.id}`}>{assignment.title}</a>
						<div class="assignment-details">
							<p class="assignment-description">{assignment.description}</p>
              <p class="assignment-status">status: {assignment.status}</p>
              <p class="assignment-due-date">completion date: {assignment.due_date}</p>
						</div>
					</div>
					<button on:click={() => remove(assignment.id)}>delete</button>
				</li>
			{/each}
		</ul>
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

	.assignment-list {
		margin: 0;
		padding: 0;
		list-style-type: none;
		margin-top: 2rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.assignment-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border-radius: 0.75rem;
		margin-bottom: 1rem;
		background: white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		width: 100%;
		word-wrap: break-word;
	}

	.assignment-item a {
		color: white;
		text-decoration: none;
		font-weight: 500;
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

	.assignment-description {
	color: #3730a3;
	padding: 0.25rem 0.5rem;
	border-radius: 0.5rem;
	margin-left: 1rem;
	white-space: nowrap;
	overflow-x: auto;
	max-width: 200px;
	scrollbar-width: none; 
	-ms-overflow-style: none; 
	}

	.assignment-description::-webkit-scrollbar {
		display: none; 
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

	.assignment-details p {
		margin: 0.25rem 0;
		color: #3730a3;
	}

  .assignment-status {
    background-color: #e0e7ff;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    color: #3730a3;
    margin-top: 0.5rem;
  }

  .assignment-due-date {
    background-color: #f8fafc;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    font-weight: 700; /* Make the text bold */
    color: #3730a3;
    margin-top: 0.5rem;
  }
</style>
