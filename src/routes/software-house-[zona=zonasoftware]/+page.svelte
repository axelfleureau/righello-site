<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import ServicePage from '$lib/components/servizi/ServicePage.svelte';
  import { softwareHouseModel } from '$lib/components/servizi/models';
  import type { PageData } from './$types';

  export let data: PageData;

  $: page = data.page;
  $: m = softwareHouseModel(page);
</script>

<SeoHead path={page.path} title={page.seo.title} description={page.seo.description} />

<ServicePage {m} />
