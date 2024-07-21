<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Button, TextInput } from "carbon-components-svelte";

  let 
    height = 63,
    width = 63,
    size = 16,
    fps = 10, 
    intervalId: number = 0, 
    tempMap: boolean[][],
    map: boolean[][] = Array.from({length: height}, () => Array.from({length: width}, () => Math.random() > 0.5 ));
  
  $: map = Array.from({length: height}, () => Array.from({length: width}, () => Math.random() > 0.5 ));

  function reDraw() {
    tempMap = Array.from({length: height}, () => Array.from({length: width}, () => false));
    map.forEach((row, rowIndex) => 
      row.forEach((cell, cellIndex) => {
        const previousRowIndex = rowIndex-1 >= 0 ? rowIndex-1 : height-1;
        const previousCellIndex = cellIndex-1 >= 0 ? cellIndex-1 : width-1;
        const nextRowIndex = rowIndex+1 < height ? rowIndex+1 : 0;
        const nextCellIndex = cellIndex+1 < width ? cellIndex+1 : 0;
        const neigbours = [
          map[previousRowIndex][previousCellIndex],
          map[previousRowIndex][cellIndex],
          map[previousRowIndex][nextCellIndex],
          map[rowIndex][previousCellIndex],
          map[rowIndex][nextCellIndex],
          map[nextRowIndex][previousCellIndex],
          map[nextRowIndex][cellIndex],
          map[nextRowIndex][nextCellIndex],
        ].filter(e => e).length;

        if (map[rowIndex][cellIndex] && (neigbours < 2 || neigbours > 3)) {
          tempMap[rowIndex][cellIndex] = false;
        } else if (!map[rowIndex][cellIndex] && neigbours === 3) {
          tempMap[rowIndex][cellIndex] = true;
        } else {
          tempMap[rowIndex][cellIndex] = map[rowIndex][cellIndex];
        }
      }));
    map = [...tempMap.map(row => [...row])];
  }

  function empty() {
    if (intervalId) clearInterval(intervalId);
    map = Array.from({length: height}, () => Array.from({length: width}, () => false));
  }

  function handleClick(rowIndex: number, cellIndex: number) {
    map[rowIndex][cellIndex] = !map[rowIndex][cellIndex];
  }

  $: if (intervalId) {
    clearInterval(intervalId);
    if (fps > 0) {
      intervalId = setInterval(reDraw, 1000 / fps)
    }
  }

  function startLoop() {
    if (!intervalId && fps > 0) intervalId = setInterval(reDraw, 1000 / fps);
  }

  function stopLoop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = 0;
    }
  }

  onMount(startLoop);
  onDestroy(stopLoop);
</script>

<svelte:window on:keydown={() => {(intervalId ? stopLoop : startLoop)()}} />

<h1 style:margin="40px">Game of Life</h1>

<form
  style:display="flex"
  style:margin="10px"
>
  <TextInput labelText="Height" type="number" bind:value={height} />
  <TextInput labelText="Width" type="number" bind:value={width} />
  <TextInput labelText="Size" type="number" bind:value={size} />
  <TextInput labelText="FPS" type="number" bind:value={fps} />
  <Button on:click={() => (intervalId ? stopLoop : startLoop)()} kind="tertiary">Pause</Button>
  <Button on:click={() => empty()} kind="danger-tertiary">Empty</Button>
</form>

<grid 
  style:display="grid"
  style:margin="10px auto"
  style:grid-template-rows="repeat({height},{size}px)"
  style:grid-template-columns="repeat({width},{size}px)"
  style:gap={size > 4 ? "2px" : "0px"}
>
  {#each map as row, rowIndex}
    {#each row as cell, cellIndex}
      <cell 
        style:background-color={cell ? '#202020' : 'rgba(0,0,0,0)'}
        style:background-size="contain"
        style:background-repeat="no-repeat"
        row-index={rowIndex} cell-index={cellIndex}
        on:click|preventDefault={() => handleClick(rowIndex, cellIndex)}
        on:contextmenu|preventDefault={() => handleClick(rowIndex, cellIndex)}
        on:keyup role="button" tabindex=-1
      />
    {/each}
  {/each}
</grid>