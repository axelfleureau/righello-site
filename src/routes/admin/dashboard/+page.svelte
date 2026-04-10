<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  type Section = 'hero' | 'showcase' | 'reels' | 'testimonials';

  const sectionLabels: Record<Section, string> = {
    hero: 'Video Hero (iPhone)',
    showcase: 'Video Showcase',
    reels: 'Social Reels',
    testimonials: 'Video Testimonianze',
  };

  const sections: Section[] = ['hero', 'showcase', 'reels', 'testimonials'];
  let activeSection: Section = 'showcase';

  let uploading = false;
  let uploadError = '';
  let uploadSuccess = '';

  let editingId: string | null = null;
  let editForm = {
    title: '',
    subtitle: '',
    category: '',
    order: 0,
    clientName: '',
    clientRole: '',
    company: '',
    quote: '',
  };

  let uploadFields = {
    title: '',
    subtitle: '',
    category: '',
    order: 99,
    clientName: '',
    clientRole: '',
    company: '',
    quote: '',
  };
  let uploadFile: File | null = null;
  let uploadProgress = 0;
  let fileInput: HTMLInputElement;

  function handleFileChange(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    uploadFile = files?.[0] ?? null;
  }

  function isTestimonialSection(s: Section) {
    return s === 'testimonials';
  }

  function getVideos(section: Section) {
    return data.videos[section] || [];
  }

  function startEdit(video: (typeof data.videos.showcase)[0]) {
    editingId = video.publicId;
    editForm = {
      title: video.title || '',
      subtitle: video.subtitle || '',
      category: video.category || '',
      order: video.order,
      clientName: video.clientName || '',
      clientRole: video.clientRole || '',
      company: video.company || '',
      quote: video.quote || '',
    };
  }

  function cancelEdit() {
    editingId = null;
  }

  async function saveEdit(publicId: string) {
    try {
      const res = await fetch('/api/admin/videos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId, ...editForm }),
      });
      if (!res.ok) throw new Error(await res.text());
      editingId = null;
      window.location.reload();
    } catch (err: unknown) {
      alert('Errore nel salvataggio: ' + String(err));
    }
  }

  async function deleteVideo(publicId: string, title: string) {
    if (!confirm(`Eliminare il video "${title}"? Questa azione è irreversibile.`)) return;
    try {
      const res = await fetch('/api/admin/videos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      });
      if (!res.ok) throw new Error(await res.text());
      window.location.reload();
    } catch (err: unknown) {
      alert('Errore eliminazione: ' + String(err));
    }
  }

  async function handleUpload() {
    if (!uploadFile) {
      uploadError = 'Seleziona un file video.';
      return;
    }
    uploading = true;
    uploadError = '';
    uploadSuccess = '';
    uploadProgress = 0;

    try {
      const sigRes = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: activeSection,
          filename: uploadFile.name,
          metadata: uploadFields,
        }),
      });
      if (!sigRes.ok) throw new Error(await sigRes.text());
      const { signature, timestamp, cloudName, apiKey, folder, publicId } = await sigRes.json();

      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('api_key', apiKey);
      formData.append('timestamp', String(timestamp));
      formData.append('signature', signature);
      formData.append('folder', folder);
      formData.append('public_id', publicId);

      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) uploadProgress = Math.round((e.loaded / e.total) * 100);
      });

      await new Promise<void>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`Upload failed: ${xhr.responseText}`));
          }
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`);
        xhr.send(formData);
      });

      await fetch('/api/admin/videos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId, ...uploadFields }),
      });

      uploadSuccess = `Video caricato con successo!`;
      uploadFile = null;
      if (fileInput) fileInput.value = '';
      uploadFields = { title: '', subtitle: '', category: '', order: 99, clientName: '', clientRole: '', company: '', quote: '' };

      setTimeout(() => window.location.reload(), 1500);
    } catch (err: unknown) {
      uploadError = 'Errore durante il caricamento: ' + String(err);
    } finally {
      uploading = false;
      uploadProgress = 0;
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin';
  }
</script>

<svelte:head>
  <title>Admin Dashboard – Righello</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div style="min-height: 100vh; background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif;">

  <!-- Header -->
  <header style="background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between;">
    <div style="display: flex; align-items: center; gap: 1rem;">
      <img src="/logo-white.png" alt="Righello" style="height: 28px; width: auto;" />
      <span style="color: rgba(255,255,255,0.3);">|</span>
      <span style="color: rgba(255,255,255,0.6); font-size: 0.875rem;">Video Admin</span>
    </div>
    <button on:click={logout} style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.5rem; padding: 0.5rem 1rem; color: rgba(255,255,255,0.6); font-size: 0.875rem; cursor: pointer;">
      Esci
    </button>
  </header>

  <div style="max-width: 1100px; margin: 0 auto; padding: 2rem 1.5rem;">

    <!-- Section Tabs -->
    <div style="display: flex; gap: 0.5rem; margin-bottom: 2rem; flex-wrap: wrap;">
      {#each sections as section}
        <button
          on:click={() => { activeSection = section; editingId = null; }}
          style="background: {activeSection === section ? 'linear-gradient(135deg,#D6487E,#06B6D4)' : 'rgba(255,255,255,0.06)'}; border: 1px solid {activeSection === section ? 'transparent' : 'rgba(255,255,255,0.1)'}; border-radius: 0.625rem; padding: 0.625rem 1.25rem; color: #fff; font-size: 0.875rem; font-weight: {activeSection === section ? '600' : '400'}; cursor: pointer;"
        >
          {sectionLabels[section]}
          <span style="margin-left: 0.5rem; opacity: 0.6;">({getVideos(section).length})</span>
        </button>
      {/each}
    </div>

    <!-- Video List -->
    <div style="margin-bottom: 3rem;">
      <h2 style="font-size: 1.125rem; font-weight: 600; color: rgba(255,255,255,0.9); margin: 0 0 1.25rem;">
        {sectionLabels[activeSection]}
      </h2>

      {#if getVideos(activeSection).length === 0}
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem; padding: 3rem; text-align: center; color: rgba(255,255,255,0.4);">
          Nessun video Cloudinary in questa sezione. Caricane uno qui sotto, oppure il sito usa i video di default.
        </div>
      {:else}
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          {#each getVideos(activeSection) as video (video.publicId)}
            <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem; overflow: hidden;">
              {#if editingId === video.publicId}
                <!-- Edit form -->
                <div style="padding: 1.25rem; display: flex; flex-direction: column; gap: 0.875rem;">
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                    <div>
                      <label style="display: block; color: rgba(255,255,255,0.5); font-size: 0.75rem; margin-bottom: 0.25rem;">Titolo</label>
                      <input type="text" bind:value={editForm.title} style="width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.5rem; padding: 0.5rem 0.75rem; color: #fff; font-size: 0.875rem; box-sizing: border-box;" />
                    </div>
                    <div>
                      <label style="display: block; color: rgba(255,255,255,0.5); font-size: 0.75rem; margin-bottom: 0.25rem;">Sottotitolo</label>
                      <input type="text" bind:value={editForm.subtitle} style="width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.5rem; padding: 0.5rem 0.75rem; color: #fff; font-size: 0.875rem; box-sizing: border-box;" />
                    </div>
                    <div>
                      <label style="display: block; color: rgba(255,255,255,0.5); font-size: 0.75rem; margin-bottom: 0.25rem;">Categoria</label>
                      <input type="text" bind:value={editForm.category} style="width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.5rem; padding: 0.5rem 0.75rem; color: #fff; font-size: 0.875rem; box-sizing: border-box;" />
                    </div>
                    <div>
                      <label style="display: block; color: rgba(255,255,255,0.5); font-size: 0.75rem; margin-bottom: 0.25rem;">Ordine</label>
                      <input type="number" bind:value={editForm.order} style="width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.5rem; padding: 0.5rem 0.75rem; color: #fff; font-size: 0.875rem; box-sizing: border-box;" />
                    </div>
                    {#if isTestimonialSection(activeSection)}
                      {#each [['clientName','Nome cliente'],['clientRole','Ruolo'],['company','Azienda'],['quote','Citazione']] as [field, label]}
                        <div style="grid-column: {field === 'quote' ? 'span 2' : ''};">
                          <label style="display: block; color: rgba(255,255,255,0.5); font-size: 0.75rem; margin-bottom: 0.25rem;">{label}</label>
                          {#if field === 'quote'}
                            <textarea bind:value={editForm[field]} rows="2" style="width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.5rem; padding: 0.5rem 0.75rem; color: #fff; font-size: 0.875rem; box-sizing: border-box; resize: vertical;"></textarea>
                          {:else}
                            <input type="text" bind:value={editForm[field]} style="width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.5rem; padding: 0.5rem 0.75rem; color: #fff; font-size: 0.875rem; box-sizing: border-box;" />
                          {/if}
                        </div>
                      {/each}
                    {/if}
                  </div>
                  <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                    <button on:click={cancelEdit} style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.5rem; padding: 0.5rem 1rem; color: rgba(255,255,255,0.6); cursor: pointer; font-size: 0.875rem;">
                      Annulla
                    </button>
                    <button on:click={() => saveEdit(video.publicId)} style="background: linear-gradient(135deg,#D6487E,#06B6D4); border: none; border-radius: 0.5rem; padding: 0.5rem 1.25rem; color: #fff; cursor: pointer; font-size: 0.875rem; font-weight: 600;">
                      Salva
                    </button>
                  </div>
                </div>
              {:else}
                <!-- Card view -->
                <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem 1.25rem;">
                  <div style="position: relative; width: 80px; height: 52px; border-radius: 0.5rem; overflow: hidden; flex-shrink: 0; background: #111;">
                    <img src={video.thumbnailUrl} alt={video.title} style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <p style="font-weight: 600; margin: 0 0 0.25rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{video.title || '(senza titolo)'}</p>
                    <p style="color: rgba(255,255,255,0.45); font-size: 0.8rem; margin: 0;">{video.subtitle} {video.category ? `· ${video.category}` : ''} · ordine: {video.order}</p>
                  </div>
                  <div style="display: flex; gap: 0.5rem; flex-shrink: 0;">
                    <a href={video.url} target="_blank" rel="noopener" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.5rem; padding: 0.4rem 0.75rem; color: rgba(255,255,255,0.6); font-size: 0.8rem; text-decoration: none;">
                      Apri
                    </a>
                    <button on:click={() => startEdit(video)} style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.5rem; padding: 0.4rem 0.75rem; color: rgba(255,255,255,0.7); font-size: 0.8rem; cursor: pointer;">
                      Modifica
                    </button>
                    <button on:click={() => deleteVideo(video.publicId, video.title)} style="background: rgba(214,72,126,0.12); border: 1px solid rgba(214,72,126,0.3); border-radius: 0.5rem; padding: 0.4rem 0.75rem; color: #f9a8c9; font-size: 0.8rem; cursor: pointer;">
                      Elimina
                    </button>
                  </div>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Upload section -->
    <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 1.25rem; padding: 1.75rem;">
      <h3 style="font-size: 1rem; font-weight: 600; margin: 0 0 1.5rem; color: rgba(255,255,255,0.9);">
        Carica nuovo video → {sectionLabels[activeSection]}
      </h3>

      {#if uploadError}
        <div style="background: rgba(214,72,126,0.12); border: 1px solid rgba(214,72,126,0.3); border-radius: 0.75rem; padding: 0.875rem; margin-bottom: 1rem; color: #f9a8c9; font-size: 0.875rem;">{uploadError}</div>
      {/if}
      {#if uploadSuccess}
        <div style="background: rgba(6,182,212,0.12); border: 1px solid rgba(6,182,212,0.3); border-radius: 0.75rem; padding: 0.875rem; margin-bottom: 1rem; color: #67e8f9; font-size: 0.875rem;">{uploadSuccess}</div>
      {/if}

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.875rem; margin-bottom: 1.25rem;">
        <div>
          <label style="display: block; color: rgba(255,255,255,0.5); font-size: 0.75rem; margin-bottom: 0.25rem;">Titolo *</label>
          <input type="text" bind:value={uploadFields.title} style="width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.5rem; padding: 0.625rem 0.75rem; color: #fff; font-size: 0.875rem; box-sizing: border-box;" />
        </div>
        <div>
          <label style="display: block; color: rgba(255,255,255,0.5); font-size: 0.75rem; margin-bottom: 0.25rem;">Sottotitolo</label>
          <input type="text" bind:value={uploadFields.subtitle} style="width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.5rem; padding: 0.625rem 0.75rem; color: #fff; font-size: 0.875rem; box-sizing: border-box;" />
        </div>
        <div>
          <label style="display: block; color: rgba(255,255,255,0.5); font-size: 0.75rem; margin-bottom: 0.25rem;">Categoria</label>
          <input type="text" bind:value={uploadFields.category} style="width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.5rem; padding: 0.625rem 0.75rem; color: #fff; font-size: 0.875rem; box-sizing: border-box;" />
        </div>
        <div>
          <label style="display: block; color: rgba(255,255,255,0.5); font-size: 0.75rem; margin-bottom: 0.25rem;">Ordine (numerico)</label>
          <input type="number" bind:value={uploadFields.order} style="width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.5rem; padding: 0.625rem 0.75rem; color: #fff; font-size: 0.875rem; box-sizing: border-box;" />
        </div>

        {#if isTestimonialSection(activeSection)}
          {#each [['clientName','Nome cliente'],['clientRole','Ruolo'],['company','Azienda'],['quote','Citazione']] as [field, label]}
            <div style="grid-column: {field === 'quote' ? 'span 2' : ''};">
              <label style="display: block; color: rgba(255,255,255,0.5); font-size: 0.75rem; margin-bottom: 0.25rem;">{label}</label>
              {#if field === 'quote'}
                <textarea bind:value={uploadFields[field]} rows="2" style="width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.5rem; padding: 0.625rem 0.75rem; color: #fff; font-size: 0.875rem; box-sizing: border-box; resize: vertical;"></textarea>
              {:else}
                <input type="text" bind:value={uploadFields[field]} style="width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 0.5rem; padding: 0.625rem 0.75rem; color: #fff; font-size: 0.875rem; box-sizing: border-box;" />
              {/if}
            </div>
          {/each}
        {/if}
      </div>

      <!-- File picker -->
      <div style="margin-bottom: 1.25rem;">
        <label style="display: block; color: rgba(255,255,255,0.5); font-size: 0.75rem; margin-bottom: 0.5rem;">File video (MP4, MOV, WebM) *</label>
        <div
          style="border: 2px dashed rgba(255,255,255,0.15); border-radius: 0.75rem; padding: 1.5rem; text-align: center; cursor: pointer; transition: border-color 0.2s;"
          on:click={() => fileInput?.click()}
          on:keydown={(e) => e.key === 'Enter' && fileInput?.click()}
          role="button"
          tabindex="0"
        >
          {#if uploadFile}
            <p style="color: #67e8f9; margin: 0; font-size: 0.875rem;">📎 {uploadFile.name} ({(uploadFile.size / 1024 / 1024).toFixed(1)} MB)</p>
          {:else}
            <p style="color: rgba(255,255,255,0.35); margin: 0; font-size: 0.875rem;">Clicca per scegliere un file</p>
          {/if}
          <input
            bind:this={fileInput}
            type="file"
            accept="video/mp4,video/quicktime,video/webm,video/*"
            style="display: none;"
            on:change={handleFileChange}
          />
        </div>
      </div>

      {#if uploading && uploadProgress > 0}
        <div style="margin-bottom: 1rem;">
          <div style="background: rgba(255,255,255,0.08); border-radius: 999px; height: 6px; overflow: hidden;">
            <div style="background: linear-gradient(90deg,#D6487E,#06B6D4); height: 100%; width: {uploadProgress}%; transition: width 0.3s;"></div>
          </div>
          <p style="color: rgba(255,255,255,0.45); font-size: 0.75rem; margin: 0.375rem 0 0; text-align: right;">{uploadProgress}%</p>
        </div>
      {/if}

      <button
        on:click={handleUpload}
        disabled={uploading}
        style="background: {uploading ? 'rgba(255,255,255,0.08)' : 'linear-gradient(135deg,#D6487E,#06B6D4)'}; border: none; border-radius: 0.75rem; padding: 0.875rem 2rem; color: #fff; font-size: 0.9rem; font-weight: 600; cursor: {uploading ? 'not-allowed' : 'pointer'}; opacity: {uploading ? 0.7 : 1}; transition: all 0.2s;"
      >
        {uploading ? `Caricamento... ${uploadProgress}%` : 'Carica video su Cloudinary'}
      </button>
    </div>
  </div>
</div>
