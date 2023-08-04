<script lang="ts">

  /*global setInterval, clearInterval */

  interface Area {
    visited?: boolean;
    occupied?: boolean;
    x: number;
    
    y: number;
    element: HTMLElement | null;
  }

    let interval: number
  let blockSize: number = 40;
  let inlineSize: number = 40;

  let divider: number = 5;
  let prevDivider: number;

  let areas: Area[] = [];
  let areaBlockSize: number;
  let areaInlineSize: number;

  let roombar: Area = {
    x: 0,
    y: 0,
    element: null
  }

  $: areaBlockSize = blockSize / divider;
  $: areaInlineSize = inlineSize / divider;
  $: if(divider !== prevDivider || !prevDivider) {
    stopAnimation();
    initAreas();
    startAnimation();
    prevDivider = divider;
  }

  const initAreas = (): void => {
    areas = [];

    for(let i: number = 0; i < divider; i++) {
      for(let j: number = 0; j < divider; j++) {
        areas.push({
          visited: false,
          occupied: false,
          x: j,
          y: i,
          element: null
        })
      }
    }
  };

  const startAnimation = (): void => {
    roombar = {
      x: 0,
      y: 0,
      element: null
    }

    interval = setInterval(() => {
      const rightArea = areas.find(area => area.x === roombar.x + 1 && area.y === roombar.y);
      const leftArea = areas.find(area => area.x === roombar.x - 1 && area.y === roombar.y);
      const bottomArea = areas.find(area => area.x === roombar.x && area.y === roombar.y + 1);

      areas.find(area => area.x === roombar.x && area.y === roombar.y).visited = true;

      if (rightArea && !rightArea.visited) {
        roombar.x = roombar.x + 1;
      } else if (leftArea && !leftArea.visited) {
        roombar.x = roombar.x - 1;
      } else if (bottomArea && !bottomArea.visited) {
        roombar.y = roombar.y + 1;
      } else {
        stopAnimation();
      }

      areas = areas;
    }, 500)
  };

  const stopAnimation = (): void => {
    clearInterval(interval);
  };
</script>

<h1 class="headline">Roombar</h1>

<div class="controls">
  <div class="control">
    <div class="number"><label for="height">change room height</label>{blockSize}</div>
    <input id="height" type="range" step="10" min="10" max="100" bind:value={blockSize}/>
  </div>
  
  <div class="control">
    <div class="number"><label for="width">change room width</label>{inlineSize}</div>
    <input id="width" type="range" step="10" min="10" max="100" bind:value={inlineSize}/>
  </div>
  <div class="control">
    <div class="number"><label for="width">change divider</label>{divider}</div>
    <input id="divider" type="range" step="5" min="5" max="20" bind:value={divider}/>
  </div>
</div>

<div
  class="grid"
  style="
    --inline-size: {inlineSize}rem;
    --block-size: {blockSize}rem;
    --area-block-size: {areaBlockSize}rem;
    --area-inline-size: {areaInlineSize}rem
  "
>
  <div
    bind:this={roombar.element}
    class="roombar"
    style="
      --left: {roombar.x * areaInlineSize}rem;
      --top: {roombar.y * areaBlockSize}rem
    "
  >
    x:{roombar.x} y:{roombar.y}
  </div>
  {#each areas as area}
    <div
      bind:this={area.element}
      class="area {area.visited ? 'is-visited' : ''} {area.occupied ? 'is-occupied' : ''}"
    >
      x:{area.x} y:{area.y}
    </div>
  {/each}
</div>

<style>
  .headline {
    font-size: 5rem;
    text-align: center;
    margin-block-start: 3rem;
  }

  .grid {
    --text-light: #fff;
    --decoration-light: #F8F6F4;
    --decoration-dark: #E3F4F4;
    --success: #6BCB77;
    --error: #FF6B6B;
    --highlight: #4D96FF;

    display: flex;
    flex-wrap: wrap;
    position: relative;
    inline-size: var(--inline-size);
    block-size: var(--block-size);
    margin-block-start: 4rem;
  }

  .controls {
    display: flex;
    gap: 1rem;
    margin-block-start: 3rem;
  }

  .control {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .number {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 5rem;
  }

  .number label {
    font-size: 1rem;
  }

  input[type="range"] {
    -webkit-appearance: none;
    background-color: #bdc3c7;
    width: 15rem;
    height: 5px;
    border-radius: 5px;
    outline: 0;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #e74c3c;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;
    transition: .3s ease-in-out;
  }

  .roombar {
    position: absolute;
    left: var(--left, 0);
    top: var(--top, 0);
    background-color: var(--highlight);
    color: var(--text-light);
  }

  .area, 
  .roombar {
    inline-size: var(--area-inline-size);
    block-size: var(--area-block-size);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .area:nth-child(even) {
    background-color: var(--decoration-dark);
  }

  .area:nth-child(odd) {
    background-color: var(--decoration-light);
  }

  .area.is-visited {
    color: var(--text-light);
    background-color: var(--success);
  }

  .area.is-occupied {
    background-color: var(--error);
  }
</style>