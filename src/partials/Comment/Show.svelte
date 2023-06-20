<script lang="ts">
  import { Column, Grid, Row, Tile } from "carbon-components-svelte";
  import type Comment from "../../types/comment";

  export let comment: Comment;

  const { user, created_at, content } = comment;
</script>

<Tile>
  <Grid>
    <Row style="justify-content: space-between;">
      <Column><div class="username">{ user.username }</div></Column>
      <Column><div class="created_at">{ created_at }</div></Column>
    </Row>
    <Row>
      <Column><div class="content">{ content }</div></Column>
    </Row>
  </Grid>
</Tile>

<style lang="sass">
  .username
    text-transform: capitalize
    font-weight: 700

  .created_at
    text-align: right
  
  .content
    padding-top: 10px
</style>