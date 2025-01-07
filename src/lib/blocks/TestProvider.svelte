<script>
  import TestBlock from './TestBlock.svelte';
  import { getColumnData, getTestResults } from '../helper/testHelpers';

  let { properties, tableBlocks, setFocus = (focus) => {} } = $props();
  // sourceBlock is the table in tableBlocks whose title is equal to properties.sources
  let sourceBlock = $derived(
    tableBlocks.length > 0
      ? tableBlocks.filter((table) => table.title == properties.sources)[0]
      : null
  );
  // Data in the right format (numeric for quantitative, 0 or 1 for binary, string for categorical) for column 1 of a test
  let data = $derived(getColumnData(properties, sourceBlock, properties?.col));
  // Data in the right format (numeric for quantitative, 0 or 1 for binary, string for categorical) for column 2 of a test
  let data2 = $derived(
    getColumnData(properties, sourceBlock, properties?.col2)
  );
</script>

<TestBlock
  {properties}
  {sourceBlock}
  {setFocus}
  testResults={getTestResults(data, data2, properties, sourceBlock)}
/>
