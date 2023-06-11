<script lang="ts">
  import { useParams } from "svelte-navigator";
  
  import CardCollection from "../Partials/CardCollection.svelte";
  import { tTitle, updateTitle } from "../../functions";
  import sections from "../../jsons/sections.json";
  import { lang } from "../../stores";
  import type { DirectoryTreeFile } from "../../types/directory.tree.file";

  const params = useParams();
  
  const section = sections.find(({ name }: DirectoryTreeFile) => name === $params.sectionName);

  $: tTitle(section, $lang, updateTitle)
  const linkPrepare = (card: DirectoryTreeFile) => `${section.name}/${card.name}`;
</script>

<CardCollection cards={section.children} linkPrepare={linkPrepare}/>
