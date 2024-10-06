<script>
  import TextBlock from './TextBlock.svelte';
  import generateStatText from '../helper/statTextGenerator';

  export let props;
  export let tableBlocks;
  // sourceBlock is the table in tableBlocks whose title is equal to props.sources
  $: sourceBlock =
    tableBlocks.length > 0
      ? tableBlocks.filter((table) => table.title == props.sources)[0]
      : null;
  export let setFocus = (props) => {};
</script>

<!--We use a TextBlock to display the statistics. This code first checks the statistic we want to calculate
    and outputs its name into the TextBlock. Then it checks to make sure we have data to calculate the statistic.
    If we don't, it outputs 'Source Configuration Required'. If we do, it calculates the statistic for the given
    column of the given table and then prints that out into the TextBlock.-->
<TextBlock
  props={{
    ...props,
    content:
      generateStatText(props, sourceBlock) || 'Source Configuration Required'
  }}
  setFocus={() => setFocus(props)}
/>
