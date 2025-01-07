<script>
  let {
    properties = $bindable({}),
    setFocus = (properties) => {},
    forceUpdate = () => {}
  } = $props();

  let forceUpdateOnKey = (e) => {
    if (e.key == 'Enter' || e.key == ' ') forceUpdate();
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  contenteditable
  bind:innerHTML={properties.content}
  onfocus={() => setFocus(properties)}
  onkeyup={(e) => forceUpdateOnKey(e)}
  style={`
        --text-align: ${properties.settings?.textAlign};
        --color: ${properties.settings?.color};
        --font-family: ${properties.settings?.fontFamily};
        --font-size: ${properties.settings?.fontSize * 1.38}pt;
        --font-weight: ${properties.settings?.bold ? 'bold' : 'normal'};
        --font-style: ${properties.settings?.italic ? 'italic' : 'normal'};
        --text-decoration: ${
          properties.settings?.underline ? 'underline' : 'normal'
        }; 
    `}
></div>

<style>
  div {
    width: 100%;
    resize: none;
    border: none;
    padding: 3px;
    border-radius: 3px;
    margin: 3px;
    outline: none;
    text-align: var(--text-align, left);
    color: var(--color, black);
    font-family: var(--font-family, Times New Roman);
    font-size: var(--font-size, 12px);
    font-weight: var(--font-weight, normal);
    font-style: var(--font-style, normal);
    text-decoration: var(--text-decoration, none);
  }

  div:hover,
  div:focus {
    border: 1px solid lightgrey;
  }
</style>
