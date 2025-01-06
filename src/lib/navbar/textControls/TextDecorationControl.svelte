<script>
    import Button from '../Button.svelte';

    let { bold = () => {}, italic = () => {}, underline = () => {} } = $props();
</script>

<!--Text decoration-->
<Button add={null} iconSrc="./bold.png" iconAlt="Bold" handleClick={bold} />
<Button
    add={null}
    iconSrc="./italic.png"
    iconAlt="Italic"
    handleClick={italic}
/>
<Button
    add={null}
    iconSrc="./underline.png"
    iconAlt="Underline"
    handleClick={underline}
/>
