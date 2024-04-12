<script>
    export let value;
    export let num;
    export let setter = (value, num) => {};
</script>

<!--Same as the select component, except for columns where the setter has 2 arguments-->

<select bind:value on:change={() => setter(value, num)}>
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
