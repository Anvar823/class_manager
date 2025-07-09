<script>
  import { goto } from '$app/navigation';
  import { auth } from '$lib/firebaseConfig';
  import { onAuthStateChanged } from 'firebase/auth';

  let isAuthenticated = false;

  onAuthStateChanged(auth, (user) => {
    isAuthenticated = !!user;
  });

  const handleNavigation = () => {
    if (isAuthenticated) {
      goto('/assignments');
    } else {
      goto('/login');
    }
  };
</script>

<div
	style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f8fafc 0%,#e0e7ff 100%);"
>
	<div
		style="background:white;padding:3rem 2.5rem;border-radius:1.5rem;box-shadow:0 4px 24px rgba(0,0,0,0.1);min-width:360px;text-align:center;"
	>
		<h1
			style="font-size:2.5rem;font-weight:800;margin-bottom:2rem;color:#3730a3;letter-spacing:-1px;"
		>
			class assignment manager
		</h1>
		<p style="font-size:1.2rem;color:#444;margin-bottom:2.5rem;">
			manage and organize your class assignments efficiently. create, view, and edit assignments to
			stay on top of your academic tasks.
		</p>
		<div style="display:flex;justify-content:center;gap:1.5rem;">
			<a
        href="#"
        on:click|preventDefault={handleNavigation}
				style="display:inline-block;padding:0.8rem 1.6rem;background:#6366f1;color:white;border-radius:0.8rem;text-decoration:none;font-weight:600;font-size:1.2rem;box-shadow:0 2px 8px rgba(99,102,241,0.1);transition:background 0.2s;"
			>
        go to assignments
      </a>
			<a
				href="/about"
				style="display:inline-block;padding:0.8rem 1.6rem;background:#e5e7eb;color:#3730a3;border-radius:0.8rem;text-decoration:none;font-weight:600;font-size:1.2rem;box-shadow:0 2px 8px rgba(0,0,0,0.1);transition:background 0.2s;"
			>
        about
      </a>
		</div>
	</div>
</div>
