<script>
  let {
    properties,
    updateBlock = (id, updates) => {},
    setFocus = (properties) => {},
    forceUpdate = () => {}
  } = $props();

  // Create a reactive state for content that can be mutated
  let content = $state(structuredClone($state.snapshot(properties.content)));

  // Watch for changes in the original properties and sync if needed
  $effect(() => {
    content = structuredClone($state.snapshot(properties.content));
  });

  function handleCellUpdate(rid, cid, newValue) {
    // Directly update the reactive state
    content[rid][cid] = newValue;

    // Notify parent of updates
    updateBlock(properties.id, { content });
  }
</script>

<!--Render a table with the correct rows and content-->
{#if properties.visible}
  <table>
    <tbody>
      {#each content as row, rid}
        <tr>
          {#each row as cell, cid}
            <td
              contenteditable
              bind:textContent={content[rid][cid]}
              oninput={(e) => {
                handleCellUpdate(rid, cid, e.currentTarget.textContent);
              }}
              onfocus={() =>
                setFocus({
                  ...properties,
                  row: rid,
                  col: cid
                })}
              onkeyup={() => forceUpdate()}
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
