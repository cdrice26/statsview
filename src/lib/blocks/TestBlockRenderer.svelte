<script>
  let {
    content = $bindable(''),
    setFocus = () => {},
    forceUpdateOnKey = (e) => {},
    settings
  } = $props();
</script>

<div
  contenteditable
  role="textbox"
  tabindex="0"
  bind:innerHTML={content}
  onfocus={(_) => setFocus()}
  onkeyup={(e) => forceUpdateOnKey(e)}
  style={`
        --text-align: ${settings?.textAlign};
        --color: ${settings?.color};
        --font-family: ${settings?.fontFamily};
        --font-size: ${settings?.fontSize * 1.38}pt;
        --font-weight: ${settings?.bold ? 'bold' : 'normal'};
        --font-style: ${settings?.italic ? 'italic' : 'normal'};
        --text-decoration: ${settings?.underline ? 'underline' : 'normal'}; 
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
