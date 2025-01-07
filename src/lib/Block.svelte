<!-- @migration-task Error while migrating Svelte code: migrating this component would require adding a `$properties` rune but there's already a variable named properties.
     Rename the variable and try again or migrate by hand. -->
<script>
  import TextBlock from './blocks/TextBlock.svelte';
  import TableBlock from './blocks/TableBlock.svelte';
  import ChartBlock from './blocks/ChartBlock.svelte';
  import StatBlock from './blocks/StatBlock.svelte';
  import TestProvider from './blocks/TestProvider.svelte';

  let {
    properties,
    tableBlocks,
    setFocus = (properties) => {},
    forceUpdate = () => {}
  } = $props();
</script>

<!--Render the correct block based on type. Text, Tests, and Stats all use text blocks
    at the core, only the toolbar is different.-->
{#if properties.type == 'text'}
  <TextBlock {properties} {setFocus} {forceUpdate} />
{:else if properties.type == 'stat'}
  <StatBlock {properties} {tableBlocks} {setFocus} />
{:else if properties.type == 'table'}
  <TableBlock {properties} {setFocus} {forceUpdate} />
{:else if properties.type == 'chart'}
  <ChartBlock {properties} {tableBlocks} {setFocus} />
{:else if properties.type == 'test'}
  <!--We need to use a separate TestProvider component to clean up the code that calculates test results.
        TestProvider in itself renders a TestBlock.-->
  <TestProvider {properties} {tableBlocks} {setFocus} />
{/if}
