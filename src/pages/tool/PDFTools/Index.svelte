<script lang="ts">
  import { Accordion, AccordionItem, InlineNotification } from "carbon-components-svelte";
  import { Title } from "../../../components";
  import { i18n } from "../../../stores";
  import PicToPdf from "./PicToPdf.svelte";
  import ZipToPdf from "./ZipToPdf.svelte";
  import UrlToPdf from "./UrlToPdf.svelte";

  let errors: string[] = [];

  const components: [string, any][] = [
    ['zip_to_pdf', ZipToPdf],
    ['pics_to_pdf', PicToPdf],
    ['urls_to_pdf', UrlToPdf],
  ];
</script>

<svelte:head>
  <script src="/pdfkit.standalone.js" />
  <script src="/blob-stream.js" />
</svelte:head>

<Title title="PDFTools" />

{#each errors as error}
  <InlineNotification title="{$i18n.error}:" subtitle={error} lowContrast />
{/each}

<Accordion>
  {#each components as [title, component]}
    <AccordionItem title={$i18n.tool[title]}>
      <svelte:component this={component}  bind:errors />
    </AccordionItem>
  {/each}
</Accordion>

<style>
  :global(.bx--accordion__content) {
    padding-right: 1rem !important;
  }
</style>