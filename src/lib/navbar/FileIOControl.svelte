<script>
  import Button from './Button.svelte';

  export let load = () => {};
  export let save = () => {};
  export let exp = async () => {};
  export let expPdf = async () => {};
</script>

<!--File I/O Control Butons-->
<Button add={null} iconSrc="./download.png" iconAlt="Save" handleClick={save} />
<Button add={null} iconSrc="./upload.png" iconAlt="Load" handleClick={load} />
<Button add={null} iconSrc="./share.png" iconAlt="Export" handleClick={exp} />
<Button
  add={null}
  iconSrc="./pdf.png"
  iconAlt="Export as PDF"
  handleClick={expPdf}
/>
|
