<script>
  import Button from './Button.svelte';

  export let load = () => {};
  export let save = () => {};
  export let exp = () => {};
</script>

<!--File I/O Control Butons-->
<Button add={null} iconSrc="./download.png" iconAlt="Save" handleClick={save} />
<Button add={null} iconSrc="./upload.png" iconAlt="Load" handleClick={load} />
<Button add={null} iconSrc="./share.png" iconAlt="Export" handleClick={exp} />
|
