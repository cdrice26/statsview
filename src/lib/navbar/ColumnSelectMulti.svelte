<script>
  import { MultiSelect } from 'svelte-multiselect';

  let { allCols, selected, setter = (cols) => {} } = $props();

  const onChange = (e) => {
    const detail = e?.detail;
    if (!detail) return;

    let newSelected;
    if (detail.type === 'add') {
      newSelected = [...selected, detail.option];
    } else {
      newSelected = selected.filter((col) => col !== detail.option);
    }

    setter(newSelected);
  };
</script>

<div class="multiselect-wrapper">
  <MultiSelect
    {selected}
    on:change={onChange}
    options={allCols}
    placeholder="Select Columns"
  />
</div>

<style>
  .multiselect-wrapper {
    display: inline-block;
    vertical-align: middle;
    min-height: 25px;
    max-height: 25px;
  }

  /* Ensure the styles are applied specifically */
  .multiselect-wrapper :global(.multiselect) {
    max-height: 25px !important;
    min-height: 25px !important;
    margin: 0 !important;
    padding: 0 !important;
    border: 1px solid black !important;
    box-sizing: border-box;
  }

  /* Additional styling to handle internal elements */
  .multiselect-wrapper :global(.multiselect .multiselect__control) {
    height: 20px !important;
    min-height: 29px;
  }

  .multiselect-wrapper :global(.multiselect .multiselect__input) {
    height: 100% !important; /* Ensure input fits within control */
    line-height: 25px !important; /* Vertically center text */
  }
</style>
