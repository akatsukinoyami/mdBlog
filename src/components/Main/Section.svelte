<script lang="ts">
  import CardCollection from "../Partials/CardCollection.svelte";
  import { tTitle, updateTitle } from "../../functions";
  import sections from "../../jsons/sections.json";
  import { lang } from "../../stores";
  import type { DirectoryTreeFile } from "../../types/directory.tree.file";

  export let sectionName: string;
  
  const section = sections.find((section: DirectoryTreeFile) => section.name === sectionName);

  $: tTitle(section, $lang, updateTitle)
  const linkPrepare = (card: DirectoryTreeFile) => `${section.name}/${card.name}`;
</script>

<CardCollection cards={section.children} linkPrepare={linkPrepare}/>
