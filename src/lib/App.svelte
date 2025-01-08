<script>
  import generateDocx, { saveDocx } from './helper/docxGenerator';
  import generatePDF, { savePDF } from './helper/pdfGenerator';
  import Navbar from './Navbar.svelte';
  import Page from './Page.svelte';
  import TestSetup from './TestSetup.svelte';
  import Window from './Window.svelte';

  /**
   * The list of all blocks
   */
  let blocks = $state([]);

  /**
   * Focus object for if nothing is focused
   */
  let nullFocus = {
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
   * Id of the currently focused block
   */
  let focusedId = $state(null);

  /**
   * Coordinates of the focused cell in a table
   */
  let focusedCell = {
    row: null,
    col: null
  };

  /**
   * Reference to the currently focused block
   */
  let focusedBlock = $derived(
    blocks.find((b) => b.id === focusedId) ?? nullFocus
  );

  /**
   * List of all table blocks
   */
  let tableBlocks = $derived(blocks.filter((b) => b.type === 'table'));

  /**
   * Reference to the source table of the focused block
   */
  let sourceTable = $derived(
    tableBlocks.find((b) => b.title === focusedBlock?.sources) ?? null
  );

  /**
   * Set the focus
   * @param props - the new focus
   */
  const setFocus = (props) => {
    focusedId = props.id;
    focusedCell = { row: props?.row, col: props?.col };
  };

  /**
   * Reference to the current window
   */
  let currentWin = $state(null);

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

    undoStack = [structuredClone($state.snapshot(instance)), ...undoStack];
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
    redoStack = [structuredClone($state.snapshot(instance)), ...redoStack];
    if (redoStack.length > 50) {
      redoStack.pop();
    }
  };

  /**
   * Force an update to the undo stack
   */
  const forceUpdate = () => {
    addToUndoStack(blocks);
  };

  /**
   * Undo last change to blocks
   */
  const undo = () => {
    if (undoStack.length > 0) {
      addToRedoStack(blocks);
      blocks = structuredClone($state.snapshot(undoStack[0]));
      undoStack.splice(0, 1);
    }
  };

  /**
   * Redo last change
   */
  const redo = () => {
    if (redoStack.length > 0) {
      // First add the current setup to undoStack
      undoStack = [structuredClone($state.snapshot(blocks)), ...undoStack];
      if (undoStack.length > 50) {
        undoStack.pop();
      }

      // Then activate the redo
      blocks = structuredClone($state.snapshot(redoStack[0]));
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
  const exp = async () => {
    if (blocks) {
      const doc = await generateDocx(blocks);
      saveDocx(doc, 'report');
    }
  };

  /**
   * Export to .pdf
   */
  const expPdf = async () => {
    if (blocks) {
      const pdf = await generatePDF(blocks);
      savePDF(pdf, 'report');
    }
  };

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
          color: '#000000',
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
        visible: true,
        dataType: 'Categorical',
        settings: {
          fontFamily: 'Times New Roman',
          fontSize: 12,
          color: '#000000',
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
          color: '#000000',
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
          color: '#000000',
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
   * Create new interval block
   */
  const newInterval = () => {
    addToUndoStack(blocks);
    blocks = [
      ...blocks,
      {
        id: blocks.length,
        type: 'interval',
        sources: null,
        col: null,
        content: 'Source configuration required.',
        intervalType: null,
        confidenceLevel: 0.95,
        settings: {
          fontFamily: 'Times New Roman',
          fontSize: 12,
          color: '#000000',
          textAlign: 'left',
          bold: false,
          italic: false,
          underline: false
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
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.settings.fontFamily = font;
      }
      return block;
    });
  };

  /**
   * Change font size
   *
   * @param fontSize - the new font size
   */
  const setFontSize = (fontSize) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.settings.fontSize = fontSize;
      }
      return block;
    });
  };

  /**
   * Change font color
   *
   * @param color - the new font color
   */
  const setColor = (color) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.settings.color = color;
      }
      return block;
    });
  };

  /**
   * Change text alignment
   *
   * @param align - the new text alignment
   */
  const align = (align) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.settings.textAlign = align;
      }
      return block;
    });
  };

  /**
   * Make text bold/not bold (toggle)
   */
  const bold = () => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.settings.bold = !block.settings.bold;
      }
      return block;
    });
  };

  /**
   * Make text italic/not italic (toggle)
   */
  const italic = () => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.settings.italic = !block.settings.italic;
      }
      return block;
    });
  };

  /**
   * Make text underline/not underline (toggle)
   */
  const underline = () => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.settings.underline = !block.settings.underline;
      }
      return block;
    });
  };

  /**
   * Set type of a test
   *
   * @param testType - the new test type
   */
  const setTestType = (testType) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.testType = testType;
      }
      return block;
    });
  };

  /**
   * Set type of an interval
   *
   * @param intervalType - the new interval type
   */
  const setIntervalType = (intervalType) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.intervalType = intervalType;
      }
      return block;
    });
  };

  /**
   * Set confidence level of an interval
   *
   * @param confidenceLevel - the new confidence level
   */
  const setConfidenceLevel = (confidenceLevel) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.confidenceLevel = confidenceLevel;
      }
      return block;
    });
  };

  /**
   * Set type of a chart
   *
   * @param chartType - the new chart type
   */
  const setChartType = (chartType) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.chartType = chartType;
      }
      return block;
    });
  };

  /**
   * Set title of a chart
   *
   * @param title - the new chart title
   */
  const setChartTitle = (title) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.title = title;
      }
      return block;
    });
  };

  /**
   * Set type of a stat
   *
   * @param statType - the new stat type
   */
  const setStatType = (statType) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.statType = statType;
      }
      return block;
    });
  };

  /**
   * Add column to table
   *
   * @param title - the new column title
   */
  const addColumn = () => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.content.forEach((row) => {
          row.push(0);
        });
      }
      return block;
    });
  };

  /**
   * Delete last column from table
   */
  const delColumn = () => {
    addToUndoStack(blocks);
    if (focusedBlock.content[0].length > 1) {
      blocks = blocks.map((block) => {
        if (block.id == focusedId) {
          block.content = block.content.map((row) => [
            ...row.slice(0, focusedCell.col),
            ...row.slice(focusedCell.col + 1)
          ]);
        }
        return block;
      });
    }
  };

  /**
   * Add row to table
   */
  const addRow = () => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.content.push(new Array(block.content[0].length).fill(0));
      }
      return block;
    });
  };

  /**
   * Delete focused row from table
   */
  const delRow = () => {
    addToUndoStack(blocks);
    if (focusedBlock.content.length > 1) {
      blocks = blocks.map((block) => {
        if (block.id == focusedId) {
          block.content = [
            ...block.content.slice(0, focusedCell.row),
            ...block.content.slice(focusedCell.row + 1)
          ];
        }
        return block;
      });
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
      focusedBlock.title !== undefined
        ? focusedBlock.title
        : 'Table' + focusedBlock.id;
    focusedBlock.title = title;
    blocks = blocks
      .map((block) => {
        if (block.id == focusedId) {
          block.title = title;
        }
        return block;
      })
      .map((block) => {
        if (block.sources === oldTitle) block.sources = title;
        return block;
      });
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
      blocks = blocks.map((block) => {
        if (block.id == focusedId) {
          block.content = data;
        }
        return block;
      });
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
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.hasHeaders = hasHeaders;
      }
      return block;
    });
  };

  /**
   * Toggle whether or not the table is visible
   */
  const toggleVisible = () => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.visible = !block?.visible;
      }
      return block;
    });
  };

  /**
   * Set data type for statistical thing
   *
   * @param dataType - the new data type
   */
  const setDataType = (dataType) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.dataType = dataType;
      }
      return block;
    });
  };

  /**
   * Set source table for statistical thing
   *
   * @param source - the new source table
   */
  const setSource = (source) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.sources = source;
      }
      return block;
    });
  };

  /**
   * Set source column for statistical thing
   *
   * @param col - the new column
   * @param sourceNum - the column to change (1 or 2, if there's a second column)
   */
  const setCol = (col, sourceNum) => {
    addToUndoStack(blocks);
    if (sourceNum == 1)
      blocks = blocks.map((block) =>
        block.id == focusedId ? { ...block, col: col } : block
      );
    else if (sourceNum == 2)
      blocks = blocks.map((block) =>
        block.id == focusedId ? { ...block, col2: col } : block
      );
  };

  /**
   * Set x column for chart
   *
   * @param col - the new x column
   */
  const setXCol = (col) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.xCol = col;
      }
      return block;
    });
  };

  /**
   * Set columns for chart
   *
   * @param cols - the new columns
   */
  const setCols = (cols) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.cols = cols;
      }
      return block;
    });
  };

  /**
   * Move a block up one position
   */
  const moveUp = () => {
    addToUndoStack(blocks);
    const id = focusedId;
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
    const id = focusedId;
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
    blocks = blocks
      .filter((block) => block.id != focusedId)
      .map((block) => {
        if (block.id > focusedId) block.id--;
        return block;
      })
      .map((block) => {
        if (block?.sources === focusedBlock?.title) block.sources = null;
        return block;
      });
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
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.testData.testAgainst = testAgainst;
      }
      return block;
    });
  };

  /**
   * Update the expected counts for X2 GOF
   *
   * @param value - the new value
   */
  const setExpCounts = (value) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.testData.expCounts = value;
      }
      return block;
    });
  };

  /**
   * Update the null hypothesis
   *
   * @param h0 - the new value
   */
  const setH0 = (h0) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.testData.h0 = h0;
      }
      return block;
    });
  };

  /**
   * Update the alternative hypothesis
   *
   * @param ha - the new value
   */
  const setHa = (ha) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.testData.ha = ha;
      }
      return block;
    });
  };

  /**
   * Update the boolean value representing whether the sample is random
   *
   * @param rand - the new value
   */
  const setRand = (rand) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.testData.rand = rand;
      }
      return block;
    });
  };

  /**
   * Update the value representing the tails (left right or both)
   *
   * @param tails - the new value
   */
  const setTails = (tails) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.testData.tails = tails;
      }
      return block;
    });
  };

  /**
   * Update the alpha (significance) value
   *
   * @param alpha - the new value
   */
  const setAlpha = (alpha) => {
    addToUndoStack(blocks);
    blocks = blocks.map((block) => {
      if (block.id == focusedId) {
        block.testData.alpha = alpha;
      }
      return block;
    });
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
    focus={focusedBlock}
    {sourceTable}
    {undo}
    {redo}
    {save}
    {load}
    {exp}
    {expPdf}
    {newText}
    {newTable}
    {newChart}
    {newStat}
    {newTest}
    {newInterval}
    font={focusedBlock.settings.fontFamily}
    {setFont}
    fontSize={focusedBlock.settings.fontSize}
    {setFontSize}
    color={focusedBlock.settings.color}
    {setColor}
    {align}
    {bold}
    {italic}
    {underline}
    testType={focusedBlock.testType}
    {setTestType}
    intervalType={focusedBlock.intervalType}
    {setIntervalType}
    confidenceLevel={focusedBlock.confidenceLevel}
    {setConfidenceLevel}
    chartType={focusedBlock.chartType}
    {setChartType}
    statType={focusedBlock.statType}
    {setStatType}
    {addColumn}
    {delColumn}
    {addRow}
    {delRow}
    title={focusedBlock.title}
    {setTitle}
    {setChartTitle}
    {getFromCSV}
    hasHeaders={focusedBlock.hasHeaders}
    {toggleHeaders}
    visible={focusedBlock.visible}
    {toggleVisible}
    dataType={focusedBlock.dataType}
    {setDataType}
    source={focusedBlock.sources}
    {setSource}
    col={focusedBlock.col}
    col2={focusedBlock.col2}
    cols={focusedBlock.cols}
    xCol={focusedBlock.xCol}
    {setXCol}
    {setCols}
    {setCol}
    {tableBlocks}
    {moveUp}
    {moveDown}
    {delBlock}
    {setupTest}
  />

  <!--Render the pagesx-->
  <Page bind:blocks {setFocus} {forceUpdate} />

  <!--Render the window, if there is one-->
  {#if currentWin !== null && focusedBlock.testType !== undefined && focusedBlock.testType !== null}
    <Window>
      <TestSetup
        {closeWin}
        testType={focusedBlock.testType}
        testAgainst={focusedBlock.testData.testAgainst}
        {setTestAgainst}
        source={focusedBlock.sources}
        expCounts={focusedBlock.testData.expCounts}
        {sourceTable}
        col={focusedBlock.col}
        {setExpCounts}
        h0={focusedBlock.testData.h0}
        {setH0}
        ha={focusedBlock.testData.ha}
        {setHa}
        rand={focusedBlock.testData.rand}
        {setRand}
        tails={focusedBlock.testData.tails}
        {setTails}
        alpha={focusedBlock.testData.alpha}
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
