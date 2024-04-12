<script>
    import Button from '../Button.svelte';
    export let addColumn = () => {};
    export let delColumn = () => {};
    export let addRow = () => {};
    export let delRow = () => {};
</script>

<!--Buttons to edit table dimensions-->
<Button
    add={true}
    iconSrc="./column.png"
    iconAlt="Add Column"
    handleClick={addColumn}
/>
<Button
    add={false}
    iconSrc="./column.png"
    iconAlt="Delete Column"
    handleClick={delColumn}
/>
<Button add={true} iconSrc="./row.png" iconAlt="Add Row" handleClick={addRow} />
<Button
    add={false}
    iconSrc="./row.png"
    iconAlt="Delete Row"
    handleClick={delRow}
/>
