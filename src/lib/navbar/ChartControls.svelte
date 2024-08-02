<script>
  import Select from './Select.svelte';

  export let setChartType = (chartType) => {};
  export let chartType;
  export let dataType;
  export let xCol;
  $: currentTable = tableBlocks.filter(
    (table) => table.title == focus.sources
  )[0];

  export let focus;
  export let tableBlocks;
  export let setXCol = (xCol) => {};
</script>

<!--Chart Controls-->
<Select value={chartType} setter={setChartType}>
  {#if dataType == 'Categorical' || dataType == 'Binary'}
    <option value="Bar">Bar Chart</option>
    <option value="Pie">Pie Chart</option>
  {:else if dataType == 'Quantitative'}
    <option value="histogram">Histogram</option>
    <option value="box">Boxplot</option>
    <option value="Scatter">Scatter Plot</option>
  {/if}
</Select>
{#if chartType === 'Scatter'}
  x:
  <Select value={xCol} setter={setXCol}>
    {#each currentTable.content[0].map( (col, idx) => (currentTable.hasHeaders ? col : 'Column ' + idx) ) ?? [] as title, index}
      <option value={currentTable.hasHeaders ? title : 'Column ' + index}
        >{currentTable.hasHeaders ? title : 'Column ' + index}</option
      >
    {/each}
  </Select>
{/if} |
