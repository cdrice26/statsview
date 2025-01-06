<!--This goes inside a Window and allows us to move all the inputs for testing out of the Navbar
    to avoid it being too crowded.-->

<script>
  import { run } from 'svelte/legacy';

  import { getUnique } from './helper/unique';


  /**
   * @typedef {Object} Props
   * @property {any} [closeWin]
   * @property {any} testType
   * @property {any} [testAgainst]
   * @property {any} [setTestAgainst]
   * @property {any} [source]
   * @property {any} sourceTable
   * @property {any} col
   * @property {any} [expCounts]
   * @property {any} [setExpCounts]
   * @property {any} [h0]
   * @property {any} [setH0]
   * @property {any} [ha]
   * @property {any} [setHa]
   * @property {any} [rand]
   * @property {any} [setRand]
   * @property {any} [tails]
   * @property {any} [setTails]
   * @property {any} [alpha]
   * @property {any} [setAlpha]
   */

  /** @type {Props} */
  let {
    closeWin = () => {},
    testType,
    testAgainst = $bindable(null),
    setTestAgainst = (testAgainst) => {},
    source = null,
    sourceTable,
    col,
    expCounts = $bindable([]),
    setExpCounts = (index, value) => {},
    h0 = $bindable(null),
    setH0 = (h0) => {},
    ha = $bindable(null),
    setHa = (ha) => {},
    rand = $bindable(null),
    setRand = (rand) => {},
    tails = $bindable(null),
    setTails = (tails) => {},
    alpha = $bindable(null),
    setAlpha = (alpha) => {}
  } = $props();

  /**
   * Check if the source table has headers
   */
  let hasHeaders = $derived(sourceTable.hasHeaders);

  /**
   * Get the content of the source table
   */
  let sourceTableContent = $derived(sourceTable.content);

  /**
   * Get the index of the column we are testing
   */
  let colIndex = $derived(sourceTableContent[0].indexOf(col));

  /**
   * Get the unique values in the column we are testing (used only on X2 GOF tests)
   */
  let vals =
    $derived(source == null
      ? []
      : (getUnique(
          (hasHeaders ? sourceTableContent.slice(1) : sourceTableContent).map(
            (item) => item[colIndex === -1 ? 0 : colIndex] ?? ''
          )
        ) ?? []));

  /**
   * Set the expected counts to be the same length as the unique values
   */
  run(() => {
    if (vals.length > 0 && expCounts === null) {
      expCounts = new Array(vals.length).fill(1);
    }
  });
  run(() => {
    if (expCounts.length < vals.length) {
      expCounts = [
        ...expCounts,
        ...new Array(vals.length - expCounts.length).fill(1)
      ];
    }
  });
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
      onchange={() => setTestAgainst(testAgainst)}
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
        onchange={() => setExpCounts(expCounts)}
      />
      <br />
    {/each}
    <br />
  {/if}
  <!--Inputs for hypotheses.-->
  <label for={testType + '-h0'}>Null Hypothesis:</label>
  <input id={testType + '-h0'} bind:value={h0} oninput={() => setH0(h0)} />
  <br />
  <label for={testType + '-ha'}>Alternative Hypothesis:</label>
  <input id={testType + '-ha'} bind:value={ha} onchange={() => setHa(ha)} />
  <br />
  <!--Random condition checkbox-->
  <label for={testType + '-rand'}>Random Sample?</label>
  <input
    id={testType + '-rand'}
    type="checkbox"
    bind:checked={rand}
    onchange={() => setRand(rand)}
  />
  <br />
  <!--If it's not chi-squared, dropdown for two-tailed test-->
  {#if !testType.includes('X2') && !testType.includes('ANOVA') && !testType.includes('Regression')}
    <label for={testType + '-2t'}>Alternative:</label>
    <select
      id={testType + '-2t'}
      bind:value={tails}
      onchange={() => setTails(tails)}
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
    onchange={() => setAlpha(alpha)}
  />
  <br />
  <!--Done button to close the window-->
  <button onclick={closeWin}>Done</button>
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
