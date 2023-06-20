<script lang="ts">
  import { ExpandableTile } from "carbon-components-svelte";
import Comment from "./Show.svelte";

  const comments = [
    { user: { username: "username1" }, created_at: "created_at", content: "content1" },
    { user: { username: "username2" }, created_at: "created_at", content: "content2" },
    { user: { username: "username3" }, created_at: "created_at", content: "content3" },
    { user: { username: "username4" }, created_at: "created_at", content: "content4" },
  ]

</script>

<ExpandableTile>
  <div slot="above">
    <h4>Comments:</h4>
  </div>
  <div slot="below">
    {#each comments as comment}
      <Comment comment={ comment }/>
    {/each}
  </div>
</ExpandableTile>



