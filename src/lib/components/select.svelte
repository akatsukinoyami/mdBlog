<script lang="ts">
  import { clickOutside } from "$lib/utils";
  import Icon from "./icon.svelte";

  interface Props extends Record<string, unknown> {
    options: Record<string, any>;
    label?: string;
    selectedId?: string;
    open?: boolean;
    onchange?: (id: string) => void;
  };

  let {
    label,
    options = [],
    selectedId = $bindable(''),
    open = $bindable(false),
    onchange = () => {}
  }: Props = $props();
</script>

<div use:clickOutside onclick_outside={() => open = false}>
  <label id="listbox-label" class="block text-sm/6 font-medium">
    {label}
  </label>
  <div class="relative mt-2">
    <button type="button" class="grid w-full cursor-default grid-cols-1 rounded-md bg-white dark:bg-gray-400 py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" onclick={() => open = !open}>
      <span class="col-start-1 row-start-1 truncate pr-6">{options[selectedId]}</span>
      <Icon
        class="col-start-1 row-start-1 size-5 self-center justify-self-end sm:size-4"
        size={16}
        path="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
      />
    </button>

    <!--
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
    {#if open}
      <ul 
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-400 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm" 
        tabindex="-1" 
        role="listbox" 
        aria-labelledby="listbox-label" 
        aria-activedescendant="listbox-option-3">
        <!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Highlighted: "bg-indigo-600 text-white outline-hidden", Not Highlighted: "text-gray-900"
        -->
        {#each Object.entries(options) as [id, value]}
          {@const selected = id === selectedId}
          <li 
            class="relative cursor-default py-2 pr-4 pl-8 text-gray-900 select-none" 
            id="listbox-option-{id}" 
            role="option" 
            aria-selected={selected}
            onclick={() => {
              onchange(id);
              selectedId = id;
            }}
          >
            <span class={["block truncate", selected ? "font-semibold" : "font-normal"]}>{value}</span>

            {#if selected}
              <span class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                </svg>
              </span>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
