<script>
  export let props;
  export let setFocus = (props) => {};
  export let forceUpdate = () => {};
  let forceUpdateOnKey = (e) => {
    if (e.key == 'Enter' || e.key == ' ') forceUpdate();
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  contenteditable
  bind:innerHTML={props.content}
  on:focus={() => setFocus(props)}
  on:keyup={(e) => forceUpdateOnKey(e)}
  style={`
        --text-align: ${props.settings.textAlign};
        --color: ${props.settings.color};
        --font-family: ${props.settings.fontFamily};
        --font-size: ${props.settings.fontSize * 1.38}pt;
        --font-weight: ${props.settings.bold ? 'bold' : 'normal'};
        --font-style: ${props.settings.italic ? 'italic' : 'normal'};
        --text-decoration: ${
          props.settings.underline ? 'underline' : 'normal'
        }; 
    `}
/>

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
