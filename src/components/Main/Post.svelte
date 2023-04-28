<script lang="ts">
  import parseMarkdown from "../../markdown.parser";
  import { i18n, updateTitle } from "../../functions";
  import type PostMetadataInterface from "../../types/post.metadata";

  export let link: string = "/page/index";

  async function fetchPost(link: string): Promise<Record<any, any>> {
    const { title, description } = await handleMetadata(link);
    let content = await handleContent(link);

    return { title, description, content }
  };

  async function handleMetadata(link: string): Promise<PostMetadataInterface> {
    const responseMetadata = await fetch(`${link}.json`);
    const metadata = await responseMetadata.json();

    const title = metadata.title || i18n('mainTitle')
    const description = metadata.description || i18n('fallbackDescription');

    updateTitle(title);
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
      <figure>
        <img $1 src="${link}/$2" class="modal-image" $3 alt="$4" $5 style="object-fit: contain;" id="$2" loading="lazy" decoding="async"/>
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
  <article class="p-3">{@html content}</article>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}

<style lang="sass">
  :global(figure)
    margin: 0
    width: 100%

  :global(.big-image)
    position: fixed
    top: 50%
    left: 50%
    z-index: 16
    max-width: 95vw !important
    max-height: 95vh !important
    transform: translate(-50%, -50%)
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.7)

  :global(.noscroll)
    overflow: hidden !important
</style>
