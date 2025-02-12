<script>
  let {
    value = $bindable(),
    num,
    setter = (value, num) => {},
    children,
    tooltip = ''
  } = $props();
</script>

<!--Same as the select component, except for columns where the setter has 2 arguments-->

<select bind:value onchange={() => setter(value, num)} title={tooltip}>
  {@render children?.()}
</select>

<style>
  select {
    border: 1px solid black;
    border-radius: 3px;
    color: black;
    background-color: white;
    padding: 3px;
    vertical-align: middle;
    height: 25px;
  }
  select:hover,
  select:focus {
    background-color: lightgray;
  }
</style>
