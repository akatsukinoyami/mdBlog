<script lang="ts">
  import { Grid, Row } from "carbon-components-svelte";
  import Card from "./Card.svelte";
  import type { DirectoryTreeFile } from "../../types/directory.tree.file";

  export let 
    cards: DirectoryTreeFile[],
    linkPrepare: (card: DirectoryTreeFile) => string;
</script>

<Grid fullWidth padding>
  <Row padding={true} style="justify-content: space-evenly;">
    {#each cards as card}
      <Card link={linkPrepare(card)} card={card} />
    {/each}
  </Row>
</Grid>
