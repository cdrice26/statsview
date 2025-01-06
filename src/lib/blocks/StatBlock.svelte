<!-- @migration-task Error while migrating Svelte code: migrating this component would require adding a `$properties` rune but there's already a variable named properties.
     Rename the variable and try again or migrate by hand. -->
<script>
  import TextBlock from './TextBlock.svelte';
  import generateStatText from '../helper/statTextGenerator';

  export let properties;
  export let tableBlocks;
  // sourceBlock is the table in tableBlocks whose title is equal to properties.sources
  $: sourceBlock =
    tableBlocks.length > 0
      ? tableBlocks.filter((table) => table.title == properties.sources)[0]
      : null;
  export let setFocus = (properties) => {};
</script>

<!--We use a TextBlock to display the statistics. This code first checks the statistic we want to calculate
    and outputs its name into the TextBlock. Then it checks to make sure we have data to calculate the statistic.
    If we don't, it outputs 'Source Configuration Required'. If we do, it calculates the statistic for the given
    column of the given table and then prints that out into the TextBlock.-->
<TextBlock
  properties={{
    ...properties,
    content:
      generateStatText(properties, sourceBlock) ||
      'Source Configuration Required'
  }}
  setFocus={() => setFocus(properties)}
/>
