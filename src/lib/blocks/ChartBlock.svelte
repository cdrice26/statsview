<!-- @migration-task Error while migrating Svelte code: migrating this component would require adding a `$properties` rune but there's already a variable named properties.
     Rename the variable and try again or migrate by hand. -->
<script>
  import Plotly from 'plotly.js-dist';
  import { onMount } from 'svelte';
  import {
    generateChartData,
    generateChartLayout,
    getXCol,
    rotateData
  } from '../helper/chartHelpers';

  export let properties;
  export let tableBlocks;
  $: sourceBlock = tableBlocks.find(
    (table) => table.title == properties.sources
  );
  $: sourceData = sourceBlock?.content;
  $: rotatedData = rotateData(sourceData, properties?.cols, sourceBlock);
  $: x = getXCol(sourceData, sourceBlock?.hasHeaders, properties?.xCol);
  export let setFocus = (properties) => {};

  let plotElement;

  onMount(() => {
    createChart();
  });

  $: if (rotatedData || x || properties.chartType) {
    if (plotElement) {
      createChart();
    }
  }

  const createChart = () => {
    const data =
      generateChartData(sourceBlock, properties?.chartType, rotatedData, x) ||
      [];

    const layout = generateChartLayout(
      properties?.title,
      properties?.chartType,
      data
    );

    if (plotElement !== undefined) {
      // Clean up any existing plot before creating a new one
      // @ts-ignore
      Plotly.purge(plotElement);
    }

    // @ts-ignore
    Plotly.react(plotElement, data, layout);
  };
</script>

<button
  type="button"
  aria-label="Interactive plot area"
  on:click={() => setFocus(properties)}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setFocus(properties);
    }
  }}
  style="border: none; background: none; padding: 0; margin: 0; cursor: pointer;"
>
  <div bind:this={plotElement}></div>
</button>
