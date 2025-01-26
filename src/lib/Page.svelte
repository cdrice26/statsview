<script>
  import Block from './Block.svelte';

  let {
    blocks,
    updateBlock = (id, updates) => {},
    setFocus = (properties) => {},
    forceUpdate = () => {}
  } = $props();
  let tableBlocks = $derived(blocks.filter((block) => block.type == 'table'));
</script>

<!--Render a page. The y position is set by the prop yPos
    via the --y-position CSS variable. For all types of blocks,
    the prop entitled 'props' is a reference to the data regarding
    the block itself.-->
<div>
  {#each blocks as block, i (block.id)}
    <Block
      properties={blocks[i]}
      {updateBlock}
      {tableBlocks}
      {setFocus}
      {forceUpdate}
    />
  {/each}
</div>

<style>
  div {
    position: absolute;
    min-height: 1100px;
    width: 850px;
    background-color: white;
    border: none;
    filter: drop-shadow(3px 3px 3px grey);
    border-radius: 3px;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    padding: 100px;
  }
</style>
