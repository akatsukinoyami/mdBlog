<script lang="ts">
	import { mdiUnfoldMoreHorizontal } from '@mdi/js';
	import { type Snippet } from 'svelte';
	import i from '$lib/icons';
	import { type Class } from '$lib/types';
	import { classMerger, clickOutside } from '$lib/utils';
	import Icon from './icon.svelte';

	interface Props extends Record<string, unknown> {
		options: Record<string, any>;
		label?: string;
		selectedId?: string;
		open?: boolean;
		class?: Class;
		inline?: boolean;
		compact?: boolean;
		onchange?: (id: string) => void;
		peroption?: Snippet<[id: string, selected: boolean]>;
	}

	let {
		label,
		options = [],
		selectedId = $bindable(''),
		open = $bindable(false),
		class: className = '',
		inline = false,
		compact = false,
		onchange = () => {},
		peroption
	}: Props = $props();
</script>

<custom-select
  class={classMerger(className, { "flex gap-3 items-center": inline })}
  use:clickOutside={() => (open = false)}
>
  <span id="listbox-{label}" class="block text-sm/6 font-medium text-nowrap">
    {label}
  </span>
  <div class="relative" class:w-full={!compact}>
    <button
      class="w-full cursor-default flex justify-between rounded-xl bg-white/90 dark:bg-gray-900/90 py-1.5 pr-2 pl-3 text-left outline-1 -outline-offset-1 outline-gray-300/50 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      class:w-full={!compact}
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
      onclick={() => (open = !open)}
    >
      <span class="col-start-1 row-start-1 truncate pr-6"
        >{options[selectedId]}</span
      >
      <Icon path={mdiUnfoldMoreHorizontal} />
    </button>
    <ul
      class={classMerger(
        "absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white dark:bg-gray-400 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm",
        open ? "block" : "hidden",
        { "w-full": !compact },
      )}
      tabindex="-1"
      role="listbox"
      aria-labelledby="listbox-label"
      aria-activedescendant="listbox-option-3"
    >
      <!--
        Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

        Highlighted: "bg-indigo-600 text-white outline-hidden", Not Highlighted: "text-gray-900"
      -->
      {#each Object.entries(options) as [id, value]}
        {@const selected = id === selectedId}
        <li
          class="relative flex justify-between cursor-default py-2 pr-4 pl-8 select-none"
          id="listbox-option-{id}"
          role="option"
          aria-selected={selected}
          onclick={() => {
            onchange(id);
            selectedId = id;
          }}
        >
          {#if selected}
            <span
              class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600"
            >
              <Icon path={i.checkmark} fill="currentColor" />
            </span>
          {/if}

          <span
            class={[
              "block truncate",
              selected ? "font-semibold" : "font-normal",
            ]}>{value}</span
          >

          {@render peroption?.(id, selected)}
        </li>
      {/each}
    </ul>
  </div>
</custom-select>
