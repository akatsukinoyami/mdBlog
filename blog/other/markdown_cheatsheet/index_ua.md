## Supported

### Emphasis

```md

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

~~Strikethrough with tildas.~~

Monospaced <samp> with samp html tag</samp>.

Underlined <ins>with ins html tag</ins>.

```

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

~~Strikethrough with tildas.~~

Monospaced <samp> with samp html tag</samp>.

Underlined <ins>with ins html tag</ins>.

### Quotes

```md
> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.
>> You can have blockquotes inside other quote.
>>> And more!

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.
```

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.
>> You can have blockquotes inside other quote.
>>> And more!

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.

### Lists

```md
1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses
```

1. First ordered list item
2. Another item
    * Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
    1. Ordered sub-list
4. And another item.

  You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

* Unordered list can use asterisks
- Or minuses
+ Or pluses

### Horizontal Rule

```md

Three or more...

---

Hyphens

***

Asterisks

___

Underscores
```

Three or more...

---

Hyphens

***

Asterisks

___

Underscores

### Links

```md
[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs in angle brackets will automatically get turned into links.
<http://www.example.com>

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com
```

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs in angle brackets will automatically get turned into links.
<http://www.example.com>

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

### Pictures

```md
Inline-style:
| ![alt text](images/favicon.ico "Logo Title Text 1") |
|:---:|

Reference-style:
![alt text][logo]

[logo]: images/favicon.ico "Logo Title Text 2"
```

|Inline-style: | Reference-style: |
|:---:|:---:|
| ![alt text](images/favicon.ico "Logo Title Text 1") | ![alt text][logo] |

[logo]: images/favicon.ico "Logo Title Text 2"

### Inline HTML

You can also use raw HTML in your Markdown, and it'll mostly work pretty well.

```html
<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>
```

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>

### Code blocks

```md
  ```json
    {
      "name": "Feris",
      "class": "archer",
      "race": "neko"
    }
  -``` (without minus)
```

```json
  {
    "name": "Feris",
    "class": "archer",
    "race": "neko"
  }
```

### Tables

```md
| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |
```

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

```md
| Syntax    | Description |
| ---------:| -----------:|
| Header    | Title       |
| Paragraph | Text        |
```

| Syntax    | Description |
| ---------:| -----------:|
| Header    | Title       |
| Paragraph | Text        |

```md
| Syntax    | Description |
|:---------:|:-----------:|
| Header    | Title       |
| Paragraph | Text        |
```

| Syntax    | Description |
|:---------:|:-----------:|
| Header    | Title       |
| Paragraph | Text        |

### Task List

```md
* [x] Write the press release

* [ ] Update the website

* [ ] Contact the media
```

* [x] Write the press release
* [ ] Update the website
* [ ] Contact the media

## Not supported

### Highlight

```md
I need to highlight these ==very important words==.
```

I need to highlight these ==very important words==.

### Definition Lists

```md
term

: definition1

: definition2
```

term

: definition1

: definition2
