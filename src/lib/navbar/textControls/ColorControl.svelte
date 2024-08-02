<script>
  export let color;
  export let setColor = (color) => {};
</script>

<!--Text color-->
<input type="color" bind:value={color} on:change={() => setColor(color)} />

<style>
  input {
    vertical-align: middle;
    box-sizing: border-box;
    height: 25px;
  }
</style>
