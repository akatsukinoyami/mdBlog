<script lang="ts">
  import type PostMetadataInterface from "../../interfaces/post.metadata.interface";
  import parseMarkdown from "../../markdown.parser";
  import { updateTitle } from "../../functions";

  export let link: string = "/page/index";

  async function fetchPost(link: string): Promise<string> {
    const metadata = await fetchMetadata(link)
    updateTitle(metadata.title)

    return await fetchContent(link)
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
</script>

{#await fetchPost(link)}
  <div class="d-flex align-items-center">
    <strong>Please wait, post fetching...</strong>
    <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
  </div>
{:then content}
  <article class="p-3">{@html content}</article>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
