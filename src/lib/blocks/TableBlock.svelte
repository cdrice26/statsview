<script>
  let {
    properties,
    updateBlock = (id, updates) => {},
    setFocus = (properties) => {},
    forceUpdate = () => {}
  } = $props();

  // Ensure direct reference to maintain two-way binding
  $inspect(properties.content);

  function handleCellUpdate(rid, cid, newValue) {
    // Directly mutate the original content to maintain two-way binding
    properties.content[rid][cid] = newValue;

    // Trigger update block to notify parent components
    updateBlock(properties.id, { content: properties.content });
  }
</script>

<!--Render a table with the correct rows and content-->
{#if properties.visible}
  <table>
    <tbody>
      {#each properties.content as row, rid}
        <tr>
          {#each row as _cell, cid}
            <td
              contenteditable
              bind:textContent={properties.content[rid][cid]}
              oninput={(e) => {
                handleCellUpdate(rid, cid, e.currentTarget.textContent);
              }}
              onfocus={() =>
                setFocus({
                  ...properties,
                  row: rid,
                  col: cid
                })}
              onkeyup={(_) => forceUpdate}
              style={`
                --text-align: ${properties.settings.textAlign};
                --color: ${properties.settings.color};
                --font-family: ${properties.settings.fontFamily};
                --font-size: ${properties.settings.fontSize * 1.38}pt;
                --font-weight: ${properties.settings.bold ? 'bold' : 'normal'};
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
  <button class="invisible" onclick={() => setFocus(properties)}>
    Invisible Table
  </button>
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
    text-decoration: var(--text-decoration, none);
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
