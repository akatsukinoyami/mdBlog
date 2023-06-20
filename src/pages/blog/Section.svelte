<script lang="ts">
  import { useParams } from "svelte-navigator";
  
  import CardCollection from "../../partials/CardCollection.svelte";
  import { setTitle, updateTitle } from "../../functions";
  import sections from "../../jsons/sections.json";
  import { lang } from "../../stores/settings";
  import type { DirectoryTreeFile } from "../../types/directory.tree.file";

  const params = useParams();
  
  const section = sections.find(({ name }: DirectoryTreeFile) => name === $params.sectionName);

  $: setTitle(section, $lang, updateTitle)
</script>

<CardCollection 
  cards={ section.children } 
  linkPrepare={ (card) => `${section.name}/${card.name}` }
/>
