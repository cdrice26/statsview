<script>
    export let color;
    export let setColor = (color) => {};
</script>

<!--Text color-->
<input type="color" bind:value={color} on:change={() => setColor(color)} />
