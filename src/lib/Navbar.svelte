<script>
  import Button from './navbar/Button.svelte';
  import AddButtons from './navbar/AddButtons.svelte';
  import FileIOControl from './navbar/FileIOControl.svelte';
  import TestControls from './navbar/TestControls.svelte';
  import TextControls from './navbar/TextControls.svelte';
  import StatTypeDropdown from './navbar/StatTypeDropdown.svelte';
  import UndoRedo from './navbar/UndoRedo.svelte';
  import TableControls from './navbar/TableControls.svelte';
  import SourceControl from './navbar/SourceControl.svelte';
  import SwapControl from './navbar/SwapControl.svelte';
  import ChartControls from './navbar/ChartControls.svelte';

  // This is a reference to the block the user is currently editing
  export let focus;

  // The following keep track of and update various editor state stuff
  export let undo = () => {};
  export let redo = () => {};

  export let save = () => {};
  export let load = () => {};
  export let exp = () => {};

  export let newText = () => {};
  export let newTable = () => {};
  export let newChart = () => {};
  export let newStat = () => {};
  export let newTest = () => {};

  export let font;
  export let setFont = (font) => {};
  export let fontSize;
  export let setFontSize = (fontSize) => {};
  export let color;
  export let setColor = (color) => {};
  export let align = (align) => {};
  export let bold = () => {};
  export let italic = () => {};
  export let underline = () => {};

  export let testType;
  export let setTestType = (testType) => {};

  export let statType;
  export let setStatType = (statType) => {};

  export let chartType;
  export let setChartType = (chartType) => {};

  export let addColumn = () => {};
  export let delColumn = () => {};
  export let addRow = () => {};
  export let delRow = () => {};
  export let title;
  export let setTitle = (title) => {};
  let csvFiles;
  export let getFromCSV = (file) => {};
  export let hasHeaders;
  export let toggleHeaders = (hasHeaders) => {};
  export let dataType;
  export let setDataType = (dataType) => {};

  export let source;
  export let setSource = (source) => {};

  export let col;
  export let col2;
  export let cols;
  export let xCol;
  export let setCols = (cols) => {};
  export let setCol = (col, sourceNum) => {};
  export let setXCol = (col) => {};

  export let moveUp = () => {};
  export let moveDown = () => {};
  export let delBlock = () => {};

  export let setupTest = () => {};

  // List of all the blocks in the editor
  export let blocks;

  // List of only the table blocks in the editor
  $: tableBlocks = blocks.filter((block) => block.type == 'table');
</script>

<nav>
  <span
    >StatsView |

    <!--Undo/Redo-->
    <UndoRedo {undo} {redo} />

    <!--File IO Control (save, load, export)-->
    <FileIOControl {save} {load} {exp} />

    <!--Buttons to create new blocks-->
    <AddButtons {newText} {newChart} {newStat} {newTable} {newTest} />

    <!--If we're in a text, table, test, or stat block, render the text controls-->
    {#if focus.type == 'text' || focus.type == 'table' || focus.type == 'test' || focus.type == 'stat'}
      <TextControls
        {font}
        {setFont}
        {fontSize}
        {setFontSize}
        {color}
        {setColor}
        {align}
        {bold}
        {italic}
        {underline}
      />
    {/if}

    <!--Test Controls-->
    {#if focus.type == 'test' && focus.sources !== null && focus.sources !== undefined}
      <TestControls
        {testType}
        {setTestType}
        {setupTest}
        currentType={tableBlocks.filter(
          (block) => block.title == focus.sources
        )[0].dataType}
      />
    {/if}

    <!--Type Dropdown for Stats-->
    {#if focus.type == 'stat' && focus.sources !== null && focus.sources !== undefined}
      {#if tableBlocks.filter((block) => block.title == focus.sources)[0].dataType == 'Quantitative'}
        <StatTypeDropdown {statType} {setStatType} />
      {/if}
    {/if}

    <!--Table Controls-->
    {#if focus.type == 'table'}
      <TableControls
        {title}
        {setTitle}
        {addColumn}
        {delColumn}
        {addRow}
        {delRow}
        {csvFiles}
        {getFromCSV}
        {hasHeaders}
        {toggleHeaders}
        {dataType}
        {setDataType}
      />
    {/if}

    <!--Chart Controls-->
    {#if focus.type == 'chart'}
      <ChartControls
        dataType={tableBlocks.filter(
          (blocks) => blocks.title == focus?.sources
        )[0]?.dataType}
        {chartType}
        {setChartType}
        {xCol}
        {setXCol}
        {focus}
        {tableBlocks}
      />
    {/if}

    <!--Source Dropdown-->
    {#if focus.type == 'chart' || focus.type == 'stat' || focus.type == 'test'}
      <SourceControl
        {source}
        {setSource}
        {tableBlocks}
        {focus}
        {col}
        {col2}
        {cols}
        {setCol}
        {setCols}
      />
    {/if}

    <!--Swap Block-->
    {#if focus.type !== null}
      <SwapControl {moveUp} {moveDown} />
    {/if}

    <!--Delete Block-->
    {#if focus.type !== null}
      <Button
        add={null}
        iconSrc="./delete.png"
        iconAlt="Delete This Block"
        handleClick={delBlock}
      /> |
    {/if}
  </span>
</nav>

<style>
  nav {
    vertical-align: middle;
    background-color: white;
    color: black;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif;
    margin: 0px;
    padding: 5px;
    font-size: 15px;
    border-bottom: 1px solid grey;
    position: fixed;
    width: 100%;
    z-index: 2;
  }

  nav > span {
    vertical-align: middle;
  }
</style>
