<script>
  import { signIn } from '$lib/auth';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error = '';

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      goto('/assignments');
    } catch (err) {
      error = err.message;
    }
  };
</script>

<div class="container">
  <div class="card">
    <h1>Log In</h1>
    <form on:submit|preventDefault={handleSignIn}>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" bind:value={email} class="input-field" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" bind:value={password} class="input-field" required />
      </div>
      {#if error}
        <p class="error">{error}</p>
      {/if}
      <div class="button-group">
        <button type="submit">Log In</button>
      </div>
    </form>
    <div class="signup-link">
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
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

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #3730a3;
    text-align: left;
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
    text-align: left;
  }

  .button-group {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .button-group button {
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    font-weight: 500;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.2s;
    background: #6366f1;
    color: white;
    border: none;
  }

  .button-group button:hover {
    background: #4f46e5;
  }

  .signup-link {
    margin-top: 1.5rem;
  }

  .signup-link p {
    font-size: 1rem;
    color: #444;
  }

  .signup-link a {
    color: #6366f1;
    text-decoration: none;
    font-weight: 500;
  }

  .signup-link a:hover {
    text-decoration: underline;
  }
</style>
