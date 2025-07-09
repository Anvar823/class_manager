<script>
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
  <title>Author</title>
  <meta name="author" content="Anvar Gilmiev">
  <meta name="description" content="Class Assignment Application">
</svelte:head>

<Header />

<div
	style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f8fafc 0%,#e0e7ff 100%);"
>
	<div
		style="background:white;padding:2.5rem 2rem 2rem 2rem;border-radius:1.25rem;box-shadow:0 4px 24px rgba(0,0,0,0.08);min-width:340px;text-align:center;"
	>
		<h1 style="font-size:2rem;font-weight:700;margin-bottom:1rem;color:#3730a3;">
			About Class Assignment Manager
		</h1>
		<p style="font-size:1.1rem;color:#444;margin-bottom:2rem;">
			This app helps you manage and organize class assignments efficiently. Easily create, view, and
			edit assignments to stay on top of your academic tasks.
		</p>
		<a
			href="/"
			style="display:inline-block;padding:0.7rem 1.3rem;background:#6366f1;color:white;border-radius:0.75rem;text-decoration:none;font-weight:500;font-size:1rem;box-shadow:0 2px 8px rgba(99,102,241,0.08);transition:background 0.2s;"
			>Back to Home</a
		>
	</div>
</div>
