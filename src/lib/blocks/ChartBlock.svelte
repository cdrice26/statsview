<script>
  import Plotly from 'plotly.js-dist';
  import { onMount } from 'svelte';
  import {
    generateChartData,
    generateChartLayout,
    getXCol,
    rotateData
  } from '../helper/chartHelpers';

  let {
    properties = $bindable({}),
    tableBlocks,
    setFocus = (properties) => {}
  } = $props();

  let plotElement = $state();

  onMount(() => {
    createChart();
  });

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
  let sourceBlock = $derived(
    tableBlocks.find((table) => table.title == properties.sources)
  );
  let sourceData = $derived(sourceBlock?.content);
  let rotatedData = $derived(
    rotateData(sourceData, properties?.cols, sourceBlock)
  );
  let x = $derived(
    getXCol(sourceData, sourceBlock?.hasHeaders, properties?.xCol)
  );
  $effect(() => {
    if (rotatedData || x || properties.chartType) {
      if (plotElement) {
        createChart();
      }
    }
  });
</script>

<button
  type="button"
  aria-label="Interactive plot area"
  onclick={() => setFocus(properties)}
  onkeydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setFocus(properties);
    }
  }}
  style="border: none; background: none; padding: 0; margin: 0; cursor: pointer;"
>
  <div bind:this={plotElement}></div>
</button>
