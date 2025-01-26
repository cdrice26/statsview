<script>
  import TextBlock from './blocks/TextBlock.svelte';
  import TableBlock from './blocks/TableBlock.svelte';
  import ChartBlock from './blocks/ChartBlock.svelte';
  import StatBlock from './blocks/StatBlock.svelte';
  import TestProvider from './blocks/TestProvider.svelte';
  import IntervalBlock from './blocks/IntervalBlock.svelte';

  let {
    properties,
    updateBlock = (id, updates) => {},
    tableBlocks,
    setFocus = (properties) => {},
    forceUpdate = () => {}
  } = $props();
</script>

<!--Render the correct block based on type. Text, Tests, and Stats all use text blocks
    at the core, only the toolbar is different.-->
{#if properties.type == 'text'}
  <TextBlock {properties} {updateBlock} {setFocus} {forceUpdate} />
{:else if properties.type == 'stat'}
  <StatBlock {properties} {updateBlock} {tableBlocks} {setFocus} />
{:else if properties.type == 'table'}
  <TableBlock {properties} {updateBlock} {setFocus} {forceUpdate} />
{:else if properties.type == 'chart'}
  <ChartBlock {properties} {tableBlocks} {setFocus} />
{:else if properties.type == 'test'}
  <!--We need to use a separate TestProvider component to clean up the code that calculates test results.
        TestProvider in itself renders a TestBlock.-->
  <TestProvider {properties} {updateBlock} {tableBlocks} {setFocus} />
{:else if properties.type === 'interval'}
  <IntervalBlock {properties} {updateBlock} {tableBlocks} {setFocus} />
{/if}
