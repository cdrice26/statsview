<script>
  import { generateTestText } from '../helper/testHelpers';
  import TextBlock from './TextBlock.svelte';

  /**
   * @typedef {Object} Props
   * @property {any} properties
   * @property {any} testResults - The results of the test to display here
   * @property {any} [setFocus]
   */

  /** @type {Props} */
  let {
    properties = $bindable({}),
    testResults = null,
    setFocus = (focus) => {}
  } = $props();

  let generatedContent = $derived(generateTestText(properties, testResults));
</script>

<TextBlock
  properties={{
    ...properties,
    content: generatedContent
  }}
  setFocus={() => setFocus(properties)}
/>
