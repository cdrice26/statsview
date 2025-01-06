<!--A basic button component, with built-in styling and support for +/- before a specified image-->
<script>
  
  /**
   * @typedef {Object} Props
   * @property {any} iconSrc
   * @property {any} iconAlt
   * @property {any} add - If add = true, a + is rendered. If it's false, a - is rendered. If it's null, only the image is rendered.
   * @property {any} [handleClick]
   */

  /** @type {Props} */
  let {
    iconSrc,
    iconAlt,
    add,
    handleClick = () => {}
  } = $props();
</script>

<!--When a button is clicked, it triggers handleClick() which reports back to the main App
    component which creates a new element-->
<button onclick={handleClick}
  ><span
    >{#if add}+{:else if add == false}-{/if}</span
  ><img src={iconSrc} alt={iconAlt} /></button
>

<style>
  button {
    border: none;
    background-color: white;
    color: black;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 20px;
    border-radius: 3px;
    vertical-align: middle;
    display: inline-flex;
    flex-direction: row;
    height: 30px;
    align-items: center;
    justify-content: center;
  }

  button:hover,
  button:focus {
    background-color: lightgrey;
  }

  img {
    position: relative;
    width: 15px;
  }

  span {
    position: relative;
  }
</style>
