<script>
    export let bool;
    export let toggle = (bool) => {};
    export let title;
</script>

<!--A basic component for a labeled checkbox-->
<label for={title.replace(' ', '-') + '-checkbox'}>{title}</label>
<input
    type="checkbox"
    id={title.replace(' ', '-') + '-checkbox'}
    bind:value={bool}
    bind:checked={bool}
    on:change={() => toggle(bool)}
/>
