<script>
    import Select from '../Select.svelte';

    let { font, setFont = (font) => {} } = $props();
</script>

<!--Font Family-->
<Select value={font} setter={setFont}>
    <option value="Arial" selected>Arial</option>
    <option value="Comic Sans MS">Comic Sans MS</option>
    <option value="Times New Roman">Times New Roman</option>
    <option value="Courier New">Courier New</option>
    <option value="Verdana">Verdana</option>
    <option value="Trebuchet MS">Trebuchet MS</option>
    <option value="Arial Black">Arial Black</option>
    <option value="Impact">Impact</option>
    <option value="Bookman">Bookman</option>
    <option value="Garamond">Garamond</option>
    <option value="Palatino">Palatino</option>
    <option value="Georgia">Georgia</option>
</Select>
