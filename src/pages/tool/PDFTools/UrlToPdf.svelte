<script lang="ts">
  import { ProgressBar, TextInput } from 'carbon-components-svelte';
  import { Add, ArrowDown, ArrowUp, Download, RowDelete } from 'carbon-icons-svelte';
  import { Button } from '../../../components';
  import arrayHelper from '../../../utils/arrayHelper';
  import { i18n } from '../../../stores';

  const A4 = [595.28, 841.89];

  export let errors: string[];
  
  let urls: string[] = [''];
  let inProgress: boolean = false;
  let filename = "";

  async function download(): Promise<any> {
    try {
      if (urls.length > 0) {
        inProgress = true;
        // @ts-ignore
        const doc = new PDFDocument({ margin: 0, size: 'A4', compress: true });
        // @ts-ignore
        const stream = doc.pipe(blobStream());

        for (let i = 0; i < urls.length; i++) {
          fetch('https://corsproxy.io/?'+encodeURIComponent(urls[i]))
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => {
              doc.image(arrayBuffer, 0, 0, { width: A4[0], align: 'center', valign: 'center' });
              if (urls.length != i + 1) doc.addPage();
            });
        }

        doc.end();
        stream.on('finish', () => {
          const a = document.createElement('a');
          a.hidden = true;
          a.download = filename + '.pdf';
          a.href = stream.toBlobURL('application/pdf');
          a.click();
        });

        urls = [''];
      }
    } catch (e) {
      errors = [...errors, e as string];
    } finally {
      inProgress = false;
    }
  }
</script>

{#if inProgress}
  <ProgressBar />
{:else}
  <div
    style:display="flex"
    style:justify-content="space-between"
    style:gap="10px"
    style:margin-top="36px"
    style:margin-bottom="36px"
  >
    <TextInput bind:value={filename} labelText={$i18n.button.filename} />
    <Button 
      icon={ Add } 
      iconDescription={$i18n.button.add_url}
      on:click={() => urls = [...urls, '']} 
      size="field"
    />
    <Button 
      icon={ Download } 
      iconDescription={$i18n.button.start_conversion}
      on:click={download} 
      size="field"
    />
  </div>

  <div 
    style:display="grid"
    style:grid-template-columns="1fr 1fr"
  >
    <div>
      {#each urls as url, i}
        <div
        
          style:display="flex"
          style:gap="2px"
          style:padding="4px"
        >
          <TextInput bind:value={url} />
          <Button 
            icon={ ArrowUp } 
            iconDescription={$i18n.button.up} 
            on:click={() => { urls = arrayHelper.moveElement(urls, i, -1) }} 
            size="field"
          />

          <Button 
            icon={ ArrowDown } 
            iconDescription={$i18n.button.down} 
            on:click={() => { urls = arrayHelper.moveElement(urls, i, 1) }} 
            size="field"
          />

          <Button 
            icon={ RowDelete } 
            iconDescription={$i18n.button.delete} 
            on:click={() => { urls = arrayHelper.deleteElement(urls, i) }} 
            size="field"
          />
        </div>
      {/each}
    </div>
    <div
      style:display="grid"
      style:grid-template-columns="1fr 1fr 1fr"
      style:gap="2px"
      style:padding="4px"
    >
      {#each urls as url, i}
        {#if url}
          <img src={url} alt={`${i+1}`}/>
        {/if}
      {/each}
    </div>
  </div>
{/if}
