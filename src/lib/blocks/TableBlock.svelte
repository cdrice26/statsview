<script>
  export let props;
  export let setFocus = (props) => {};
  export let forceUpdate = () => {};
</script>

<!--Render a table with the correct rows and content-->
<table>
  {#each props.content as row, rid}
    <tr>
      {#each row as cell, cid}
        <td
          contenteditable
          bind:textContent={cell}
          on:focus={() => setFocus({ ...props, row: rid, col: cid })}
          on:keyup={forceUpdate}
          style={`
                        --text-align: ${props.settings.textAlign};
                        --color: ${props.settings.color};
                        --font-family: ${props.settings.fontFamily};
                        --font-size: ${props.settings.fontSize * 1.38}pt;
                        --font-weight: ${
                          props.settings.bold ? 'bold' : 'normal'
                        };
                        --font-style: ${
                          props.settings.italic ? 'italic' : 'normal'
                        };
                        --text-decoration: ${
                          props.settings.underline ? 'underline' : 'normal'
                        }; 
                    `}
        >
        </td>
      {/each}
    </tr>
  {/each}
</table>

<style>
  table,
  td {
    border-collapse: collapse;
    border: 1px solid black;
  }

  td {
    padding: 3px;
    outline: none;
    text-align: var(--text-align, left);
    color: var(--color, black);
    font-family: var(--font-family, Times New Roman);
    font-size: var(--font-size, 12px);
    font-weight: var(--font-weight, normal);
    font-style: var(--font-style, normal);
    text-decoration: (--text-decoration, none);
  }

  td:focus {
    outline: 1px solid lightgrey;
  }
</style>
