<script>
  let {
    properties,
    updateBlock = (id, updates) => {},
    setFocus = (properties) => {},
    forceUpdate = () => {}
  } = $props();

  let forceUpdateOnKey = (e) => {
    if (e.key == 'Enter' || e.key == ' ') forceUpdate();
  };

  let content = $state(properties.content);

  $effect(() => {
    content = properties.content;
  });
</script>

<div
  contenteditable
  role="textbox"
  tabindex="0"
  bind:innerHTML={content}
  oninput={() => updateBlock(properties.id, { content: content })}
  onfocus={(_) => setFocus(properties)}
  onkeyup={(e) => forceUpdateOnKey(e)}
  style={`
        --text-align: ${properties?.settings?.textAlign};
        --color: ${properties?.settings?.color};
        --font-family: ${properties?.settings?.fontFamily};
        --font-size: ${properties?.settings?.fontSize * 1.38}pt;
        --font-weight: ${properties?.settings?.bold ? 'bold' : 'normal'};
        --font-style: ${properties?.settings?.italic ? 'italic' : 'normal'};
        --text-decoration: ${properties?.settings?.underline ? 'underline' : 'normal'}; 
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
