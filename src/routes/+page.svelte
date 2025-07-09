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
		style="background:white;padding:3rem 2.5rem;border-radius:1.5rem;box-shadow:0 4px 24px rgba(0,0,0,0.1);min-width:360px;text-align:center;"
	>
		<h1
			style="font-size:2.5rem;font-weight:800;margin-bottom:2rem;color:#3730a3;letter-spacing:-1px;"
		>
			Class Assignment Manager
		</h1>
		<p style="font-size:1.2rem;color:#444;margin-bottom:2.5rem;">
			Manage and organize your class assignments efficiently. Create, view, and edit assignments to
			stay on top of your academic tasks.
		</p>
	</div>
</div>
