<script lang="ts">
  import { useParams } from "svelte-navigator";
  import { ProgressBar } from "carbon-components-svelte";
  
  import HtmlParser from "../../partials/HtmlParser.svelte";
  
  import i18n from "../../i18n";
  import { lang } from "../../stores/settings";
  import { setTitle, updateTitle } from "../../functions";
  import parseMarkdown from "../../functions/markdown.parser";
  import sectionsWithoutType from "../../jsons/sections.json";
  import type { DirectoryTreeFile } from "../../types/directory.tree.file";

  const params = useParams();
  const sections: DirectoryTreeFile[] = sectionsWithoutType;

  export let 
    sectionName = $params.sectionName,
    postName = $params.postName;
  
  const link: string = `/blog/${sectionName}/${postName}`;

  async function fetchPost(language=$lang) {
    const version = language === "en" ? "" : `_${language}`;
    let response = await fetch(`${link}/index${version}.md`);
    if (!response.ok) response = await fetch(`${link}/index.md`);
    
    const post = await response.text();

    return parseMarkdown(post);
  }

  $: t = i18n($lang);
  $: postPromise = fetchPost($lang);
  $: {
    const post = sections
      .find(({ name }) => name === sectionName)
      .children
      .find(({ name }) => name === postName);

    setTitle(post, $lang, updateTitle);
  }

</script>

{#await postPromise }
  <ProgressBar helperText={t.wait} />
{:then html} 
  <HtmlParser html={html} link={link} />
{:catch exc}
  <ProgressBar value={0} status="error" labelText="Error" helperText={exc} />
{/await}
