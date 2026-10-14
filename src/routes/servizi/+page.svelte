<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import ServicePage from '$lib/components/servizi/ServicePage.svelte';
  import { indexModel } from '$lib/components/servizi/models';

  const m = indexModel();
</script>

<SeoHead
  path="/servizi"
  title="Servizi | Social, Advertising, Siti Web e AI - Righello"
  description="Servizi Righello: social media, advertising, siti web, e-commerce, software e agenti AI per aziende tra Pordenone, Mestre e Nord Italia."
/>

<ServicePage {m} />
