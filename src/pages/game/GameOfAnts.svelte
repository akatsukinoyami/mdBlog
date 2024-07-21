<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import food_icon from '../../assets/food.png';
  import ant_empty_icon from '../../assets/ant_empty.png';
  import ant_loaded_icon from '../../assets/ant_loaded.png';
  import house_empty_icon from '../../assets/house_empty.png';
  import house_with_ant_icon from '../../assets/house_with_ant.png';
  

  type State =  'empty' | 'food' | 'ant_empty' | 'ant_loaded' | 'house_empty' | 'house_with_ant';
  const icon: Record<any, any> = { 
    food: food_icon, 
    ant_empty: ant_empty_icon, 
    ant_loaded: ant_loaded_icon, 
    house_empty: house_empty_icon, 
    house_with_ant: house_with_ant_icon 
  };

  const width = 60, height = 60;
  
  const initialStates: { key: State, probability: number }[] = [
    { key: 'empty', probability: 0.8 },
    { key: 'food', probability: 0.007 },
    { key: 'ant_empty', probability: 0 },
    { key: 'ant_loaded', probability: 0 },
    { key: 'house_empty', probability: 0 },
    { key: 'house_with_ant', probability: 0.003 },
  ]

  let map = Array.from({length: height}, () => Array.from({length: width}, () => getRandomKey(initialStates)));
  let tempMap: any[] = [];
  let foods: any[] = [];
  let homes: any[] = [];
  let intervalId: number;

  function set(y: number, x: number, type: string) {
    if (y >= 0 && x >= 0) {
      try {
        tempMap[y][x] = type;
      } catch {
        console.log(y, x, tempMap?.[y], tempMap?.[y]?.[x])
      }
    }
  }

  function move(goal: number, current: number, max: number): number {
    if (goal < current) {
      return current - 1 >= 0 ? current - 1 : max - 1;
    } else if (goal > current) {
      return current + 1 < max ? current + 1 : 0;
    } else {
      return current;
    }
  }

  const handler: Record<State, (rowIndex: number, cellIndex: number) => void> = {
    empty(rowIndex, cellIndex) {
      if (Math.random() < 0.0004) {
        set(rowIndex, cellIndex, 'food');
      }
    },
    food(rowIndex, cellIndex) {},
    ant_empty(rowIndex, cellIndex) {
      let closestCoords = findClosestCoords([rowIndex, cellIndex], foods);
      if (closestCoords) {
        let y = move(closestCoords[0], rowIndex, height);
        let x = move(closestCoords[1], cellIndex, width);
  
        if (
          (x !== cellIndex || y !== rowIndex) &&
          (map[y][x] === 'food' || map[y][x] === 'empty')
        ) {
          set(rowIndex, cellIndex, 'empty');
          if (map[y][x] === 'empty') {
            set(y, x, 'ant_empty');
          } else if (map[y][x] === 'food') {
            set(y, x, 'ant_loaded');
          }
        }
      }
    },
    ant_loaded(rowIndex, cellIndex) {
      const closestCoords = findClosestCoords([rowIndex, cellIndex], homes);
      if (closestCoords) {
        let y = move(closestCoords[0], rowIndex, height);
        let x = move(closestCoords[1], cellIndex, width);

        if (
          (x !== cellIndex || y !== rowIndex) &&
          (map[y][x] === 'house_empty' || map[y][x] === 'empty')
        ) {
          set(rowIndex, cellIndex, 'empty');
          if (map[y][x] === 'empty') {
            set(y, x, 'ant_loaded')
          } else if (map[y][x] === 'house_empty') {
            set(y, x, 'house_with_ant')
          };
        }
      }
    },
    house_empty(rowIndex, cellIndex) {
      if (Math.random() < 0.0001) {
        set(rowIndex, cellIndex, 'house_with_ant');
      }
    },
    house_with_ant(rowIndex: number, cellIndex: number): void {
      set(rowIndex, cellIndex, 'house_empty')
      set(rowIndex + getRandomIncrement(), cellIndex + getRandomIncrement(), 'ant_empty')
    }
  }

  function iter() {
    tempMap = [...map.map(row => [...row])];

    foods = [];
    homes = [];

    tempMap.forEach((row, rowIndex) => 
      row.forEach((cell: State, cellIndex: number) => {
        if (cell === 'food') foods.push([rowIndex, cellIndex]);
        if (cell === 'house_empty') homes.push([rowIndex, cellIndex]);
      })
    )

    tempMap.forEach((row, rowIndex) => 
      row.forEach((cell: State, cellIndex: number) => 
        handler[cell](rowIndex, cellIndex)
    ));

    map = [...tempMap.map(row => [...row])];
  }

  function startLoop() {
    if (!intervalId) intervalId = setInterval(iter, 100);
  }

  function stopLoop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = 0;
    }
  }

  onMount(startLoop);
  onDestroy(stopLoop);

  function getRandomKey(items: { key: any, probability: number }[]): any {
    const totalProbability = items.reduce((sum, item) => sum + item.probability, 0);
    const randomNum = Math.random() * totalProbability;
    let cumulativeProbability = 0;
    for (let item of items) {
      cumulativeProbability += item.probability;
      if (randomNum < cumulativeProbability) return item.key;
    }
  }

  function getRandomIncrement(): -1 | 1 {
    const possibleValues = [-1, 1] as const;
    return possibleValues[Math.floor(Math.random() * possibleValues.length)]
  }

  function findClosestCoords(target: [number, number], coords: [number, number][]): [number, number] {
    return coords.reduce((closest, current) => {
        const closestDist = Math.abs(target[0] - closest[0]) + Math.abs(target[1] - closest[1]);
        const currentDist = Math.abs(target[0] - current[0]) + Math.abs(target[1] - current[1]);
        return currentDist < closestDist ? current : closest;
    }, coords[0]);
  }

  function handleClick(rowIndex: number, cellIndex: number, set: State): void {
    if (map[rowIndex][cellIndex] !== 'empty') return;
    map[rowIndex][cellIndex] = set;
  }
</script>

<svelte:window on:keydown={() => {(intervalId ? stopLoop : startLoop)()}} />

<h1 style:margin-top="90px">Game of Ants</h1>

<grid 
  style:margin="120px auto"
  style:display="grid"
  style:grid-template-rows="repeat({height},16px)"
  style:grid-template-columns="repeat({width},16px)"
  style:gap="2px"
  style:position="absolute"
  style:top="50%"
  style:left="50%"
  style:transform="translate(-50%, -50%)"
>
  {#each map as row, rowIndex}
    {#each row as cell, cellIndex}
      <cell 
        style:background-color="rgb(38, 38, 38)"
        style:background-size="contain"
        style:background-repeat="no-repeat"
        style={cell !== 'empty' ? `background-image: url(${icon[cell]});` : 0}
        row-index={rowIndex} cell-index={cellIndex}
        on:click|preventDefault={() => handleClick(rowIndex, cellIndex, 'ant_empty')}
        on:contextmenu|preventDefault={() => handleClick(rowIndex, cellIndex, 'food')}
        on:keyup role="button" tabindex=-1
      />
    {/each}
  {/each}
</grid>