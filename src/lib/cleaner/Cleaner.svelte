<script>
  let { closeWin } = $props();
</script>

<data-table id="table"></data-table>
<div id="remove-duplicates">
  Remove duplicates
  <button class="go-button" id="remove-duplicates-go">Go</button>
</div>
<div id="remove-empty">
  Remove all rows with empty values
  <button class="go-button" id="remove-empty-go">Go</button>
</div>
<div id="fill-empty-value">
  Fill all empty cells in
  <column-select id="fill-empty-value-col-select"></column-select>
  with
  <input id="fill-empty-value-input" />
  <button class="go-button" id="fill-empty-value-go">Go</button>
</div>
<div id="fill-empty-stat">
  Fill all empty cells in
  <column-select id="fill-empty-stat-col-select"></column-select>
  with
  <stat-select id="fill-empty-stat-select"></stat-select>
  <button class="go-button" id="fill-empty-stat-go">Go</button>
</div>
<div id="convert">
  Convert all values in
  <column-select id="convert-col-select"></column-select>
  to numbers
  <button class="go-button" id="convert-go">Go</button>
</div>
<div id="replace-value">
  Replace all values in
  <column-select id="replace-value-col-select"></column-select>
  that are
  <comparison-select id="replace-value-comparison-select"></comparison-select>
  than
  <input id="replace-value-threshold-input" />
  with
  <input id="replace-value-input" />
  <button class="go-button" id="replace-value-go">Go</button>
</div>
<div id="replace-stat">
  Replace all values in
  <column-select id="replace-stat-col-select"></column-select>
  that are
  <comparison-select id="replace-stat-comparison-select"></comparison-select>
  than
  <input id="replace-stat-threshold-input" />
  with
  <stat-select id="replace-stat-select"></stat-select>
  <button class="go-button" id="replace-stat-go">Go</button>
</div>
<div id="remove-compare">
  Remove all rows where the value of
  <column-select id="remove-compare-col-select"></column-select>
  is
  <comparison-select id="remove-compare-select"></comparison-select>
  than
  <input id="remove-compare-threshold-input" />
  <button class="go-button" id="remove-compare-go">Go</button>
</div>
<div id="round">
  Round all values in
  <column-select id="round-col-select"></column-select>
  to
  <input id="round-input" />
  decimal places
  <button class="go-button" id="round-go">Go</button>
</div>
<button class="exit-button" id="exit" onclick={closeWin}>Exit</button>

<style>
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
