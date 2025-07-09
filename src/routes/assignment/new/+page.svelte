<script lang="ts">
	import { createAssignment } from '$lib/services/firebase';
	import { goto } from '$app/navigation';

	let title = '',
		description = '',
		due_date = '';
  let errors = { title: '', description: '', due_date: '' };

	const validate = () => {
    errors = { title: '', description: '', due_date: '' };
    let isValid = true;

    if (!title) {
      errors.title = 'Title is required';
      isValid = false;
    } else if (title.length < 3 || title.length > 50) {
      errors.title = 'Title must be between 3 and 50 characters';
      isValid = false;
    } else if (/^\d+$/.test(title)) {
      errors.title = 'Title cannot consist only of numbers';
      isValid = false;
    }

    if (!description) {
      errors.description = 'Description is required';
      isValid = false;
    } else if (description.length < 10 || description.length > 500) {
      errors.description = 'Description must be between 10 and 500 characters';
      isValid = false;
    }
	
    if (!due_date) {
      errors.due_date = 'Completion date is required';
      isValid = false;
    }

    return isValid;
	};

	const submit = async () => {
		if (!validate()) return;
    await createAssignment({ title, description, due_date });
		goto('/assignments');
	};
</script>

<div class="container">
	<div class="card">
		<h1>new task</h1>
		<form on:submit|preventDefault={submit}>
			<div class="form-group">
				<label for="title">title</label>
        <input id="title" type="text" bind:value={title} class="input-field" />
				{#if errors.title}
					<span class="error">{errors.title}</span>
				{/if}
			</div>

			<div class="form-group">
				<label for="description">description</label>
        <textarea id="description" bind:value={description} rows="4" class="input-field"></textarea>
        {#if errors.description}
          <span class="error">{errors.description}</span>
				{/if}
			</div>

      <div class="form-group">
        <label for="due_date">completion date</label>
        <input id="due_date" type="date" bind:value={due_date} class="input-field" />
        {#if errors.due_date}
          <span class="error">{errors.due_date}</span>
        {/if}
	</div>

      <div class="button-group">
        <button type="submit">create</button>
        <a href="/assignments">cancellation</a>
</div>
    </form>
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

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: #3730a3;
	}

  .input-field {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #c7d2fe;
		border-radius: 0.75rem;
		font-size: 1rem;
    font-family: inherit;
		color: #3730a3;
	}

  .input-field:focus {
    border-color: #6366f1;
    outline: none;
	}

  .error {
    color: #e53e3e;
    font-size: 0.875rem;
    margin-top: 0.25rem;
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
</style>