<script lang="ts">
    import { updateTitle } from "../functions";
  import parseMarkdown from "../markdown.parser";

  export let link: string = "/page/index.md";

  async function fetchMdAndConvert(link: string): Promise<Record<string, string>> {
    const response = await fetch(link);
    let markdown = await response.text();
    let title = markdown.match(/# (.+)/g)[0];

    markdown = markdown.replace(title+'\n', '')
    title = title.replace('# ', '').replace(/\n/, '')

    let content = parseMarkdown(link, markdown);

    return { title, content };
  };
</script>

{#await fetchMdAndConvert(link)}
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
