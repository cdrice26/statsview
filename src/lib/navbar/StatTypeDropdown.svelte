<script>
  import Select from './Select.svelte';

  let { statType, setStatType } = $props();
</script>

<!--A dropdown with various statistics as options-->
<Select value={statType} setter={setStatType} tooltip="Statistic Type">
  <option value="Mean">Mean</option>
  <option value="StDev">StDev</option>
  <option value="Median">Median</option>
  <option value="IQR">IQR</option>
  <option value="Range">Range</option>
  <option value="Min">Min</option>
  <option value="Max">Max</option>
  <option value="R-Squared">R-Squared</option>
  <option value="Correlation Coefficient">Correlation Coefficient</option>
</Select> |
