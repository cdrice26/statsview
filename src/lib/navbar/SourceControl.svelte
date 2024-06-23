<script>
  import Select from './Select.svelte';
  import ColumnSelect from './ColumnSelect.svelte';

  export let source;
  export let setSource = (source) => {};

  export let tableBlocks;

  $: currentTable = tableBlocks.filter(
    (table) => table.title == focus.sources
  )[0];

  export let focus;

  export let col;
  export let col2;
  export let setCol = (col, num) => {};
</script>

<!--Source Dropdown-->
<img src="source.png" alt="Data Source" />:
<Select value={source} setter={setSource}>
  {#each tableBlocks as table}
    <option value={table.title}>{table.title}</option>
  {/each}
</Select>

<!--Column Dropdown-->
{#if focus.sources != null}
  {#if currentTable.dataType == 'Quantitative' || currentTable.dataType == 'Binary' || focus.testType == 'X2GOFTest'}
    <ColumnSelect value={col} setter={setCol} num="1">
      {#each currentTable.content[0] as title, index}
        <option value={currentTable.hasHeaders ? title : 'Column ' + index}
          >{currentTable.hasHeaders ? title : 'Column ' + index}</option
        >
      {/each}
    </ColumnSelect>

    <!--Second Column Dropdown/Button - Only for 2-Sample tests-->
    {#if focus.sources !== null && focus.sources !== undefined && focus.type == 'test' && focus.testType != null}
      {#if focus.testType.includes('2Samp') || focus.testType.includes('MP')}
        vs. <ColumnSelect value={col2} setter={setCol} num="2">
          {#each currentTable.content[0] as title, index}
            <option value={currentTable.hasHeaders ? title : 'Column ' + index}
              >{currentTable.hasHeaders ? title : 'Column ' + index}</option
            >
          {/each}
        </ColumnSelect>
      {/if}
    {/if}
  {/if}
{/if}
|

<style>
  img {
    position: relative;
    top: 3px;
    width: 15px;
  }
</style>
