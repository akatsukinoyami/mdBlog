<script lang="ts">
  import LinkPreviewHead from "../Partials/LinkPreviewHead.svelte";
  import parseMarkdown from "../../markdown.parser";
  import { updateTitle } from "../../functions";
  import i18n from '../../jsons/i18n.json';
  import type PostMetadataInterface from "../../interfaces/post.metadata.interface";

  export let link: string = "/page/index";

  async function fetchPost(link: string): Promise<Record<any, any>> {
    const { title, description } = await handleMetadata(link);
    let content = await handleContent(link);

    return { title, description, content }
  };

  async function handleMetadata(link: string): Promise<PostMetadataInterface> {
    const responseMetadata = await fetch(`${link}.json`);
    const metadata = await responseMetadata.json();

    updateTitle(metadata.title);
    const title = metadata.title || i18n.mainTitle
    const description = metadata.description || i18n.fallbackDescription;

    return { title, description };
  }

  async function handleContent(link: string): Promise<string> {
    const responsePost = await fetch(`${link}.md`);
    const markdown = await responsePost.text();
    let content = parseMarkdown(markdown);
    content = fixImages(link, content)

    return content;
  };

  function fixImages(link: string, content: string): string {
    link = link.split("/").slice(0, -1).join('/'); // making link from '/blog/section/post/index' to '/blog/section/post'

    return content.replaceAll(/<img(.*?)src="(.*?)"(.*?)alt="(.*?)"(.*?)>/g, `
      <figure class="figure w-100 m-0">
        <img $1 src="${link}/$2" $3 alt="$4" $5 style="object-fit: contain;" id="$2" />
        <figcaption class="figure-caption modal_caption text-center mx-auto pt-2" style="max-width: 960px"> $4 </figcaption>
      </figure>
    `)
  }

</script>


{#await fetchPost(link)}
  <div class="d-flex align-items-center">
    <strong>Please wait, post fetching...</strong>
    <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
  </div>
{:then { title, description, content }}
  <LinkPreviewHead {title} {description} />
  <article class="p-3">{@html content}</article>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
