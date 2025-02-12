<script>
  import TableTitleInput from './tableControls/TableTitleInput.svelte';
  import TableDimensionEditor from './tableControls/TableDimensionEditor.svelte';
  import TableCSVLoader from './tableControls/TableCSVLoader.svelte';
  import CheckInput from './tableControls/CheckInput.svelte';
  import DataTypeDropdown from './tableControls/DataTypeDropdown.svelte';
  import Button from './Button.svelte';

  let {
    title,
    setTitle = (title) => {},
    addColumn = () => {},
    delColumn = () => {},
    addRow = () => {},
    delRow = () => {},
    csvFiles,
    getFromCSV = (csvFiles) => {},
    hasHeaders,
    toggleHeaders = (hasHeaders) => {},
    visible,
    toggleVisible = (visible) => {},
    dataType,
    setDataType = (dataType) => {},
    cleanTable = () => {}
  } = $props();
</script>

<!--All the table-related controls needed by StatsView-->
<TableTitleInput {title} {setTitle} />
<TableDimensionEditor {addColumn} {delColumn} {addRow} {delRow} />
<TableCSVLoader {csvFiles} {getFromCSV} />
<Button
  add={null}
  iconSrc="./clean.png"
  iconAlt="Clean Table"
  handleClick={cleanTable}
  tooltip="Clean Table"
/>
<CheckInput bool={hasHeaders} toggle={toggleHeaders} title="Use Headers?" />
<DataTypeDropdown {dataType} {setDataType} />
<CheckInput bool={visible} toggle={toggleVisible} title="Visible?" /> |
