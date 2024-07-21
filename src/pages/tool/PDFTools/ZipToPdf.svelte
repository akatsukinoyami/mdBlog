<script lang="ts">
  import JSZip from 'jszip';
  import { FileUploaderButton, ProgressBar } from 'carbon-components-svelte';
  import { Download } from 'carbon-icons-svelte';
  import { Button } from '../../../components';
  import { i18n } from '../../../stores';

  const A4 = [595.28, 841.89];
  const imageFormats = ['.jpg', '.jpeg', '.png'];

  export let errors: string[];
  
  let files: File[] | undefined;
  let inProgress: boolean = false;
  let pdfList: { href: string, download: string }[] = [];

  async function download(): Promise<any> {
    try {
      if (typeof files !== 'undefined') {
        inProgress = true;
        for (const file of files) {  
          const arrayBuffer = await file.arrayBuffer();
          // @ts-ignore
          const doc = new PDFDocument({ margin: 0, size: 'A4', compress: true }); 
          // @ts-ignore
          const stream = doc.pipe(blobStream());
          const zip = await JSZip.loadAsync(arrayBuffer);
          const files = Object
            .entries(zip.files)
            .map(([_, zipEntry]) => zipEntry)
            .filter((zipEntry) => imageFormats.some(format => zipEntry.name.includes(format)));

          for (let i = 0; i < files.length; i++) {
            const image = await files[i].async('arraybuffer') as ArrayBuffer;
            doc.image(image, 0, 0, { width: A4[0], align: 'center', valign: 'center' });
            if (files.length != i + 1) doc.addPage();
          }

          doc.end();
          stream.on('finish', () => {
            const a = document.createElement('a');
            a.hidden = true;
            a.download = file.name.replace(/\.[zZ][iI][pP]/, '.pdf');
            a.href = stream.toBlobURL('application/pdf');
            a.click();
          });
        }
        files = undefined;
      }
    } catch (e) {
      errors = [...errors, e as string];
    } finally {
      pdfList = pdfList;
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
    style:margin-top="36px"
    style:margin-bottom="36px"
  >
    <FileUploaderButton 
      bind:files 
      name="files[]" 
      accept={[".zip"]} 
      required 
      multiple 
      labelText={$i18n.button.add_zip}
    />

    <Button 
      icon={ Download } 
      iconDescription={$i18n.button.start_conversion}
      on:click={download} 
    />
  </div>
{/if}
