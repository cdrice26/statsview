<script>
  import Plotly from 'plotly.js-dist';
  import { onMount } from 'svelte';
  import {
    generateChartData,
    generateChartLayout,
    getXCol,
    rotateData
  } from '../helper/chartHelpers';

  export let props;
  export let tableBlocks;
  $: sourceBlock = tableBlocks.find((table) => table.title == props.sources);
  $: sourceData = sourceBlock?.content;
  $: rotatedData = rotateData(sourceData, props?.cols, sourceBlock);
  $: x = getXCol(sourceData, sourceBlock?.hasHeaders, props?.xCol);
  export let setFocus = (props) => {};

  let plotElement;

  onMount(() => {
    createChart();
  });

  $: if (rotatedData || x || props.chartType) {
    if (plotElement) {
      createChart();
    }
  }

  const createChart = () => {
    const data =
      generateChartData(sourceBlock, props?.chartType, rotatedData, x) || [];

    const layout = generateChartLayout(props?.title, props?.chartType, data);

    if (plotElement !== undefined) {
      // Clean up any existing plot before creating a new one
      // @ts-ignore
      Plotly.purge(plotElement);
    }

    // @ts-ignore
    Plotly.react(plotElement, data, layout);
  };

  async function exportChart() {
    const imageOptions = {
      format: 'png',
      width: 850,
      height: 400
    };

    const imgData = await Plotly.toImage(plotElement, imageOptions);
    console.log(imgData); // This is a base64 encoded string that can be used in docx.js

    // You can pass imgData to docx.js to embed it in a Word document
  }
</script>

<button
  type="button"
  aria-label="Interactive plot area"
  on:click={() => setFocus(props)}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setFocus(props);
    }
  }}
  style="border: none; background: none; padding: 0; margin: 0; cursor: pointer;"
>
  <div bind:this={plotElement} />
</button>
