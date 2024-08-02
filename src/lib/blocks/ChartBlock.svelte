<script>
  import Plotly from 'plotly.js-dist';
  import { getData } from '../stats/getData';
  import { onMount } from 'svelte';
  import { getUnique } from '../helper/unique';
  import { occurrencesOf } from '../helper/count';
  import { calculateGridSize, calculateRowAndColumn } from '../helper/gridSize';

  export let props;
  export let tableBlocks;
  $: sourceBlock = tableBlocks.find((table) => table.title == props.sources);
  $: sourceData = sourceBlock?.content;
  $: rotatedData =
    sourceData !== null && sourceData !== undefined
      ? Object.fromEntries(
          props?.cols?.map((col) => [
            col,
            getData(
              sourceData,
              col,
              sourceBlock?.hasHeaders,
              sourceBlock?.dataType
            )
          ]) ?? []
        )
      : null;
  $: x =
    props?.xCol != null
      ? getData(sourceData, props.xCol, sourceBlock?.hasHeaders, 'Quantitative')
      : null;
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
      sourceBlock?.dataType === 'Quantitative'
        ? props.chartType === 'scatter' || props.chartType === 'line'
          ? Object.entries(rotatedData).map((d) => ({
              x: x,
              y: d[1],
              name: d[0],
              type: 'scatter',
              mode: props.chartType === 'line' ? 'lines' : 'markers'
            }))
          : Object.entries(rotatedData).map((x) => ({
              x: x[1],
              name: x[0],
              type: props.chartType ?? 'histogram'
            }))
        : sourceBlock?.dataType === 'Categorical' ||
            sourceBlock?.dataType === 'Binary'
          ? Object.entries(rotatedData).map((d, idx) => ({
              [props.chartType === 'pie' ? 'labels' : 'x']: getUnique(d[1]),
              [props.chartType === 'pie' ? 'values' : 'y']: getUnique(d[1]).map(
                (x) => occurrencesOf(d[1], x)
              ),
              name: d[0],
              type: props.chartType ?? 'bar',
              domain:
                props.chartType === 'pie'
                  ? calculateRowAndColumn(
                      idx,
                      calculateGridSize(Object.keys(rotatedData).length).columns
                    )
                  : {}
            }))
          : {};

    const layout = {
      title: props.title,
      height: 400,
      width: 850,
      grid: props.chartType === 'pie' ? calculateGridSize(data.length) : {}
    };

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
