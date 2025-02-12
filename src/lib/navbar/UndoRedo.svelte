<script>
  import Button from './Button.svelte';
  let { undo = () => {}, redo = () => {} } = $props();
</script>

<!--Undo/Redo Buttons-->
<Button
  add={null}
  iconSrc="./undo.png"
  iconAlt="Undo"
  handleClick={undo}
  tooltip="Undo"
/>
<Button
  add={null}
  iconSrc="./redo.png"
  iconAlt="Redo"
  handleClick={redo}
  tooltip="Redo"
/> |
