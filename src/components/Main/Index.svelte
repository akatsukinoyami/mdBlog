<script lang="ts">
  import Post from "./Post.svelte";
  import CardCollection from "../Partials/CardCollection.svelte";
  import sections from "../../jsons/sections.json";
  import type { DirectoryTreeFile } from "../../types/directory.tree.file";

  const showedSections = sections.filter(section => section?.children);
  const linkPrepare = (card: DirectoryTreeFile) => card.name;
</script>

<Post link="/blog/other/index" sectionName="other" postName="index" />
<CardCollection cards={showedSections} linkPrepare={linkPrepare}/>
