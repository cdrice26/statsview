<script>
  import TextBlock from './TextBlock.svelte';
  import generateStatText from '../helper/statTextGenerator';

  let {
    properties,
    updateBlock = (id, updates) => {},
    tableBlocks,
    setFocus = (properties) => {}
  } = $props();

  // sourceBlock is the table in tableBlocks whose title is equal to properties.sources
  let sourceBlock = $derived(
    tableBlocks.length > 0
      ? tableBlocks.filter((table) => table.title == properties.sources)[0]
      : null
  );

  $effect(() => {
    const newContent =
      generateStatText(properties, sourceBlock) ||
      'Source Configuration Required';
    if (properties.content !== newContent) {
      updateBlock(properties.id, { content: newContent });
    }
  });
</script>

<!--We use a TextBlock to display the statistics. This code first checks the statistic we want to calculate
    and outputs its name into the TextBlock. Then it checks to make sure we have data to calculate the statistic.
    If we don't, it outputs 'Source Configuration Required'. If we do, it calculates the statistic for the given
    column of the given table and then prints that out into the TextBlock.-->
<TextBlock {properties} {updateBlock} setFocus={() => setFocus(properties)} />
