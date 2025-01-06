<script>
  import Select from './Select.svelte';
  import ColumnSelect from './ColumnSelect.svelte';
  import ColumnSelectMulti from './ColumnSelectMulti.svelte';

  let {
    source,
    setSource = (source) => {},
    tableBlocks,
    sourceTable,
    focus,
    col,
    col2,
    cols,
    setCol = (col, num) => {},
    setCols = (cols) => {}
  } = $props();
</script>

<!--Source Dropdown-->
<img src="source.png" alt="Data Source" />:
<Select value={source} setter={setSource}>
  {#each tableBlocks as table}
    <option value={table.title}>{table.title}</option>
  {/each}
</Select>

<!--Column Dropdown-->
{#if focus.sources !== null}
  {#if focus.type === 'chart'}
    <ColumnSelectMulti
      selected={cols ?? []}
      setter={setCols}
      allCols={sourceTable.content[0].map((col, idx) =>
        sourceTable.hasHeaders ? col : 'Column ' + idx
      ) ?? []}
    />
  {:else if (sourceTable.dataType == 'Quantitative' && !focus.testType?.includes('ANOVA')) || sourceTable.dataType == 'Binary' || focus.testType == 'X2GOFTest'}
    <ColumnSelect value={col ?? ''} setter={setCol} num="1">
      {#each sourceTable.content[0] as title, index}
        <option value={sourceTable.hasHeaders ? title : 'Column ' + index}
          >{sourceTable.hasHeaders ? title : 'Column ' + index}</option
        >
      {/each}
    </ColumnSelect>

    <!--Second Column Dropdown/Button - Only for 2-Sample tests-->
    {#if (focus.sources !== null && focus.sources !== undefined && focus.type == 'test' && focus.testType != null) || focus.type == 'stat'}
      {#if focus?.testType?.includes('2Samp') || focus?.testType?.includes('MP') || focus?.testType?.includes('Regression') || focus?.statType?.includes('Correlation Coefficient') || focus?.statType?.includes('R-Squared')}
        vs. <ColumnSelect value={col2 ?? ''} setter={setCol} num="2">
          {#each sourceTable.content[0] as title, index}
            <option value={sourceTable.hasHeaders ? title : 'Column ' + index}
              >{sourceTable.hasHeaders ? title : 'Column ' + index}</option
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
