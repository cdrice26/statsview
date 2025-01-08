<script>
  import Select from './Select.svelte';

  /**
   * @typedef {Object} Props
   * @property {any} currentType - The current type of table that the block we are editing is attached to
   * @property {any} intervalType
   * @property {any} [setIntervalType]
   * @property {any} [setupTest]
   * @property {any} confidenceLevel
   * @property {any} [setConfidenceLevel]
   */

  /** @type {Props} */
  let {
    currentType,
    intervalType,
    setIntervalType = (testType) => {},
    confidenceLevel = 0.95,
    setConfidenceLevel = (confidenceLevel) => {}
  } = $props();
</script>

<!--Type Dropdown for Tests-->
<Select value={intervalType} setter={setIntervalType}>
  {#if currentType == 'Quantitative'}
    <option value="1SampTInterval">1-Sample T-Interval</option>
    <option value="2SampTInterval">2-Sample T-Interval</option>
    <option value="2SampVarInterval">2-Sample Variance Interval</option>
  {:else if currentType == 'Binary'}
    <option value="1SampZInterval">1-Sample Z-Interval</option>
    <option value="2SampZInterval">2-Sample Z-Interval</option>
  {/if}
</Select>

<!--Input for confidence level-->
Confidence Level:
<input
  type="number"
  placeholder="Confidence Level"
  bind:value={confidenceLevel}
  oninput={() => setConfidenceLevel(confidenceLevel)}
  step="0.01"
  min="0.70"
  max="0.99"
/> |

<style>
  input {
    border: 1px solid black;
    border-radius: 3px;
    color: black;
    background-color: white;
    vertical-align: middle;
    height: 25px;
    width: 6em;
    padding-left: 5px;
  }
  input:hover,
  input:focus {
    background-color: lightgray;
  }
</style>
