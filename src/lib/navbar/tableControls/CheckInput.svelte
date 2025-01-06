<script>
  let { bool = $bindable(), toggle = (bool) => {}, title } = $props();
</script>

<!--A basic component for a labeled checkbox-->
<label for={title.replace(' ', '-') + '-checkbox'}>{title}</label>
<input
  type="checkbox"
  id={title.replace(' ', '-') + '-checkbox'}
  bind:checked={bool}
  onchange={() => toggle(bool)}
/>

<style>
  label,
  input {
    vertical-align: middle;
  }
</style>
