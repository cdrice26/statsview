<script>
  let { value = $bindable(), setter = (value) => {}, children } = $props();
</script>

<!--A simple dropdown menu, styled to match the app-->

<select bind:value onchange={() => setter(value)}>
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
