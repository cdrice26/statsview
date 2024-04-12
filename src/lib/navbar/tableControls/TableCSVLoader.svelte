<script>
    import Button from '../Button.svelte';
    export let csvFiles;
    export let getFromCSV = (csvFiles) => {};
</script>

<!--Button which opens a CSV file dialoag. Use getFromCSV to handle the file.-->

<input
    id="fileInput"
    type="file"
    accept=".csv"
    style="display:none"
    bind:files={csvFiles}
    on:change={() => getFromCSV(csvFiles[0])}
/>
<Button
    add={null}
    iconSrc="./csv.png"
    iconAlt="Load Data From CSV"
    handleClick={() => document.getElementById('fileInput').click()}
/>
