<script>
    import Button from '../Button.svelte';
    let { csvFiles = $bindable(), getFromCSV = (csvFiles) => {} } = $props();
</script>

<!--Button which opens a CSV file dialoag. Use getFromCSV to handle the file.-->

<input
    id="fileInput"
    type="file"
    accept=".csv"
    style="display:none"
    bind:files={csvFiles}
    onchange={() => getFromCSV(csvFiles[0])}
/>
<Button
    add={null}
    iconSrc="./csv.png"
    iconAlt="Load Data From CSV"
    handleClick={() => document.getElementById('fileInput').click()}
/>
