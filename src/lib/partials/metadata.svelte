<script lang="ts">
  import { toast } from 'svelte-sonner';
  import { mdiEye, mdiHeart, mdiShare } from '@mdi/js';
  import Icon from '$lib/components/icon.svelte';
  import i18n from '$lib/i18n';
  import { lang, title } from '$lib/stores';
  import { url } from '$lib/utils';
  import type { UUID } from 'crypto';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Counts, Entity } from '$lib/types';

	let { entity }: { entity: Entity } = $props();
  let metadata = $state<Counts | undefined>();
  let t = $derived(i18n($lang));

  async function action(postId: UUID | undefined, type: keyof Counts) {
		if (!postId) return;
    const variables = sessionStorage.getItem(`${postId}/${type}`) === 'true'
      ? { post_id: postId }
      : { post_id: postId, type };

    sessionStorage.setItem(`${postId}/${type}`, 'true');

		fetch(url(['api', 'post'], variables))
			.then(res => res.json())
      .then(json => {
        metadata = json?.message === 'Internal Error'
          ? undefined
          : json
      })
      .catch(error => toast.error(error));
	}

  async function share(postId: UUID | undefined) {
		if (!postId) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${t('title.app')} - ${$title}`,
          text: entity?.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Ошибка при шаринге:', err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.info('Ссылка скопирована');
    }

    action(postId, 'share');
  }

  $effect(() => { action(entity?.id, 'view') })

  const buttons = $derived<[Partial<HTMLButtonAttributes>, string, number | undefined][]>([
    [{ disabled: true }, mdiEye, metadata?.view],
    [{ onclick() { share(entity?.id) } }, mdiShare, metadata?.share],
    [{ onclick() { action(entity?.id, 'like') } }, mdiHeart, metadata?.like],
  ]);
</script>

{#if metadata} 
  <div class="flex justify-end gap-8 w-full">
    {#each buttons as [props, path, count], i}
      <button class={["flex gap-2 opacity-50", i ? "hover:opacity-100 cursor-pointer" : '']} {...props}>
        <Icon {path} />{count ?? 0}
      </button>
    {/each}
  </div>
{/if}
