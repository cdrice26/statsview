<!-- @migration-task Error while migrating Svelte code: migrating this component would require adding a `$properties` rune but there's already a variable named properties.
     Rename the variable and try again or migrate by hand. -->
<script>
  export let properties;
  export let setFocus = (properties) => {};
  export let forceUpdate = () => {};
</script>

<!--Render a table with the correct rows and content-->
{#if properties.visible}
  <table>
    <tbody>
      {#each properties.content as row, rid}
        <tr>
          {#each row as cell, cid}
            <td
              contenteditable
              bind:textContent={cell}
              on:focus={() => setFocus({ ...properties, row: rid, col: cid })}
              on:keyup={forceUpdate}
              style={`
                        --text-align: ${properties.settings.textAlign};
                        --color: ${properties.settings.color};
                        --font-family: ${properties.settings.fontFamily};
                        --font-size: ${properties.settings.fontSize * 1.38}pt;
                        --font-weight: ${
                          properties.settings.bold ? 'bold' : 'normal'
                        };
                        --font-style: ${
                          properties.settings.italic ? 'italic' : 'normal'
                        };
                        --text-decoration: ${
                          properties.settings.underline ? 'underline' : 'normal'
                        }; 
                    `}
            >
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <button class="invisible" on:click={() => setFocus(properties)}
    >Invisible Table</button
  >
{/if}

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

  .invisible {
    background-color: lightgrey;
    border-radius: 10px;
    text-align: center;
    border: none;
    width: 100%;
  }
</style>
