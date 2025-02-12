<script>
  import Button from '../Button.svelte';
  let {
    addColumn = () => {},
    delColumn = () => {},
    addRow = () => {},
    delRow = () => {}
  } = $props();
</script>

<!--Buttons to edit table dimensions-->
<Button
  add={true}
  iconSrc="./column.png"
  iconAlt="Add Column"
  handleClick={addColumn}
  tooltip="Add Column"
/>
<Button
  add={false}
  iconSrc="./column.png"
  iconAlt="Delete Column"
  handleClick={delColumn}
  tooltip="Delete Column"
/>
<Button
  add={true}
  iconSrc="./row.png"
  iconAlt="Add Row"
  handleClick={addRow}
  tooltip="Add Row"
/>
<Button
  add={false}
  iconSrc="./row.png"
  iconAlt="Delete Row"
  handleClick={delRow}
  tooltip="Delete Row"
/>
