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
    properties = $bindable({}),
    sourceBlock = null,
    testResults = null,
    setFocus = (focus) => {}
  } = $props();

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
