<script lang="ts">
  import lappland from "../../../assets/lapp.png";
  import mudrock from "../../../assets/mudrock.png";

  export let 
    i: number, 
    statuses: string[], 
    compute: (i: number) => void;

  const contents: Record<string, string> = { empty: "", cross: lappland, circle: mudrock };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
  class="cell" 
  on:click={() => {compute(i)}} 
  on:keydown={() => {compute(i)}} 
  style:background-image="url({contents[statuses[i]]})"
/>

<style>
  .cell {
    background-size: contain;
    background-repeat: no-repeat;
    width: 200px;
    height: 200px;
    border: 1px solid black;
    text-align: center;
    vertical-align: middle;
  }
</style>