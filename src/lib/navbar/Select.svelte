<script>
    export let value;
    export let setter = (value) => {};
</script>

<!--A simple dropdown menu, styled to match the app-->

<select bind:value on:change={() => setter(value)}>
    <slot />
</select>

<style>
    select {
        border: 1px solid black;
        border-radius: 3px;
        color: black;
        background-color: white;
        padding: 3px;
    }
    select:hover,
    select:focus {
        background-color: lightgray;
    }
</style>
