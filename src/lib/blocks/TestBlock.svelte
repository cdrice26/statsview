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
    properties,
    sourceBlock,
    testResults,
    setFocus = (focus) => {}
  } = $props();
</script>

<TextBlock
  properties={{
    ...properties,
    content: generateTestText(properties, testResults, sourceBlock)
  }}
  setFocus={() => setFocus(properties)}
/>
