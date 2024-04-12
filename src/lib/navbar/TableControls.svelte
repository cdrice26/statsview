<script>
    import TableTitleInput from './tableControls/TableTitleInput.svelte';
    import TableDimensionEditor from './tableControls/TableDimensionEditor.svelte';
    import TableCSVLoader from './tableControls/TableCSVLoader.svelte';
    import CheckInput from './tableControls/CheckInput.svelte';
    import DataTypeDropdown from './tableControls/DataTypeDropdown.svelte';

    export let title;
    export let setTitle = (title) => {};
    export let addColumn = () => {};
    export let delColumn = () => {};
    export let addRow = () => {};
    export let delRow = () => {};
    export let csvFiles;
    export let getFromCSV = (csvFiles) => {};
    export let hasHeaders;
    export let toggleHeaders = (hasHeaders) => {};
    export let dataType;
    export let setDataType = (dataType) => {};
</script>

<!--All the table-related controls needed by StatsView-->
<TableTitleInput {title} {setTitle} />
<TableDimensionEditor {addColumn} {delColumn} {addRow} {delRow} />
<TableCSVLoader {csvFiles} {getFromCSV} />
<CheckInput bool={hasHeaders} toggle={toggleHeaders} title="Use Headers?" />
<DataTypeDropdown {dataType} {setDataType} />
