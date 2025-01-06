<!-- @migration-task Error while migrating Svelte code: migrating this component would require adding a `$properties` rune but there's already a variable named properties.
     Rename the variable and try again or migrate by hand. -->
<script>
  import TestBlock from './TestBlock.svelte';
  import { getColumnData, getTestResults } from '../helper/testHelpers';

  export let properties;
  export let tableBlocks;

  // sourceBlock is the table in tableBlocks whose title is equal to properties.sources
  $: sourceBlock =
    tableBlocks.length > 0
      ? tableBlocks.filter((table) => table.title == properties.sources)[0]
      : null;

  // Data in the right format (numeric for quantitative, 0 or 1 for binary, string for categorical) for column 1 of a test
  $: data = getColumnData(properties, sourceBlock, properties?.col);

  // Data in the right format (numeric for quantitative, 0 or 1 for binary, string for categorical) for column 2 of a test
  $: data2 = getColumnData(properties, sourceBlock, properties?.col2);

  export let setFocus = (focus) => {};
</script>

<TestBlock
  {properties}
  {sourceBlock}
  {setFocus}
  testResults={getTestResults(data, data2, properties, sourceBlock)}
/>
