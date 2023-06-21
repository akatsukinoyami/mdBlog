<script lang="ts">
    let classes = "ui grid"
    const columnSizes = {
        2: "two column",
        3: "three column",
        4: "four column",
    }
    function columnSizeCorrect(columns: number): boolean {
        return Object.keys(columnSizes).includes(columns.toString())
    }
    function addClass(className: string): void {
        classes += `${classes} ${className}`
    }

    export let
        centered: boolean = false,
        container: boolean = false,
        stackable: boolean = false,
        columns: 0 | 2 | 3 | 4 = 0;


    centered && addClass("centered")
    container && addClass("container")
    stackable && addClass("stackable")
    columns && columnSizeCorrect(columns) && addClass(columnSizes[columns])
</script>

<svelte:head>
    <link rel="stylesheet" type="text/css" href="fomantic/grid.min.css">
</svelte:head>

<div class={classes}>
    <slot />
</div>