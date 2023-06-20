<script lang="ts">
  import Post from "./Post.svelte";
  import CardCollection from "../../partials/CardCollection.svelte";
  import sections from "../../jsons/sections.json";
</script>

<Post sectionName="other" postName="index" />
<CardCollection 
  cards={ sections.filter(section => section?.children) } 
  linkPrepare={ (card) => card.name }
/>