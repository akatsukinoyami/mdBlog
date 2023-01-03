<script lang="ts">
  import type MdPageInterface from "../../interfaces/md.page.interface";
  import parseMarkdown from "../../markdown.parser";
  import { updateTitle } from "../../functions";

  export let link: string = "/page/index";

  async function fetchPost(link: string): Promise<MdPageInterface> {
    return {
      title: await fetchTitle(link),
      content: await fetchContent(link)
    };
  };

  async function fetchTitle(link: string): Promise<string> {
    const responseMetadata = await fetch(`${link}.json`);
    const metadata = await responseMetadata.json();
    const title = metadata.title;

    return title;
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
{:then {title, content}}
  {updateTitle(title)}
  <article class="p-3">{@html content}</article>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
