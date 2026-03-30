# Markdown Syntax Reference

## Grids

Open a grid with `:::N` where N is the number of columns. Close with `:::`.

```md
:::2
Content left column

Content right column
:::
```

Nested grids: use `:::cN` for a cell spanning N columns, `:::rN` for N rows.

```md
:::3
:::c2
This cell spans 2 columns
:::

Single column cell
:::
```

```md
:::3
:::r2
This tall cell spans 2 rows
:::

Top right

Bottom right
:::
```

## Images

Standard image (no span, treated as c1 inside a grid):

```md
![Caption text](+images/photo.jpg)
```

Image spanning N columns:

```md
![c2:Caption text](+images/wide-photo.jpg)
```

Image spanning N rows:

```md
![r2:Caption text](+images/tall-photo.jpg)
```

Images inside `+images/` are served from the compressed WebP directory in economy mode.
External URLs are used as-is.

## Embeds

```md
@[Video title](https://www.youtube.com/embed/VIDEO_ID){aspect-video w-full}
```

Format: `@[Title](url){tailwind classes}`

## Spoilers

```md
||hidden spoiler text||
```

## Definition Lists

Rendered as a 2-column grid (term left, definition right):

```md
Term one
: Definition one

Term two
: Definition two
```

Multiple definitions per term:

```md
Term
: First definition
: Second definition
```
