<script>
  import ColorPicker from 'svelte-awesome-color-picker';

  export let color;
  export let setColor = (color) => {};
</script>

<!--Text color-->
<ColorPicker bind:hex={color} on:input={() => setColor(color)} label="" />
