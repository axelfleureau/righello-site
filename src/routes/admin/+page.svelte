<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  export let form: ActionData;
  let loading = false;
</script>

<svelte:head>
  <title>Admin – Righello</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center" style="background: #0a0a0a;">
  <div style="width: 100%; max-width: 400px; padding: 2rem;">
    <div style="text-align: center; margin-bottom: 2rem;">
      <img src="/logo-white.png" alt="Righello" style="height: 36px; width: auto; margin: 0 auto 1.5rem;" />
      <h1 style="color: #fff; font-size: 1.5rem; font-weight: 700; margin: 0 0 0.5rem;">Area Admin</h1>
      <p style="color: rgba(255,255,255,0.5); font-size: 0.875rem; margin: 0;">Inserisci la password per accedere</p>
    </div>

    {#if form?.error}
      <div style="background: rgba(214,72,126,0.15); border: 1px solid rgba(214,72,126,0.4); border-radius: 0.75rem; padding: 0.875rem 1rem; margin-bottom: 1.25rem; color: #f9a8c9; font-size: 0.875rem;">
        {form.error}
      </div>
    {/if}

    <form
      method="POST"
      use:enhance={() => {
        loading = true;
        return async ({ update }) => {
          await update();
          loading = false;
        };
      }}
      style="display: flex; flex-direction: column; gap: 1rem;"
    >
      <div>
        <label for="password" style="display: block; color: rgba(255,255,255,0.6); font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem;">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autocomplete="current-password"
          placeholder="••••••••"
          style="width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.75rem; padding: 0.875rem 1rem; color: #fff; font-size: 1rem; outline: none; box-sizing: border-box;"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style="background: linear-gradient(135deg, #D6487E, #06B6D4); border: none; border-radius: 0.75rem; padding: 0.875rem 1rem; color: #fff; font-size: 1rem; font-weight: 600; cursor: {loading ? 'not-allowed' : 'pointer'}; opacity: {loading ? 0.7 : 1}; transition: opacity 0.2s;"
      >
        {loading ? 'Accesso...' : 'Accedi'}
      </button>
    </form>
  </div>
</div>
