<script lang="ts">
  import { FileUploaderButton, ProgressBar, TextInput } from 'carbon-components-svelte';
  import { Download } from 'carbon-icons-svelte';
  import { Button } from '../../../components';
  import { i18n } from '../../../stores';

  const A4 = [595.28, 841.89];

  export let errors: string[];
  
  let files: File[] | undefined;
  let inProgress: boolean = false;
  let filename = "";

  async function download(): Promise<any> {
    try {
      if (typeof files !== 'undefined') {
        inProgress = true;
        // @ts-ignore
        const doc = new PDFDocument({ margin: 0, size: 'A4', compress: true });
        // @ts-ignore
        const stream = doc.pipe(blobStream());

        for (let i = 0; i < files.length; i++) {
          const image = await files[i].arrayBuffer();
          doc.image(image, 0, 0, { width: A4[0], align: 'center', valign: 'center' });
          if (files.length != i + 1) doc.addPage();
        }

        doc.end();
        stream.on('finish', () => {
          const a = document.createElement('a');
          a.hidden = true;
          a.download = filename + '.pdf';
          a.href = stream.toBlobURL('application/pdf');
          a.click();
        });

        files = undefined;
      }
    } catch (e) {
      errors = [...errors, e as string];
    } finally {
      inProgress = false;
    }
  }

  $: showedImages = files;
</script>

{#if inProgress}
  <ProgressBar />
{:else}
  <TextInput bind:value={filename} labelText={$i18n.button.filename} />

  <div
    style:display="flex"
    style:justify-content="space-between"
    style:margin-top="36px"
    style:margin-bottom="36px"
  >
    <FileUploaderButton 
      bind:files 
      name="files[]" 
      accept={['.jpg', '.jpeg', '.png', '.webp']} 
      required 
      multiple 
      labelText={$i18n.button.add_pic}
    />

    <Button 
      icon={ Download } 
      iconDescription={$i18n.button.start_conversion}
      on:click={download} 
    />
  </div>

  <div 
    style:display="flex"
    style:justify-content="space-between"
    style:flex-wrap="wrap"
    style:gap="6px"
  >
    {#if showedImages?.length}
      {#each showedImages as file}
        <div
          style:background-image="url({URL.createObjectURL(file)})"
          style:background-size="cover"
          style:width="160px"
          style:height="200px"
          />
      {/each}
    {/if}
  </div>
{/if}
