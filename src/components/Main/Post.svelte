<script lang="ts">
  import LinkPreviewHead from "../Partials/LinkPreviewHead.svelte";
  import parseMarkdown from "../../markdown.parser";
  import { updateTitle } from "../../functions";
  import type PostMetadataInterface from "../../interfaces/post.metadata.interface";

  export let link: string = "/page/index";

  async function fetchPost(link: string): Promise<Record<any, any>> {
    const metadata = await fetchMetadata(link)
    updateTitle(metadata.title)
    const content = await fetchContent(link)

    return { title: metadata.title, content }
  };

  async function fetchMetadata(link: string): Promise<PostMetadataInterface> {
    const responseMetadata = await fetch(`${link}.json`);
    const metadata = await responseMetadata.json();

    return metadata;
  }

  async function fetchContent(link: string): Promise<string> {
    const responsePost = await fetch(`${link}.md`);
    const markdown = await responsePost.text();
    const content = parseMarkdown(link, markdown);

    return content;
  };

  const description = "Small private blog of Katsu Dev."
</script>


{#await fetchPost(link)}
<div class="d-flex align-items-center">
  <strong>Please wait, post fetching...</strong>
  <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
</div>
{:then { title, content }}
  <LinkPreviewHead {title} {description} />
  <article class="p-3">{@html content}</article>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
