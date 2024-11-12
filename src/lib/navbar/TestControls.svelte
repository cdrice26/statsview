<script>
  import Button from './Button.svelte';
  import Select from './Select.svelte';

  // The current type of table that the block we are editing is attached to
  export let currentType;

  export let testType;
  export let setTestType = (testType) => {};

  export let setupTest = () => {};
</script>

<!--Type Dropdown for Tests-->
<Select value={testType} setter={setTestType}>
  {#if currentType == 'Quantitative'}
    <option value="1SampTTest">1-Sample T-Test</option>
    <option value="2SampTTest">2-Sample T-Test</option>
    <option value="MPTTest">Matched Pairs T-Test</option>
    <option value="2SampVarTest">2-Sample Variance Test</option>
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
