<script>
  import Plotly from 'plotly.js-dist';

  export let props;
  export let tableBlocks;
  $: sourceBlock = tableBlocks.filter(
    (table) => table.title == props.sources
  )[0];
  $: sourceData = sourceBlock?.content;
  $: console.log(sourceData);
  export let setFocus = (props) => {};

  let plotElement;

  $: if (plotElement) createChart();

  const createChart = () => {
    const data = [
      {
        x: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        y: [65, 59, 80, 81, 56, 55, 40],
        type: 'bar'
      }
    ];

    const layout = {
      title: 'My Bar Chart',
      height: 400,
      width: 600
    };

    // @ts-ignore
    Plotly.newPlot(plotElement, data, layout);
  };

  async function exportChart() {
    const imageOptions = {
      format: 'png',
      width: 600,
      height: 400
    };

    const imgData = await Plotly.toImage(plotElement, imageOptions);
    console.log(imgData); // This is a base64 encoded string that can be used in docx.js

    // You can pass imgData to docx.js to embed it in a Word document
  }
</script>

<button
  type="button"
  aria-label="Interactive plot area"
  on:click={() => setFocus(props)}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setFocus(props);
    }
  }}
  style="border: none; background: none; padding: 0; margin: 0; cursor: pointer;"
>
  <div bind:this={plotElement} />
</button>
