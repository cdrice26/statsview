<script>
  import Select from './Select.svelte';
  import TableTitleInput from './tableControls/TableTitleInput.svelte';

  let {
    setChartType = (chartType) => {},
    title,
    setChartTitle = (chartTitle) => {},
    chartType,
    xCol,
    sourceTable,
    setXCol = (xCol) => {}
  } = $props();
</script>

<!--Chart Controls-->
<TableTitleInput {title} setTitle={setChartTitle} />
<Select value={chartType} setter={setChartType} tooltip="Chart Type">
  <option value="bar" selected>Bar Chart</option>
  <option value="pie">Pie Chart</option>
  <option value="histogram" selected>Histogram</option>
  <option value="box">Boxplot</option>
  <option value="scatter">Scatter Plot</option>
  <option value="line">Line Chart</option>
</Select>
{#if chartType === 'scatter' || chartType === 'line'}
  x:
  <Select value={xCol} setter={setXCol} tooltip="X-Axis Column">
    {#each sourceTable.content[0].map( (col, idx) => (sourceTable.hasHeaders ? col : 'Column ' + idx) ) ?? [] as title, index}
      <option value={sourceTable.hasHeaders ? title : 'Column ' + index}
        >{sourceTable.hasHeaders ? title : 'Column ' + index}</option
      >
    {/each}
    <option value={null}>Index</option>
  </Select>
{/if} |
