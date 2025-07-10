<script lang="ts">
	import { onMount } from 'svelte';
	import { getAssignmentById, updateAssignment } from '$lib/services/firebase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let title = '';
	let description = '';
	$: assignmentId = $page.params.id;

	onMount(async () => {
		const assignment = await getAssignmentById(assignmentId);
		title = assignment.title;
		description = assignment.description;
	});

	const saveAssignment = async () => {
		await updateAssignment(assignmentId, { title, description });
		alert('Assignment saved!');
		goto('/assignments');
	};
</script>

<svelte:head>
	<title>Author</title>
	<meta name="author" content="Anvar Gilmiev" />
	<meta name="description" content="Class Assignment Application" />
</svelte:head>

<div
	style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f8fafc 0%,#e0e7ff 100%);"
>
	<div
		style="background:white;padding:2.5rem 2rem 2rem 2rem;border-radius:1.25rem;box-shadow:0 4px 24px rgba(0,0,0,0.08);min-width:340px;text-align:center;"
	>
		<h1 style="font-size:2rem;font-weight:700;margin-bottom:1.5rem;color:#3730a3;">
			Edit Assignment
		</h1>
		<form
			on:submit|preventDefault={saveAssignment}
			style="display:flex;flex-direction:column;gap:1.2rem;"
		>
			<input
				type="text"
				placeholder="Title"
				bind:value={title}
				required
				style="padding:0.7rem 1rem;border:1px solid #c7d2fe;border-radius:0.6rem;font-size:1rem;"
			/>
			<textarea
				placeholder="Description"
				bind:value={description}
				rows="4"
				style="padding:0.7rem 1rem;border:1px solid #c7d2fe;border-radius:0.6rem;font-size:1rem;"
			></textarea>
			<div style="display:flex;gap:1rem;justify-content:center;">
				<button
					type="submit"
					style="padding:0.7rem 1.3rem;background:#6366f1;color:white;border:none;border-radius:0.75rem;font-weight:500;font-size:1rem;cursor:pointer;transition:background 0.2s;"
					>Save</button
				>
				<a
					href="/assignments"
					style="display:inline-block;padding:0.7rem 1.3rem;background:#e5e7eb;color:#3730a3;border-radius:0.75rem;text-decoration:none;font-weight:500;font-size:1rem;"
					>Cancel</a
				>
			</div>
		</form>
	</div>
</div>
