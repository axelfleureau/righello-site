<svelte:head>
  <title>La Busa del Sauc</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="iframe-wrapper">
  <iframe
    src="https://la-busa-del-sauc.vercel.app"
    title="La Busa del Sauc"
    width="100%"
    height="100%"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

<style>
  .iframe-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9998;
    overflow: hidden;
  }

  .iframe-wrapper iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
</style>
