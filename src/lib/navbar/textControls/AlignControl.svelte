<script>
    import Button from '../Button.svelte';
    export let align = (align) => {};
</script>

<!--Text align-->
<Button
    add={null}
    iconSrc="./leftalign.png"
    iconAlt="Left Align"
    handleClick={() => align('left')}
/>
<Button
    add={null}
    iconSrc="./centeralign.png"
    iconAlt="Center Align"
    handleClick={() => align('center')}
/>
<Button
    add={null}
    iconSrc="./rightalign.png"
    iconAlt="Right Align"
    handleClick={() => align('right')}
/>
