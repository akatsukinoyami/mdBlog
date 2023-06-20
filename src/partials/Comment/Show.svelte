<script lang="ts">
  import { Column, Grid, Row, Tile } from "carbon-components-svelte";

  export let comment;
</script>

<Tile>
  <Grid>
    <Row style="justify-content: space-between;">
      <Column><div class="username">{ comment.user.username }</div></Column>
      <Column><div class="created_at">{ comment.created_at }</div></Column>
    </Row>
    <Row>
      <Column><div class="content">{ comment.content }</div></Column>
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