<script>
  import Navbar from './Navbar.svelte';
  import Page from './Page.svelte';
  import TestSetup from './TestSetup.svelte';
  import Window from './Window.svelte';

  /**
   * The list of all blocks
   */
  let blocks = [];

  /**
   * Reference to the currently focused block
   */
  let focus = {
    id: null,
    type: null,
    settings: {
      font: null,
      fontSize: null,
      color: null
    },
    sources: null,
    col: null,
    title: null,
    testType: null,
    testData: {
      testAgainst: null,
      expCounts: null,
      h0: null,
      ha: null,
      rand: null,
      tails: null,
      alpha: null
    }
  };

  /**
   * Set the focus
   * @param props - the new focus
   */
  const setFocus = (props) => (focus = props);

  /**
   * Reference to the current window
   */
  let currentWin = null;

  /**
   * Stack of history for use with undo
   */
  let undoStack = [];

  /**
   * Stack of history for use with redo
   */
  let redoStack = [];

  /** Function to add an instance of blocks to the undoStack. To save memory, the undoStack
   * is limited to a length of 50.
   *
   * @param instance - the instance to add
   */
  const addToUndoStack = (instance) => {
    // If we undo something, then the redo actions make no sense. Get rid of them here.
    redoStack = [];

    undoStack = [structuredClone(instance), ...undoStack];
    if (undoStack.length > 50) {
      undoStack.pop();
    }
  };

  /**
   * Function to add an instance of blocks to the redoStack. To save memory, the redoStack
   * is limited to a length of 50.
   *
   * @param instance - the instance to add
   */
  const addToRedoStack = (instance) => {
    redoStack = [structuredClone(instance), ...redoStack];
    if (redoStack.length > 50) {
      redoStack.pop();
    }
  };

  /**
   * Force an update to the blocks and add to the undo stack
   */
  const forceUpdate = () => {
    addToUndoStack(blocks);
    blocks = blocks;
  };

  /**
   * Undo last change to blocks
   */
  const undo = () => {
    if (undoStack.length > 0) {
      addToRedoStack(blocks);
      blocks = structuredClone(undoStack[0]);
      undoStack.splice(0, 1);
    }
  };

  /**
   * Redo last change
   */
  const redo = () => {
    if (redoStack.length > 0) {
      // First add the current setup to undoStack
      undoStack = [structuredClone(blocks), ...undoStack];
      if (undoStack.length > 50) {
        undoStack.pop();
      }

      // Then activate the redo
      blocks = structuredClone(redoStack[0]);
      redoStack.splice(0, 1);
    }
  };

  /**
   * Save to .stv file
   */
  const save = () => {
    if (blocks) {
      const data = JSON.stringify(blocks);
      const blob = new Blob([data], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'report.stv';
      a.click();
    }
  };

  /**
   * Load from .stv file
   */
  const load = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      //@ts-ignore
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        // @ts-ignore
        blocks = JSON.parse(text);
      };
      reader.readAsText(file);
    };
    input.click();
  };

  /**
   * Export to .docx
   */
  const exp = () => {};

  /**
   * Create a new text block
   */
  const newText = () => {
    addToUndoStack(blocks);
    blocks = [
      ...blocks,
      {
        id: blocks.length,
        type: 'text',
        sources: null,
        col: null,
        content: 'Type here...',
        settings: {
          fontFamily: 'Times New Roman',
          fontSize: 12,
          color: 'black',
          textAlign: 'left',
          bold: false,
          italic: false,
          underline: false
        }
      }
    ];
  };

  /**
   * Create a new table block
   */
  const newTable = () => {
    addToUndoStack(blocks);
    blocks = [
      ...blocks,
      {
        id: blocks.length,
        title: 'Table' + blocks.length,
        type: 'table',
        sources: null,
        col: null,
        content: [
          ['Column 1', 'Column 2'],
          ['0', '0'],
          ['0', '0']
        ],
        hasHeaders: true,
        dataType: 'Categorical',
        settings: {
          fontFamily: 'Times New Roman',
          fontSize: 12,
          color: 'black',
          textAlign: 'left',
          bold: false,
          italic: false,
          underline: false
        }
      }
    ];
  };

  /**
   * Create a new chart block
   */
  const newChart = () => {
    addToUndoStack(blocks);
    blocks = [
      ...blocks,
      {
        id: blocks.length,
        type: 'chart',
        chartType: null,
        sources: null,
        col: null,
        cols: null,
        content: null,
        title: 'New Chart',
        xCol: null,
        settings: {
          types: []
        }
      }
    ];
  };

  /**
   * Create a new stat block
   */
  const newStat = () => {
    addToUndoStack(blocks);
    blocks = [
      ...blocks,
      {
        id: blocks.length,
        type: 'stat',
        statType: null,
        sources: null,
        col: null,
        content: 'Source configuration required.',
        settings: {
          fontFamily: 'Times New Roman',
          fontSize: 12,
          color: 'black',
          textAlign: 'left',
          bold: false,
          italic: false,
          underline: false
        }
      }
    ];
  };

  /**
   * Create a new test block
   */
  const newTest = () => {
    addToUndoStack(blocks);
    blocks = [
      ...blocks,
      {
        id: blocks.length,
        type: 'test',
        sources: null,
        col: null,
        content: 'Source configuration required.',
        settings: {
          fontFamily: 'Times New Roman',
          fontSize: 12,
          color: 'black',
          textAlign: 'left',
          bold: false,
          italic: false,
          underline: false
        },
        testType: null,
        testData: {
          testAgainst: null,
          expCounts: null,
          h0: 'Null Hypothesis',
          ha: 'Alt Hypothesis',
          rand: false,
          tails: 'two-sided',
          alpha: 0.05
        }
      }
    ];
  };

  /**
   * Change font
   *
   * @param font - the new font
   */
  const setFont = (font) => {
    addToUndoStack(blocks);
    focus.settings.fontFamily = font;
    blocks = blocks;
  };

  /**
   * Change font size
   *
   * @param fontSize - the new font size
   */
  const setFontSize = (fontSize) => {
    addToUndoStack(blocks);
    focus.settings.fontSize = fontSize;
    blocks = blocks;
  };

  /**
   * Change font color
   *
   * @param color - the new font color
   */
  const setColor = (color) => {
    addToUndoStack(blocks);
    focus.settings.color = color;
    blocks = blocks;
  };

  /**
   * Change text alignment
   *
   * @param align - the new text alignment
   */
  const align = (align) => {
    addToUndoStack(blocks);
    focus.settings.textAlign = align;
    blocks = blocks;
  };

  /**
   * Make text bold/not bold (toggle)
   */
  const bold = () => {
    addToUndoStack(blocks);
    focus.settings.bold = !focus.settings.bold;
    blocks = blocks;
  };

  /**
   * Make text italic/not italic (toggle)
   */
  const italic = () => {
    addToUndoStack(blocks);
    focus.settings.italic = !focus.settings.italic;
    blocks = blocks;
  };

  /**
   * Make text underline/not underline (toggle)
   */
  const underline = () => {
    addToUndoStack(blocks);
    focus.settings.underline = !focus.settings.underline;
    blocks = blocks;
  };

  /**
   * Set type of a test
   *
   * @param testType - the new test type
   */
  const setTestType = (testType) => {
    addToUndoStack(blocks);
    focus.testType = testType;
    blocks = blocks;
  };

  /**
   * Set type of a chart
   *
   * @param chartType - the new chart type
   */
  const setChartType = (chartType) => {
    addToUndoStack(blocks);
    focus.chartType = chartType;
    blocks = blocks;
  };

  /**
   * Set title of a chart
   *
   * @param title - the new chart title
   */
  const setChartTitle = (title) => {
    addToUndoStack(blocks);
    focus.title = title;
    blocks = blocks;
  };

  /**
   * Set type of a stat
   *
   * @param statType - the new stat type
   */
  const setStatType = (statType) => {
    addToUndoStack(blocks);
    focus.statType = statType;
    blocks = blocks;
  };

  /**
   * Add column to table
   *
   * @param title - the new column title
   */
  const addColumn = () => {
    addToUndoStack(blocks);
    for (let i = 0; i < focus.content.length; i++) {
      focus.content[i].push(0);
    }
    blocks = blocks;
  };

  /**
   * Delete last column from table
   */
  const delColumn = () => {
    addToUndoStack(blocks);
    if (focus.content[0].length > 1) {
      for (let i = 0; i < focus.content.length; i++) {
        focus.content[i].pop();
      }
      blocks = blocks;
    }
  };

  /**
   * Add row to table
   */
  const addRow = () => {
    addToUndoStack(blocks);
    let newRow = [];
    for (let i = 0; i < focus.content[0].length; i++) {
      newRow.push(0);
    }
    focus.content.push(newRow);
    blocks = blocks;
  };

  /**
   * Delete last row from table
   */
  const delRow = () => {
    addToUndoStack(blocks);
    if (focus.content.length > 1) {
      focus.content.pop();
      blocks = blocks;
    }
  };

  /**
   * Change title of table
   *
   * @param title - the new table title
   */
  const setTitle = (title) => {
    addToUndoStack(blocks);
    const oldTitle =
      focus.title != undefined ? focus.title : 'Table' + focus.id;
    focus.title = title;

    // Change anything that sources from this table to source from its updated title
    blocks.forEach((block) => {
      if (block.sources == oldTitle) block.sources = title;
    });
    blocks = blocks;
  };

  /**
   * Get data from csv file
   *
   * @param file - the csv file
   */
  const getFromCSV = async (file) => {
    if (file) {
      const dataString = await file.text();
      const data = parseCSV(dataString);
      focus.content = data;
      blocks = blocks;
    }
  };

  /**
   * Parse csv string
   *
   * @param str - the csv string
   */
  const parseCSV = (str) => {
    // Split the string up into lines
    const lines = str.split('\n');

    // Split the lines up by commas
    const data = lines.map((line) =>
      line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)
    );

    // Get rid of potential null value at the end of the array
    if (data[data.length - 1] == null) {
      data.pop();
    }

    // Remove any quotes placed within strings to escape commas
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        data[i][j] = data[i][j].replace(/\"/g, '');
      }
    }

    return data;
  };

  /**
   * Toggle whether the table has headers
   *
   * @param hasHeaders - whether the table should have headers
   */
  const toggleHeaders = (hasHeaders) => {
    focus.hasHeaders = hasHeaders;
    blocks = blocks;
  };

  /**
   * Set data type for statistical thing
   *
   * @param dataType - the new data type
   */
  const setDataType = (dataType) => {
    focus.dataType = dataType;
    blocks = blocks;
  };

  /**
   * Set source table for statistical thing
   *
   * @param source - the new source table
   */
  const setSource = (source) => {
    addToUndoStack(blocks);
    focus.sources = source;
    blocks = blocks;
  };

  /**
   * Set source column for statistical thing
   *
   * @param col - the new column
   * @param sourceNum - the column to change (1 or 2, if there's a second column)
   */
  const setCol = (col, sourceNum) => {
    addToUndoStack(blocks);
    if (sourceNum == 1) focus.col = col;
    else if (sourceNum == 2) focus.col2 = col;
    blocks = blocks;
  };

  /**
   * Set x column for chart
   *
   * @param col - the new x column
   */
  const setXCol = (col) => {
    addToUndoStack(blocks);
    focus.xCol = col;
    blocks = blocks;
  };

  /**
   * Set columns for chart
   *
   * @param cols - the new columns
   */
  const setCols = (cols) => {
    addToUndoStack(blocks);
    focus.cols = cols;
    blocks = blocks;
  };

  /**
   * Move a block up one position
   */
  const moveUp = () => {
    addToUndoStack(blocks);
    const id = focus.id;
    if (id > 0) {
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].id == id) {
          const temp = blocks[i];
          blocks[i] = blocks[i - 1];
          blocks[i - 1] = temp;
          blocks[i - 1].id--;
          blocks[i].id++;
          break;
        }
      }
    }
  };

  /**
   * Move a block down one position
   */
  const moveDown = () => {
    addToUndoStack(blocks);
    const id = focus.id;
    if (id < blocks.length - 1) {
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].id == id) {
          const temp = blocks[i];
          blocks[i] = blocks[i + 1];
          blocks[i + 1] = temp;
          blocks[i + 1].id++;
          blocks[i].id--;
          break;
        }
      }
    }
  };

  /**
   * Delete a block
   */
  const delBlock = () => {
    addToUndoStack(blocks);
    const id = focus.id;
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].id == id) {
        blocks.splice(i, 1);
        for (let j = i; j < blocks.length; j++) {
          blocks[j].id--;
        }
        break;
      }
    }
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i]?.sources == focus?.title) blocks[i].sources = null;
    }
    blocks = blocks;
  };

  /**
   * Show the test setup window
   */
  const setupTest = () => {
    currentWin = true;
  };

  /**
   * Update the value we are testing against
   *
   * @param testAgainst - the new value
   */
  const setTestAgainst = (testAgainst) => {
    addToUndoStack(blocks);
    focus.testData.testAgainst = testAgainst;
    blocks = blocks;
  };

  /**
   * Update the expected counts for X2 GOF
   *
   * @param value - the new value
   */
  const setExpCounts = (value) => {
    addToUndoStack(blocks);
    focus.testData.expCounts = value;
    blocks = blocks;
  };

  /**
   * Update the null hypothesis
   *
   * @param h0 - the new value
   */
  const setH0 = (h0) => {
    addToUndoStack(blocks);
    focus.testData.h0 = h0;
    blocks = blocks;
  };

  /**
   * Update the alternative hypothesis
   *
   * @param ha - the new value
   */
  const setHa = (ha) => {
    addToUndoStack(blocks);
    focus.testData.ha = ha;
    blocks = blocks;
  };

  /**
   * Update the boolean value representing whether the sample is random
   *
   * @param rand - the new value
   */
  const setRand = (rand) => {
    addToUndoStack(blocks);
    focus.testData.rand = rand;
    blocks = blocks;
  };

  /**
   * Update the value representing the tails (left right or both)
   *
   * @param tails - the new value
   */
  const setTails = (tails) => {
    addToUndoStack(blocks);
    focus.testData.tails = tails;
    blocks = blocks;
  };

  /**
   * Update the alpha (significance) value
   *
   * @param alpha - the new value
   */
  const setAlpha = (alpha) => {
    addToUndoStack(blocks);
    focus.testData.alpha = alpha;
    blocks = blocks;
  };

  /**
   * Close the test setup window
   */
  const closeWin = () => {
    currentWin = null;
  };
</script>

<main>
  <!--Render the navigation bar-->
  <Navbar
    {focus}
    {undo}
    {redo}
    {save}
    {load}
    {exp}
    {newText}
    {newTable}
    {newChart}
    {newStat}
    {newTest}
    font={focus.settings.fontFamily}
    {setFont}
    fontSize={focus.settings.fontSize}
    {setFontSize}
    color={focus.settings.color}
    {setColor}
    {align}
    {bold}
    {italic}
    {underline}
    testType={focus.testType}
    {setTestType}
    chartType={focus.chartType}
    {setChartType}
    statType={focus.statType}
    {setStatType}
    {addColumn}
    {delColumn}
    {addRow}
    {delRow}
    title={focus.title}
    {setTitle}
    {setChartTitle}
    {getFromCSV}
    hasHeaders={focus.hasHeaders}
    {toggleHeaders}
    dataType={focus.dataType}
    {setDataType}
    source={focus.sources}
    {setSource}
    col={focus.col}
    col2={focus.col2}
    cols={focus.cols}
    xCol={focus.xCol}
    {setXCol}
    {setCols}
    {setCol}
    {blocks}
    {moveUp}
    {moveDown}
    {delBlock}
    {setupTest}
  />

  <!--Render the pages-->
  <Page {blocks} {setFocus} {forceUpdate} />

  <!--Render the window, if there is one-->
  {#if currentWin !== null && focus.testType !== undefined && focus.testType !== null}
    <Window>
      <TestSetup
        {closeWin}
        testType={focus.testType}
        testAgainst={focus.testData.testAgainst}
        {setTestAgainst}
        source={focus.sources}
        expCounts={focus.testData.expCounts}
        {blocks}
        col={focus.col}
        {setExpCounts}
        h0={focus.testData.h0}
        {setH0}
        ha={focus.testData.ha}
        {setHa}
        rand={focus.testData.rand}
        {setRand}
        tails={focus.testData.tails}
        {setTails}
        alpha={focus.testData.alpha}
        {setAlpha}
      />
    </Window>
  {/if}
</main>

<style>
  main {
    margin: 0px;
  }
</style>
