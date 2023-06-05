<script lang="ts">
  import { InlineLoading } from "carbon-components-svelte";

  import HtmlContent from "../Partials/HtmlContent.svelte";
  import { lang } from "../../stores";
  import parseMarkdown from "../../markdown.parser";
  import { i18n, updateTitle } from "../../functions";
  import type PostMetadataInterface from "../../types/post.metadata";

  $: t = i18n($lang);

  export let link: string = "/page/index";

  async function fetchPost(link: string): Promise<Record<any, any>> {
    const { title, description } = await handleMetadata(link);
    const content = await handleContent(link);

    return { title, description, content }
  };

  async function handleMetadata(link: string): Promise<PostMetadataInterface> {
    const responseMetadata = await fetch(`${link}.json`);
    const metadata = await responseMetadata.json();

    const title = metadata.title || t.mainTitle;
    const description = metadata.description || t.fallbackDescription;

    updateTitle(title);
    return { title, description };
  }

  async function handleContent(link: string): Promise<string> {
    const responsePost = await fetch(`${link}.md`);
    const markdown = await responsePost.text();
    return parseMarkdown(markdown);
  };

  
</script>


{#await fetchPost(link)}
  <InlineLoading description={ t.wait } />
{:then { content }}
  <HtmlContent html={content} link={link}/>
{:catch error}
  <InlineLoading status="error" description={error.message} />
{/await}

