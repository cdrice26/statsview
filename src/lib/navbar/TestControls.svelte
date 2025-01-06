<script>
  import Button from './Button.svelte';
  import Select from './Select.svelte';

  /**
   * @typedef {Object} Props
   * @property {any} currentType - The current type of table that the block we are editing is attached to
   * @property {any} testType
   * @property {any} [setTestType]
   * @property {any} [setupTest]
   */

  /** @type {Props} */
  let {
    currentType,
    testType,
    setTestType = (testType) => {},
    setupTest = () => {}
  } = $props();
</script>

<!--Type Dropdown for Tests-->
<Select value={testType} setter={setTestType}>
  {#if currentType == 'Quantitative'}
    <option value="1SampTTest">1-Sample T-Test</option>
    <option value="2SampTTest">2-Sample T-Test</option>
    <option value="MPTTest">Matched Pairs T-Test</option>
    <option value="2SampVarTest">2-Sample Variance Test</option>
    <option value="1WayANOVATest">1-Way ANOVA Test</option>
    <option value="RegressionTest">Regression Test</option>
  {:else if currentType == 'Binary'}
    <option value="1SampZTest">1-Sample Z-Test</option>
    <option value="2SampZTest">2-Sample Z-Test</option>
  {:else if currentType == 'Categorical'}
    <option value="X2GOFTest">Chi-Squared Goodness of Fit Test</option>
    <option value="X2IndTest">Chi-Squared Test for Independence</option>
  {/if}
</Select>

<!--Settings Button for Test Setup-->
<Button
  add={null}
  iconSrc="./tune_test.png"
  iconAlt="Statistical Test Setup"
  handleClick={setupTest}
/> |
