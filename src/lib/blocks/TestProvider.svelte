<script>
  import TestBlock from './TestBlock.svelte';
  import { getColumnData, getTestResults } from '../helper/testHelpers';

  export let props;
  export let tableBlocks;

  // sourceBlock is the table in tableBlocks whose title is equal to props.sources
  $: sourceBlock =
    tableBlocks.length > 0
      ? tableBlocks.filter((table) => table.title == props.sources)[0]
      : null;

  // Data in the right format (numeric for quantitative, 0 or 1 for binary, string for categorical) for column 1 of a test
  $: data = getColumnData(props, sourceBlock, props?.col);

  // Data in the right format (numeric for quantitative, 0 or 1 for binary, string for categorical) for column 2 of a test
  $: data2 = getColumnData(props, sourceBlock, props?.col2);

  export let setFocus = (focus) => {};
</script>

<TestBlock
  {props}
  {sourceBlock}
  {setFocus}
  testResults={getTestResults(data, data2, props, sourceBlock)}
/>
