<script>
  export let title;
  export let setTitle = (title) => {};
</script>

<!--Input to edit table title-->
<img src="title.png" alt="Table Title" />:
<input
  id="titleInput"
  type="text"
  bind:value={title}
  on:input={() => setTitle(title)}
/>

<style>
  img {
    position: relative;
    top: 3px;
    width: 15px;
  }
  #titleInput {
    border: 1px solid black;
    border-radius: 3px;
    color: black;
    background-color: white;
    padding: 3px;
    vertical-align: middle;
    box-sizing: border-box;
    height: 25px;
  }
  #titleInput:hover,
  #titleInput:focus {
    background-color: lightgrey;
  }
</style>
