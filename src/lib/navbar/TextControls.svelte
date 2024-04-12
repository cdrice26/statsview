<script>
    import AlignControl from './textControls/AlignControl.svelte';
    import ColorControl from './textControls/ColorControl.svelte';
    import FontFamilyControl from './textControls/FontFamilyControl.svelte';
    import FontSizeControl from './textControls/FontSizeControl.svelte';
    import TextDecorationControl from './textControls/TextDecorationControl.svelte';

    export let font;
    export let setFont = (font) => {};

    export let fontSize;
    export let setFontSize = (fontSize) => {};

    export let color;
    export let setColor = (color) => {};

    export let align = (align) => {};

    export let bold = () => {};
    export let italic = () => {};
    export let underline = () => {};
</script>

<!--Text Controls-->
<FontFamilyControl {font} {setFont} />
<FontSizeControl {fontSize} {setFontSize} />
<ColorControl {color} {setColor} />
<AlignControl {align} />
<TextDecorationControl {bold} {italic} {underline} /> |
