<script>
  import ColorPicker from 'svelte-awesome-color-picker';

  let { color = $bindable(), setColor = (color) => {} } = $props();
</script>

<!--Text color-->
<ColorPicker bind:hex={color} on:input={() => setColor(color)} label="" />
