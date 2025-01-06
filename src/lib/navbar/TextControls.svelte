<script>
  import AlignControl from './textControls/AlignControl.svelte';
  import ColorControl from './textControls/ColorControl.svelte';
  import FontFamilyControl from './textControls/FontFamilyControl.svelte';
  import FontSizeControl from './textControls/FontSizeControl.svelte';
  import TextDecorationControl from './textControls/TextDecorationControl.svelte';

  let {
    font,
    setFont = (font) => {},
    fontSize,
    setFontSize = (fontSize) => {},
    color,
    setColor = (color) => {},
    align = (align) => {},
    bold = () => {},
    italic = () => {},
    underline = () => {}
  } = $props();
</script>

<!--Text Controls-->
<FontFamilyControl {font} {setFont} />
<FontSizeControl {fontSize} {setFontSize} />
<ColorControl {color} {setColor} />
<AlignControl {align} />
<TextDecorationControl {bold} {italic} {underline} /> |
