<script lang="ts">
  const bigImageClass = 'big-image';
  const noScrollClass = ['noscroll'];
  const modalBackgroundClass = ['modal-background'];
  const closeModalImage = ['bi', 'bi-x-lg', 'close-modal']

  function closeImages() {
    const images = document.getElementsByTagName('img');

    for (let i = 0; i < images.length; i++) {
      images[i].classList.remove(bigImageClass);
    }

    closeBackground();
  }

  function closeBackground() {
    backgroundElements().forEach((elem) => {
      const element = elem[0] as HTMLElement;
      const classes = elem[1] as string[];
      element.classList.remove(...classes)
    })
  }

  function backgroundElements(): Array<Array<HTMLElement | string[]>> {
    return [
      [ document.getElementById('modalBackground'), modalBackgroundClass],
      [ document.getElementsByTagName('body')[0], noScrollClass],
      [ document.getElementById('closeModal'), closeModalImage ],
    ]
  }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="modalBackground" on:click={closeImages}></div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div>
  <i id="closeModal" on:click={closeImages}></i>
</div>
