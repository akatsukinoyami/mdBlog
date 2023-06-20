<script lang="ts">
  import Post from "./Post.svelte";
  import CardIndex from "../../partials/Card/Index.svelte";
  import sections from "../../jsons/sections.json";
</script>

<Post 
  sectionName="other" 
  postName="index" 
  showComments={false}
/>
<CardIndex 
  cards={ sections.filter(section => section?.children) } 
  linkPrepare={ (card) => card.name }
/>