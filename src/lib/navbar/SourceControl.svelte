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

  const filterDataType = (_col, index) => {
    if (sourceTable === null || sourceTable === undefined) {
      return false;
    } else if (sourceTable?.dataType.length <= index) {
      return false;
    }
    if (focus.type === 'stat') {
      return sourceTable?.dataType[index] === 'Quantitative';
    } else if (focus.type === 'chart') {
      if (focus.chartType === 'bar' || focus.chartType === 'pie') {
        return (
          sourceTable?.dataType[index] === 'Categorical' ||
          sourceTable?.dataType[index] === 'Binary'
        );
      } else {
        return sourceTable?.dataType[index] === 'Quantitative';
      }
    } else if (focus.type === 'test') {
      if (focus.testType.includes('ZTest')) {
        return sourceTable?.dataType[index] === 'Binary';
      } else if (focus.testType.includes('X2')) {
        return sourceTable?.dataType[index] === 'Categorical';
      } else {
        return sourceTable?.dataType[index] === 'Quantitative';
      }
    } else if (focus.type === 'interval') {
      return sourceTable?.dataType[index] === 'Quantitative';
    }
  };
</script>

<!--Source Dropdown-->
<img src="source.png" alt="Data Source" />:
<Select value={source} setter={setSource}>
  {#each tableBlocks as table}
    <option value={table.title}>{table.title}</option>
  {/each}
</Select>

<!--Column Dropdown-->
{#if tableBlocks && tableBlocks.length > 0 && sourceTable?.content?.[0] && focus}
  {#if focus.sources !== null}
    {#if focus.type === 'chart' || (focus.type === 'test' && focus.testType && (focus.testType.includes('ANOVA') || focus.testType.includes('X2Ind')))}
      <ColumnSelectMulti
        selected={cols ?? []}
        setter={setCols}
        allCols={sourceTable.content[0]
          .map((col, idx) => (sourceTable.hasHeaders ? col : 'Column ' + idx))
          .filter((_, index) => {
            try {
              return filterDataType(_, index);
            } catch {
              return false;
            }
          }) ?? []}
      />
    {:else}
      <ColumnSelect value={col ?? ''} setter={setCol} num="1">
        {#each (sourceTable.content[0] ?? []).filter((_, index) => {
          try {
            return filterDataType(_, index);
          } catch {
            return false;
          }
        }) as title, index}
          <option value={sourceTable.hasHeaders ? title : 'Column ' + index}>
            {sourceTable.hasHeaders ? title : 'Column ' + index}
          </option>
        {/each}
      </ColumnSelect>

      {#if (focus?.sources && focus.type === 'test' && focus?.testType) || focus.type === 'stat' || focus.type === 'interval'}
        {#if (focus?.testType && (focus.testType.includes('2Samp') || focus.testType.includes('MP') || focus.testType.includes('Regression'))) || (focus?.statType && (focus.statType.includes('Correlation Coefficient') || focus.statType.includes('R-Squared'))) || (focus?.intervalType && focus.intervalType.includes('2Samp'))}
          vs. <ColumnSelect value={col2 ?? ''} setter={setCol} num="2">
            {#each (sourceTable.content[0] ?? []).filter((_, index) => {
              try {
                return filterDataType(_, index);
              } catch {
                return false;
              }
            }) as title, index}
              <option
                value={sourceTable.hasHeaders ? title : 'Column ' + index}
              >
                {sourceTable.hasHeaders ? title : 'Column ' + index}
              </option>
            {/each}
          </ColumnSelect>
        {/if}
      {/if}
    {/if}
  {/if}
{/if}

<style>
  img {
    position: relative;
    top: 3px;
    width: 15px;
  }
</style>
