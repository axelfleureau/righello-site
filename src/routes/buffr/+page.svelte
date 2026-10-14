<script lang="ts">
  import '$lib/components/buffr/tokens.css';
  import BuffrHero from '$lib/components/buffr/BuffrHero.svelte';
  import SceneStage from '$lib/components/buffr/SceneStage.svelte';
  import SceneVisual from '$lib/components/buffr/SceneVisual.svelte';
  import TeamSection from '$lib/components/buffr/TeamSection.svelte';
  import FeatureBento from '$lib/components/buffr/FeatureBento.svelte';
  import Audience from '$lib/components/buffr/Audience.svelte';
  import FaqList from '$lib/components/buffr/FaqList.svelte';
  import FinalCta from '$lib/components/buffr/FinalCta.svelte';
  import ProductFlow from '$lib/components/progetti/ProductFlow.svelte';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import { getCaseStudyBySlug } from '$lib/data/case-studies';
  import { scenes } from '$lib/components/buffr/content';

  const study = getCaseStudyBySlug('buffr')!;
</script>

<SeoHead path="/buffr" title={study.seo.title} description={study.seo.description} imageAlt="BUFFR: la camera per iPhone con il pulsante Avvia buffer, la libreria delle clip e il montaggio" />

<div class="buffr">
  <BuffrHero />

  <SceneStage {scenes}>
    <svelte:fragment slot="stage" let:index let:local>
      <SceneVisual {index} {local} />
    </svelte:fragment>
    <svelte:fragment slot="poster" let:index let:local>
      <SceneVisual {index} {local} compact instant />
    </svelte:fragment>
  </SceneStage>

  <TeamSection />
  <FeatureBento />
  <Audience />
  <FaqList />
  <FinalCta />
</div>

<ProductFlow {study} />
