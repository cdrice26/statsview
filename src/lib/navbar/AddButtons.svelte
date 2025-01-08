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
/>
<!--Add table block-->
<Button
  add={true}
  iconSrc="./table.png"
  iconAlt="Add Table"
  handleClick={newTable}
/>
<!--Add chart block-->
<Button
  add={true}
  iconSrc="./chart.png"
  iconAlt="Add Chart"
  handleClick={newChart}
/>
<!--Add stat block-->
<Button
  add={true}
  iconSrc="./stat.png"
  iconAlt="Add Chart"
  handleClick={newStat}
/>
<!--Add test block-->
<Button
  add={true}
  iconSrc="./test.png"
  iconAlt="Add Text"
  handleClick={newTest}
/>
<!--Add interval block-->
<Button
  add={true}
  iconSrc="./interval.png"
  iconAlt="Add Interval"
  handleClick={newInterval}
/> |
