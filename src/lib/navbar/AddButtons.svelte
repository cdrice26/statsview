<script>
  import Button from './Button.svelte';
  let {
    newText = () => {},
    newTable = () => {},
    newChart = () => {},
    newStat = () => {},
    newTest = () => {},
    newInterval = () => {}
  } = $props();
</script>

<!--Buttons to add elements-->
<!--Add text block-->
<Button
  add={true}
  iconSrc="./text.png"
  iconAlt="Add Text"
  handleClick={newText}
  tooltip="Add Text Block"
/>
<!--Add table block-->
<Button
  add={true}
  iconSrc="./table.png"
  iconAlt="Add Table"
  handleClick={newTable}
  tooltip="Add Table Block"
/>
<!--Add chart block-->
<Button
  add={true}
  iconSrc="./chart.png"
  iconAlt="Add Chart"
  handleClick={newChart}
  tooltip="Add Chart Block"
/>
<!--Add stat block-->
<Button
  add={true}
  iconSrc="./stat.png"
  iconAlt="Add Chart"
  handleClick={newStat}
  tooltip="Add Stat Block"
/>
<!--Add test block-->
<Button
  add={true}
  iconSrc="./test.png"
  iconAlt="Add Text"
  handleClick={newTest}
  tooltip="Add Test Block"
/>
<!--Add interval block-->
<Button
  add={true}
  iconSrc="./interval.png"
  iconAlt="Add Interval"
  handleClick={newInterval}
  tooltip="Add Interval Block"
/> |
