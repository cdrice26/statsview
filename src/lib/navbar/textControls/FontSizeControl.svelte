<script>
  let { fontSize = $bindable(), setFontSize = (fontSize) => {} } = $props();
</script>

<!--Font size-->
<input
  id="number"
  type="number"
  bind:value={fontSize}
  onchange={() => setFontSize(fontSize)}
  title="Font Size"
/>

<style>
  #number {
    border: 1px solid black;
    border-radius: 3px;
    color: black;
    background-color: white;
    padding: 3px;
    vertical-align: middle;
    box-sizing: border-box;
    height: 25px;
  }

  #number {
    width: 4em;
  }
  #number:hover,
  #number:focus {
    background-color: lightgrey;
  }
</style>
