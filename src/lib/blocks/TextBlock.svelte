<script>
  import TextBlockRenderer from './TestBlockRenderer.svelte';

  let {
    properties = $bindable({}),
    setFocus = (properties) => {},
    forceUpdate = () => {}
  } = $props();

  let forceUpdateOnKey = (e) => {
    if (e.key == 'Enter' || e.key == ' ') forceUpdate();
  };
</script>

<TextBlockRenderer
  bind:content={properties.content}
  settings={properties.settings}
  setFocus={() => setFocus(properties)}
  {forceUpdateOnKey}
/>
