<script lang="ts">
  export let text: string, active = false, href = "#";

  $: styles = active
    ? "bg-gray-900 px-3 py-2 text-sm font-medium text-white"
    : "px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
</script>

<a {href} class="rounded-md {styles}">{text}</a>