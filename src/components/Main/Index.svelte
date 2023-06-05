<script lang="ts">
  import Post from "./Post.svelte";
  import CardCollection from "../Partials/CardCollection.svelte";
  import { i18n, updateTitle } from "../../functions";
  import { lang } from "../../stores";
  import sections from "../../jsons/sections.json";
  import type { DirectoryTreeFile } from "../../types/directory.tree.file";

  $: {
    let t = i18n($lang);
    updateTitle(t.mainTitle);
  }
  const showedSections = sections.filter(section => section?.children);
  const linkPrepare = (card: DirectoryTreeFile) => card.name;
</script>

<Post link="/page/index" />
<CardCollection cards={showedSections} linkPrepare={linkPrepare}/>
