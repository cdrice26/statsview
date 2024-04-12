<script>
    import Button from './Button.svelte';
    export let undo = () => {};
    export let redo = () => {};
</script>

<!--Undo/Redo Buttons-->
<Button add={null} iconSrc="./undo.png" iconAlt="Undo" handleClick={undo} />
<Button add={null} iconSrc="./redo.png" iconAlt="Redo" handleClick={redo} /> |
