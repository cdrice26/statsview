<!-- @migration-task Error while migrating Svelte code: migrating this component would require adding a `$properties` rune but there's already a variable named properties.
     Rename the variable and try again or migrate by hand. -->
<script>
  import { generateTestText } from '../helper/testHelpers';
  import TextBlock from './TextBlock.svelte';

  export let properties;
  export let sourceBlock;

  // The results of the test to display here
  export let testResults;

  export let setFocus = (focus) => {};
</script>

<TextBlock
  properties={{
    ...properties,
    content: generateTestText(properties, testResults, sourceBlock)
  }}
  setFocus={() => setFocus(properties)}
/>
