<script lang="ts">
  import CardCollection from "../Partials/CardCollection.svelte";
  import { updateTitle } from "../../functions";
  import sections from "../../jsons/sections.json";
  import type { DirectoryTreeFile } from "../../types/directory.tree.file";

  export let sectionName: string;
  updateTitle(sectionName)

  const section = sections.find((section: DirectoryTreeFile) => section.name === sectionName);

  const showedSections = section.children.reverse();
  const linkPrepare = (card: DirectoryTreeFile) => `${section.name}/${card.name}`;
</script>

<CardCollection cards={showedSections} linkPrepare={linkPrepare}/>
