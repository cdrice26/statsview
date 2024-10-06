<script>
  import { generateTestText } from '../helper/testHelpers';
  import TextBlock from './TextBlock.svelte';

  export let props;
  export let sourceBlock;

  // The results of the test to display here
  export let testResults;

  export let setFocus = (focus) => {};
</script>

<TextBlock
  props={{
    ...props,
    content: generateTestText(props, testResults, sourceBlock)
  }}
  setFocus={() => setFocus(props)}
/>
