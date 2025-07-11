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
  import IntervalControls from './navbar/IntervalControls.svelte';

  let csvFiles;

  let {
    focus,
    undo = () => {},
    redo = () => {},
    save = () => {},
    load = () => {},
    exp = async () => {},
    expPdf = async () => {},
    newText = () => {},
    newTable = () => {},
    newChart = () => {},
    newStat = () => {},
    newTest = () => {},
    newInterval = () => {},
    font,
    setFont = (font) => {},
    fontSize,
    setFontSize = (fontSize) => {},
    color,
    setColor = (color) => {},
    align = (align) => {},
    bold = () => {},
    italic = () => {},
    underline = () => {},
    testType,
    setTestType = (testType) => {},
    intervalType,
    setIntervalType = (intervalType) => {},
    confidenceLevel,
    setConfidenceLevel = (confidenceLevel) => {},
    statType,
    setStatType = (statType) => {},
    chartType,
    setChartType = (chartType) => {},
    addColumn = () => {},
    delColumn = () => {},
    addRow = () => {},
    delRow = () => {},
    title,
    setTitle = (title) => {},
    setChartTitle = (title) => {},
    getFromCSV = (file) => {},
    hasHeaders,
    toggleHeaders = (hasHeaders) => {},
    visible,
    toggleVisible = (visible) => {},
    dataType,
    cleanTable = () => {},
    setDataType = (dataType) => {},
    source,
    setSource = (source) => {},
    col,
    col2,
    cols,
    xCol,
    setCols = (cols) => {},
    setCol = (col, sourceNum) => {},
    setXCol = (col) => {},
    moveUp = () => {},
    moveDown = () => {},
    delBlock = () => {},
    setupTest = () => {},
    tableBlocks,
    sourceTable,
    onLicenseClick = () => {}
  } = $props();
</script>

<nav>
  <span
    ><div>
      StatsView |

      <!--Undo/Redo-->
      <UndoRedo {undo} {redo} />

      <!--File IO Control (save, load, export)-->
      <FileIOControl {save} {load} {exp} {expPdf} />

      <!--Buttons to create new blocks-->
      <AddButtons
        {newText}
        {newChart}
        {newStat}
        {newTable}
        {newTest}
        {newInterval}
      />
    </div>
    <div>
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
        <TestControls {testType} {setTestType} {setupTest} />
      {/if}

      <!--Interval Controls-->
      {#if focus.type == 'interval' && focus.sources !== null && focus.sources !== undefined}
        <IntervalControls
          {intervalType}
          {setIntervalType}
          {confidenceLevel}
          {setConfidenceLevel}
        />
      {/if}

      <!--Type Dropdown for Stats-->
      {#if focus.type == 'stat' && focus.sources !== null && focus.sources !== undefined}
        <StatTypeDropdown {statType} {setStatType} />
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
          {visible}
          {toggleVisible}
          {dataType}
          {setDataType}
          {cleanTable}
        />
      {/if}

      <!--Chart Controls-->
      {#if focus.type == 'chart'}
        <ChartControls
          {chartType}
          {setChartType}
          {setChartTitle}
          {xCol}
          {setXCol}
          {sourceTable}
          {title}
        />
      {/if}

      <!--Source Dropdown-->
      {#if focus.type == 'chart' || focus.type == 'stat' || focus.type == 'test' || focus.type == 'interval'}
        <SourceControl
          {source}
          {setSource}
          {tableBlocks}
          {sourceTable}
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

      <Button
        add={null}
        iconSrc="./github.png"
        iconAlt="Visit on GitHub"
        tooltip="Visit on GitHub"
        handleClick={() => {
          window.open('https://github.com/cdrice26/statsview', '_blank');
        }}
      />

      <Button
        add={null}
        iconSrc="./license.png"
        iconAlt="View Licenses"
        tooltip="View Licenses"
        handleClick={onLicenseClick}
      />
    </div>
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
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    width: 100%;
    z-index: 2;
  }

  div {
    display: inline-block;
    text-align: center;
  }

  nav > span {
    vertical-align: middle;
  }
</style>
