<script>
  import Button from './Button.svelte';

  let {
    load = () => {},
    save = () => {},
    exp = async () => {},
    expPdf = async () => {}
  } = $props();
</script>

<!--File I/O Control Butons-->
<Button
  add={null}
  iconSrc="./download.png"
  iconAlt="Save"
  handleClick={save}
  tooltip="Save"
/>
<Button
  add={null}
  iconSrc="./upload.png"
  iconAlt="Load"
  handleClick={load}
  tooltip="Load"
/>
<Button
  add={null}
  iconSrc="./share.png"
  iconAlt="Export to Word"
  handleClick={exp}
  tooltip="Export to Word"
/>
<!-- <Button
  add={null}
  iconSrc="./pdf.png"
  iconAlt="Export as PDF"
  handleClick={expPdf}
/> -->
|
