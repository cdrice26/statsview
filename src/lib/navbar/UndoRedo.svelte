<script>
  import Button from './Button.svelte';
  import { onMount, onDestroy } from 'svelte';

  let { undo = () => {}, redo = () => {} } = $props();
  let buttonRef;

  const isMacOS = () => {
    if (navigator.userAgentData && navigator.userAgentData.platform) {
      return navigator.userAgentData.platform.toUpperCase().includes('MAC');
    }
    return navigator.userAgent.toUpperCase().includes('MAC');
  };

  const handleKeydown = (e) => {
    const isMac = isMacOS();
    const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

    if (ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      undo();
    } else if (
      ctrlKey &&
      ((e.shiftKey && e.key.toLowerCase() === 'z') ||
        e.key.toLowerCase() === 'y')
    ) {
      e.preventDefault();
      redo();
    } else if (ctrlKey && e.key === '.') {
      e.preventDefault();
      // Ensure the button is in the DOM and focusable
      if (buttonRef && typeof buttonRef.focus === 'function') {
        buttonRef.focus();
      }
    }
  };

  onMount(() => {
    window.addEventListener('keydown', handleKeydown, true); // use capture phase
  });
  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown, true);
  });
</script>

<!--Undo/Redo Buttons-->
<Button
  ref={(el) => (buttonRef = el)}
  add={null}
  iconSrc="./undo.png"
  iconAlt="Undo"
  handleClick={undo}
  tooltip="Undo"
/>
<Button
  add={null}
  iconSrc="./redo.png"
  iconAlt="Redo"
  handleClick={redo}
  tooltip="Redo"
/>
