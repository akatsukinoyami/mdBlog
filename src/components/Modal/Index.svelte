<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import { Close } from "carbon-icons-svelte";

  export let 
    show: boolean,
    closeModalCallback: () => void;


  function handleKeydown({ key }) {
    if (!show) return;
    if (["Escape"].includes(key)) closeModalCallback;
	}

  $: document.body.classList[show ? "add" : "remove"]("noscroll");
</script>

<svelte:window on:keydown={handleKeydown}/>

{#if show}
  <slot name="before"/>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="modal-background" on:click={ closeModalCallback }>
    <slot name="modal"/>
  </div>

  <div class="modal-button">
    <Button 
      kind="ghost" 
      size="xl" 
      on:click={ closeModalCallback }    
      iconDescription="Close Image"    
      icon={Close}        
      tooltipPosition="left"
    />
  </div>

  <slot name="after"/>
{/if}

<style lang="sass">
  .modal-
    &background
      position: fixed
      top: 0
      left: 0
      z-index: 10000
      width: 100vw
      height: 100vh
      background-color: rgba(0, 0, 0, 0.5)
      backdrop-filter: blur(4px)
      -webkit-backdrop-filter: blur(4px)

    &button
      position: fixed
      z-index: 10002
      top: 0
      right: 0
</style>
