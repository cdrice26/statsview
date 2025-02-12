<script>
  import Button from '../Button.svelte';
  let { align = (align) => {} } = $props();
</script>

<!--Text align-->
<Button
  add={null}
  iconSrc="./leftalign.png"
  iconAlt="Left Align"
  handleClick={() => align('left')}
  tooltip="Left Align"
/>
<Button
  add={null}
  iconSrc="./centeralign.png"
  iconAlt="Center Align"
  handleClick={() => align('center')}
  tooltip="Center Align"
/>
<Button
  add={null}
  iconSrc="./rightalign.png"
  iconAlt="Right Align"
  handleClick={() => align('right')}
  tooltip="Right Align"
/>
