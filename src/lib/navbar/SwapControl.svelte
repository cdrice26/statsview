<script>
    import Button from './Button.svelte';

    export let moveUp = () => {};
    export let moveDown = () => {};
</script>

<!--Buttons to swap blocks around-->
<Button
    add={null}
    iconSrc="./up.png"
    iconAlt="Move Block Up"
    handleClick={moveUp}
/>
<Button
    add={null}
    iconSrc="./down.png"
    iconAlt="Move Block Down"
    handleClick={moveDown}
/>
