<script>
    import Select from '../Select.svelte';

    let { dataType, setDataType = (dataType) => {} } = $props();
</script>

<!--A dropdown with 3 statistical data types-->
<Select value={dataType} setter={setDataType}>
    <option value="Categorical">Categorical</option>
    <option value="Quantitative">Quantitative</option>
    <option value="Binary">Binary</option>
</Select>
