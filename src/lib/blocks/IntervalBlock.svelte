<script>
  import { getInterval, getIntervalText } from '../helper/intervalHelpers';
  import { getColumnData } from '../helper/testHelpers';
  import TextBlock from './TextBlock.svelte';

  /**
   * @typedef {Object} Props
   * @property {any} properties
   * @property {Array} tableBlocks
   * @property {any} [updateBlock]
   * @property {any} [setFocus]
   */

  /** @type {Props} */
  let {
    properties,
    updateBlock = (id, updates) => {},
    tableBlocks = null,
    setFocus = (focus) => {}
  } = $props();

  // sourceBlock is the table in tableBlocks whose title is equal to properties.sources
  let sourceBlock = $derived(
    tableBlocks.length > 0
      ? tableBlocks.filter((table) => table.title == properties.sources)[0]
      : null
  );

  // Data in the right format (numeric for quantitative, 0 or 1 for binary, string for categorical) for column 1 of a test
  let data = $derived(getColumnData(properties, sourceBlock, properties?.col));
  // Data in the right format (numeric for quantitative, 0 or 1 for binary, string for categorical) for column 2 of a test
  let data2 = $derived(
    getColumnData(properties, sourceBlock, properties?.col2)
  );

  let interval = $derived(
    getInterval(
      properties?.intervalType,
      data,
      data2,
      properties?.confidenceLevel
    )
  );

  let generatedContent = $derived(
    getIntervalText(
      properties?.confidenceLevel,
      properties?.intervalType,
      properties?.col,
      properties?.col2,
      interval
    )
  );
</script>

<TextBlock
  properties={{
    ...properties,
    content: generatedContent
  }}
  {updateBlock}
  setFocus={() => setFocus(properties)}
/>
