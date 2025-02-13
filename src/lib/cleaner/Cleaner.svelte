<script>
  import './data-table.ts';
  import './stat-select.ts';
  import './column-select.ts';
  import './comparison-select.ts';
  import { DataFrame } from './DataFrame';

  let { closeWin, table, updateBlock = (id, updates) => {} } = $props();

  /**
   * @type {string[]}
   * @description A list of column names in the current table
   */
  let columns = $derived(
    table.hasHeaders
      ? table.content[0]
      : table.content[0].map((_, index) => `Column ${index + 1}`)
  );

  /**
   * @type {string[][]}
   * @description A 2D array of the table data
   */
  let data = $derived(
    table.hasHeaders
      ? table.content.slice(1).map((row) => row.map((cell) => cell.toString()))
      : table.content.map((row) => row.map((cell) => cell.toString()))
  );

  /**
   * @type {DataFrame}
   * @description A DataFrame object representing the table data
   */
  let df = $derived(new DataFrame(data, columns));

  // The following are references to various inputs and selects, some are
  // custom elements so we have to use bind:this and it's easier to use
  // it for everything for consistency
  let fillEmptyValColSelect;
  let fillEmptyValInput;

  let fillEmptyStatColSelect;
  let fillEmptyStatSelect;

  let replaceValueColSelect;
  let replaceValueComparisonSelect;
  let replaceValueThresholdInput;
  let replaceValueInput;

  let replaceStatColSelect;
  let replaceStatComparisonSelect;
  let replaceStatThresholdInput;
  let replaceStatInput;

  let removeCompareColSelect;
  let removeCompareComparisonSelect;
  let removeCompareThresholdInput;

  let roundColSelect;
  let roundInput;

  const replaceTableContent = (newData) => {
    updateBlock(table.id, {
      content: [columns, ...newData]
    });
  };

  const removeDuplicates = () => {
    replaceTableContent(df.removeDuplicates().data);
  };

  const removeRowsWithEmptyValues = () => {
    replaceTableContent(df.removeRowsWithEmptyValues().data);
  };

  const fillEmpty = () => {
    replaceTableContent(
      df.fillEmpty(fillEmptyValColSelect.value, fillEmptyValInput.value).data
    );
  };

  const fillEmptyStat = () => {
    replaceTableContent(
      df.fillEmptyStat(fillEmptyStatColSelect.value, fillEmptyStatSelect.value)
        .data
    );
  };

  const replaceWithValue = () => {
    replaceTableContent(
      df.replaceWithValue(
        replaceValueColSelect.value,
        replaceValueComparisonSelect.value,
        replaceValueThresholdInput.value,
        replaceValueInput.value
      ).data
    );
  };

  const replaceWithStat = () => {
    replaceTableContent(
      df.replaceWithStat(
        replaceStatColSelect.value,
        replaceStatComparisonSelect.value,
        replaceStatThresholdInput.value,
        replaceStatInput.value
      ).data
    );
  };

  const removeRowsWhere = () => {
    replaceTableContent(
      df.removeRowsWhere(
        removeCompareColSelect.value,
        removeCompareComparisonSelect.value,
        removeCompareThresholdInput.value
      ).data
    );
  };

  const round = () => {
    replaceTableContent(df.round(roundColSelect.value, roundInput.value).data);
  };
</script>

<div class="container">
  <div id="table-container">
    <data-table id="table" {columns} {data}></data-table>
  </div>
  <div id="controls-container">
    <div id="remove-duplicates">
      Remove duplicates
      <button
        class="go-button"
        id="remove-duplicates-go"
        onclick={removeDuplicates}>Go</button
      >
    </div>

    <div id="remove-empty">
      Remove all rows with empty values
      <button
        class="go-button"
        id="remove-empty-go"
        onclick={removeRowsWithEmptyValues}>Go</button
      >
    </div>

    <div id="fill-empty-value">
      Fill all empty cells in
      <column-select
        id="fill-empty-value-col-select"
        {columns}
        bind:this={fillEmptyValColSelect}
      ></column-select>
      with
      <input id="fill-empty-value-input" bind:this={fillEmptyValInput} />
      <button class="go-button" id="fill-empty-value-go" onclick={fillEmpty}
        >Go</button
      >
    </div>

    <div id="fill-empty-stat">
      Fill all empty cells in
      <column-select
        id="fill-empty-stat-col-select"
        {columns}
        bind:this={fillEmptyStatColSelect}
      ></column-select>
      with
      <stat-select id="fill-empty-stat-select" bind:this={fillEmptyStatSelect}
      ></stat-select>
      <button class="go-button" id="fill-empty-stat-go" onclick={fillEmptyStat}
        >Go</button
      >
    </div>

    <div id="replace-value">
      Replace all values in
      <column-select
        id="replace-value-col-select"
        {columns}
        bind:this={replaceValueColSelect}
      ></column-select>
      that are
      <comparison-select
        id="replace-value-comparison-select"
        bind:this={replaceValueComparisonSelect}
      ></comparison-select>
      than
      <input
        id="replace-value-threshold-input"
        bind:this={replaceValueThresholdInput}
      />
      with
      <input id="replace-value-input" bind:this={replaceValueInput} />
      <button class="go-button" id="replace-value-go" onclick={replaceWithValue}
        >Go</button
      >
    </div>

    <div id="replace-stat">
      Replace all values in
      <column-select
        id="replace-stat-col-select"
        {columns}
        bind:this={replaceStatColSelect}
      ></column-select>
      that are
      <comparison-select
        id="replace-stat-comparison-select"
        bind:this={replaceStatComparisonSelect}
      ></comparison-select>
      than
      <input
        id="replace-stat-threshold-input"
        bind:this={replaceStatThresholdInput}
      />
      with
      <stat-select id="replace-stat-select" bind:this={replaceStatInput}
      ></stat-select>
      <button class="go-button" id="replace-stat-go" onclick={replaceWithStat}
        >Go</button
      >
    </div>

    <div id="remove-compare">
      Remove all rows where the value of
      <column-select
        id="remove-compare-col-select"
        {columns}
        bind:this={removeCompareColSelect}
      ></column-select>
      is
      <comparison-select
        id="remove-compare-select"
        bind:this={removeCompareComparisonSelect}
      ></comparison-select>
      than
      <input
        id="remove-compare-threshold-input"
        bind:this={removeCompareThresholdInput}
      />
      <button class="go-button" id="remove-compare-go" onclick={removeRowsWhere}
        >Go</button
      >
    </div>

    <div id="round">
      Round all values in
      <column-select id="round-col-select" {columns} bind:this={roundColSelect}
      ></column-select>
      to
      <input
        id="round-input"
        bind:this={roundInput}
        type="number"
        min="0"
        max="20"
      />
      decimal places
      <button class="go-button" id="round-go" onclick={round}>Go</button>
    </div>

    <button class="exit-button" id="exit" onclick={closeWin}>Exit</button>
  </div>
</div>

<style>
  .container {
    display: flex;
    width: 100%;
    height: 90vh;
    overflow: hidden;
  }

  #table-container,
  #controls-container {
    flex: 1;
    overflow: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  #table-container {
    flex: 2;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Prevent table from expanding */
  }

  #controls-container {
    flex: 1;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  /* Ensure data-table respects container */
  #table-container > data-table {
    flex-grow: 1;
    overflow: auto;
    height: 100%;
    width: 100%;
  }

  /* Ensure controls can scroll independently */
  #controls-container > * {
    flex-shrink: 0;
  }

  /* Scrollable controls container */
  #controls-container {
    overflow-y: auto;
  }

  button {
    background-color: white;
    border: 1px solid black;
    color: black;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 5px;
    font-size: 15px;
  }

  input {
    background-color: white;
    border: 1px solid black;
    color: black;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 5px;
    font-size: 15px;
  }
</style>
