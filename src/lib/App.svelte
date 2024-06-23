<script>
  import Navbar from './Navbar.svelte';
  import Page from './Page.svelte';
  import TestSetup from './TestSetup.svelte';
  import Window from './Window.svelte';

  // Store the blocks as an array.
  let blocks = [];

  // Adjust the toolbar based on what is focused and store the correct block reference
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
  const setFocus = (props) => (focus = props);

  // Store which window is in use, if any
  let currentWin = null;

  // Undo and Redo stacks store old versions of the blocks list.
  let undoStack = [];
  let redoStack = [];

  // Function to add an instance of blocks to the undoStack. To save memory, the undoStack
  // is limited to a length of 50.
  const addToUndoStack = (instance) => {
    // If we undo something, then the redo actions make no sense. Get rid of them here.
    redoStack = [];

    undoStack = [structuredClone(instance), ...undoStack];
    if (undoStack.length > 50) {
      undoStack.pop();
    }
  };

  // Ditto for the redoStack
  const addToRedoStack = (instance) => {
    redoStack = [structuredClone(instance), ...redoStack];
    if (redoStack.length > 50) {
      redoStack.pop();
    }
  };

  // Force the blocks array to update and add it to the undo stack
  const forceUpdate = () => {
    addToUndoStack(blocks);
    blocks = blocks;
  };

  // Undo last change to blocks
  const undo = () => {
    if (undoStack.length > 0) {
      addToRedoStack(blocks);
      blocks = structuredClone(undoStack[0]);
      undoStack.splice(0, 1);
    }
  };

  // Redo last change to blocks
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

  // Save to proprietary .stv file
  const save = () => {};

  // Load from .stv file
  const load = () => {};

  // Export to .docx
  const exp = () => {};

  // The following functions create new elements to add to the document
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

  const newChart = () => {
    addToUndoStack(blocks);
    blocks = [
      ...blocks,
      {
        id: blocks.length,
        type: 'chart',
        sources: null,
        col: null,
        content: null,
        settings: {
          types: []
        }
      }
    ];
  };

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

  // Change font
  const setFont = (font) => {
    addToUndoStack(blocks);
    focus.settings.fontFamily = font;
    blocks = blocks;
  };

  // Change font size
  const setFontSize = (fontSize) => {
    addToUndoStack(blocks);
    focus.settings.fontSize = fontSize;
    blocks = blocks;
  };

  // Change color
  const setColor = (color) => {
    addToUndoStack(blocks);
    focus.settings.color = color;
    blocks = blocks;
  };

  // Change text align
  const align = (align) => {
    addToUndoStack(blocks);
    focus.settings.textAlign = align;
    blocks = blocks;
  };

  // Bold/unbold
  const bold = () => {
    addToUndoStack(blocks);
    focus.settings.bold = !focus.settings.bold;
    blocks = blocks;
  };

  // Italic/not italic
  const italic = () => {
    addToUndoStack(blocks);
    focus.settings.italic = !focus.settings.italic;
    blocks = blocks;
  };

  // Underline/not underline
  const underline = () => {
    addToUndoStack(blocks);
    focus.settings.underline = !focus.settings.underline;
    blocks = blocks;
  };

  // Set type of test
  const setTestType = (testType) => {
    addToUndoStack(blocks);
    focus.testType = testType;
    blocks = blocks;
  };

  // Set type of stat
  const setStatType = (statType) => {
    addToUndoStack(blocks);
    focus.statType = statType;
    blocks = blocks;
  };

  // Add column to table
  const addColumn = () => {
    addToUndoStack(blocks);
    for (let i = 0; i < focus.content.length; i++) {
      focus.content[i].push(0);
    }
    blocks = blocks;
  };

  // Delete column from table
  const delColumn = () => {
    addToUndoStack(blocks);
    if (focus.content[0].length > 1) {
      for (let i = 0; i < focus.content.length; i++) {
        focus.content[i].pop();
      }
      blocks = blocks;
    }
  };

  // Add row to table
  const addRow = () => {
    addToUndoStack(blocks);
    let newRow = [];
    for (let i = 0; i < focus.content[0].length; i++) {
      newRow.push(0);
    }
    focus.content.push(newRow);
    blocks = blocks;
  };

  // Delete row from table
  const delRow = () => {
    addToUndoStack(blocks);
    if (focus.content.length > 1) {
      focus.content.pop();
      blocks = blocks;
    }
  };

  // Set title of table
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

  // Get table data from csv
  const getFromCSV = async (file) => {
    if (file) {
      const dataString = await file.text();
      const data = parseCSV(dataString);
      focus.content = data;
      blocks = blocks;
    }
  };

  // Helper function to parse a csv file
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

  // Change settings regarding whether the top row of a table should be used as headers
  const toggleHeaders = (hasHeaders) => {
    focus.hasHeaders = hasHeaders;
    blocks = blocks;
  };

  // Set data type of a table
  const setDataType = (dataType) => {
    focus.dataType = dataType;
    blocks = blocks;
  };

  // Set data source for statistical thing
  const setSource = (source) => {
    addToUndoStack(blocks);
    focus.sources = source;
    blocks = blocks;
  };

  // Set column to use for statistical thing
  const setCol = (col, sourceNum) => {
    addToUndoStack(blocks);
    if (sourceNum == 1) focus.col = col;
    else if (sourceNum == 2) focus.col2 = col;
    blocks = blocks;
  };

  // Move a block up
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

  // Move a block down
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

  // Delete a block
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
    blocks = blocks;
  };

  // Setup a statistical test
  const setupTest = () => {
    /*
    if (focus.testData == undefined) focus.testData = {
      testAgainst: null,
      expCounts: null,
      h0: null,
      ha: null,
      rand: null,
      tails: null,
      alpha: null
    };
    if (focus.testData.testAgainst == null) focus.testData.testAgainst = "Undefined Column";
    if (focus.testData.expCounts == null) focus.testData.expCounts = "1, 2, 3, 4, 5";
    if (focus.testData.h0 == null) focus.testData.h0 = "Null Hypothesis";
    if (focus.testData.ha == null) focus.testData.ha = "Alt Hypothesis";
    if (focus.testData.rand == null) focus.testData.rand = false;
    if (focus.testData.tails == null) focus.testData.tails = false;
    if (focus.testData.alpha == null) focus.testData.alpha = 0.05;
    blocks = blocks;
    */
    currentWin = true;
  };

  // Update the value we are testing against
  const setTestAgainst = (testAgainst) => {
    addToUndoStack(blocks);
    focus.testData.testAgainst = testAgainst;
    blocks = blocks;
  };

  // Update the expected counts for X2 GOF
  const setExpCounts = (expCounts) => {
    addToUndoStack(blocks);
    focus.testData.expCounts = expCounts;
    blocks = blocks;
  };

  // Update the null hypothesis
  const setH0 = (h0) => {
    addToUndoStack(blocks);
    focus.testData.h0 = h0;
    blocks = blocks;
  };

  // Update the alternative hypothesis
  const setHa = (ha) => {
    addToUndoStack(blocks);
    focus.testData.ha = ha;
    blocks = blocks;
  };

  // Update the random condition
  const setRand = (rand) => {
    addToUndoStack(blocks);
    focus.testData.rand = rand;
    blocks = blocks;
  };

  // Update the tail status
  const setTails = (tails) => {
    addToUndoStack(blocks);
    focus.testData.tails = tails;
    blocks = blocks;
  };

  // Update the significance level
  const setAlpha = (alpha) => {
    addToUndoStack(blocks);
    focus.testData.alpha = alpha;
    blocks = blocks;
  };

  // Close a window
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
    statType={focus.statType}
    {setStatType}
    {addColumn}
    {delColumn}
    {addRow}
    {delRow}
    title={focus.title}
    {setTitle}
    {getFromCSV}
    hasHeaders={focus.hasHeaders}
    {toggleHeaders}
    dataType={focus.dataType}
    {setDataType}
    source={focus.sources}
    {setSource}
    col={focus.col}
    col2={focus.col2}
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
        expCounts={focus.testData.expCounts}
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
