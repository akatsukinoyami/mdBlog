<script lang="ts">
  import { Route } from "svelte-navigator";
  import Post from "./Post.svelte";
  import Section from "./Section.svelte";
  import CardCollection from "../Partials/CardCollection.svelte";
  import sections from "../../jsons/sections.json";
  import type { DirectoryTreeFile } from "../../types/directory.tree.file";
    import { backend } from "../../stores/backend";

  const showedSections = sections.filter(section => section?.children);
  const linkPrepare = (card: DirectoryTreeFile) => card.name;
</script>

<Route path="blog/*">
  <Route path=":sectionName/:postName" component={Post} />
  <Route path=":sectionName/" component={Section} />
</Route>
<Route>
  <Post sectionName="other" postName="index" />
  <CardCollection cards={showedSections} linkPrepare={linkPrepare}/>
</Route>
