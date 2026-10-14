<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import ServicePage from '$lib/components/servizi/ServicePage.svelte';
  import { serviceModel } from '$lib/components/servizi/models';
  import type { PageData } from './$types';

  export let data: PageData;

  $: service = data.service;
  $: m = serviceModel(service);
</script>

<SeoHead path="/servizi/{service.slug}" title={service.seo.title} description={service.seo.description} />

<ServicePage {m} />
