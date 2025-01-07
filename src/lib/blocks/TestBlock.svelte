<script>
  import { generateTestText } from '../helper/testHelpers';
  import TextBlock from './TextBlock.svelte';

  /**
   * @typedef {Object} Props
   * @property {any} properties
   * @property {any} sourceBlock
   * @property {any} testResults - The results of the test to display here
   * @property {any} [setFocus]
   */

  /** @type {Props} */
  let {
    properties = {},
    sourceBlock = null,
    testResults = null,
    setFocus = (focus) => {}
  } = $props();

  // Add type checking and null checks
  let generatedContent = $derived(
    generateTestText(properties, testResults, sourceBlock)
  );
</script>

<TextBlock
  properties={{
    ...properties,
    content: generatedContent
  }}
  setFocus={() => setFocus(properties)}
/>
