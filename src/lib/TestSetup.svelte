<!--This goes inside a Window and allows us to move all the inputs for testing out of the Navbar
    to avoid it being too crowded.-->

<script>
  import { getUnique } from './helper/unique';

  export let closeWin = () => {};
  export let testType;

  export let testAgainst = null;
  export let setTestAgainst = (testAgainst) => {};
  export let source = null;
  export let sourceTable;
  export let col;
  export let expCounts = [];
  export let setExpCounts = (index, value) => {};
  export let h0 = null;
  export let setH0 = (h0) => {};
  export let ha = null;
  export let setHa = (ha) => {};
  export let rand = null;
  export let setRand = (rand) => {};
  export let tails = null;
  export let setTails = (tails) => {};
  export let alpha = null;
  export let setAlpha = (alpha) => {};

  /**
   * Check if the source table has headers
   */
  $: hasHeaders = sourceTable.hasHeaders;

  /**
   * Get the content of the source table
   */
  $: sourceTableContent = sourceTable.content;

  /**
   * Get the index of the column we are testing
   */
  $: colIndex = sourceTableContent[0].indexOf(col);

  /**
   * Get the unique values in the column we are testing (used only on X2 GOF tests)
   */
  $: vals =
    source == null
      ? []
      : (getUnique(
          (hasHeaders ? sourceTableContent.slice(1) : sourceTableContent).map(
            (item) => item[colIndex === -1 ? 0 : colIndex] ?? ''
          )
        ) ?? []);

  /**
   * Set the expected counts to be the same length as the unique values
   */
  $: if (vals.length > 0 && expCounts === null) {
    expCounts = new Array(vals.length).fill(1);
  }
  $: if (expCounts.length < vals.length) {
    expCounts = [
      ...expCounts,
      ...new Array(vals.length - expCounts.length).fill(1)
    ];
  }
</script>

<main>
  <header>
    <h3>Test Setup</h3>
  </header>
  <!--Input for population mean (or proportion) to test against. Only for 1-Sample T or Z Tests.-->
  {#if testType.includes('1Samp')}
    <label for={testType + '-testAgainst'}>Test Against: </label>
    <input
      id={testType + '-testAgainst'}
      type="number"
      bind:value={testAgainst}
      on:change={() => setTestAgainst(testAgainst)}
    />
    <br />
  {/if}
  <!--Input for expected counts. Only for chi-squared GOF test.-->
  {#if testType == 'X2GOFTest'}
    Expected Counts (should add up to {hasHeaders
      ? sourceTableContent.length - 1
      : sourceTableContent.length}): <br />
    {#each vals as val, idx}
      <label for={testType + `-expCounts${idx}`}>{val}:</label>
      <input
        id={testType + `-expCounts${idx}`}
        bind:value={expCounts[idx]}
        on:change={() => setExpCounts(expCounts)}
      />
      <br />
    {/each}
    <br />
  {/if}
  <!--Inputs for hypotheses.-->
  <label for={testType + '-h0'}>Null Hypothesis:</label>
  <input id={testType + '-h0'} bind:value={h0} on:input={() => setH0(h0)} />
  <br />
  <label for={testType + '-ha'}>Alternative Hypothesis:</label>
  <input id={testType + '-ha'} bind:value={ha} on:change={() => setHa(ha)} />
  <br />
  <!--Random condition checkbox-->
  <label for={testType + '-rand'}>Random Sample?</label>
  <input
    id={testType + '-rand'}
    type="checkbox"
    bind:checked={rand}
    on:change={() => setRand(rand)}
  />
  <br />
  <!--If it's not chi-squared, dropdown for two-tailed test-->
  {#if !testType.includes('X2')}
    <label for={testType + '-2t'}>Two Tailed?</label>
    <select
      id={testType + '-2t'}
      bind:value={tails}
      on:change={() => setTails(tails)}
    >
      <option value="two-sided">Two Tailed</option>
      <option value="less">Left Tailed</option>
      <option value="greater">Right Tailed</option>
    </select>
    <br />
  {/if}
  <!--Significance level input-->
  <label for={testType + '-alpha'}>Significance Level:</label>
  <input
    id={testType + '-alpha'}
    type="number"
    step="0.01"
    min="0.01"
    max="1"
    bind:value={alpha}
    on:change={() => setAlpha(alpha)}
  />
  <br />
  <!--Done button to close the window-->
  <button on:click={closeWin}>Done</button>
</main>

<style>
  main {
    text-align: center;
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
    line-height: 1.5;
  }
  header {
    padding: 0;
    margin-bottom: 3px;
  }
  input,
  button {
    border: 1px solid black;
    border-radius: 3px;
    background-color: white;
    color: black;
    padding: 2px;
  }
</style>
