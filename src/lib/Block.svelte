<script>
    import TextBlock from './blocks/TextBlock.svelte';
    import TableBlock from './blocks/TableBlock.svelte';
    import ChartBlock from './blocks/ChartBlock.svelte';
    import StatBlock from './blocks/StatBlock.svelte';
    import TestProvider from './blocks/TestProvider.svelte';

    export let props;
    export let tableBlocks;
    export let setFocus = (props) => {};
    export let forceUpdate = () => {};
</script>

<!--Render the correct block based on type. Text, Tests, and Stats all use text blocks
    at the core, only the toolbar is different.-->
{#if props.type == 'text'}
    <TextBlock {props} {setFocus} {forceUpdate} />
{:else if props.type == 'stat'}
    <StatBlock {props} {tableBlocks} {setFocus} />
{:else if props.type == 'table'}
    <TableBlock {props} {setFocus} {forceUpdate} />
{:else if props.type == 'chart'}
    <ChartBlock {props} {tableBlocks} {setFocus} />
{:else if props.type == 'test'}
    <!--We need to use a separate TestProvider component to clean up the code that calculates test results.
        TestProvider in itself renders a TestBlock.-->
    <TestProvider {props} {tableBlocks} {setFocus} />
{/if}
