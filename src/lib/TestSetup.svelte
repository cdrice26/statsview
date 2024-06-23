<!--This goes inside a Window and allows us to move all the inputs for testing out of the Navbar
    to avoid it being too crowded.-->

<script>
  export let closeWin = () => {};
  export let testType;

  export let testAgainst = null;
  export let setTestAgainst = (testAgainst) => {};
  export let expCounts = null;
  export let setExpCounts = (expCounts) => {};
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
    <label for={testType + '-expCounts'}
      >Expected Counts (Separate by Commas):</label
    >
    <input
      id={testType + '-expCounts'}
      bind:value={expCounts}
      on:change={() => setExpCounts(expCounts)}
    />
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
