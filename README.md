# Markdown Blog by katsu

Lightweight blog engine based on markdown files.

You can try example on [katsu.moe](https://www.katsu.moe).

## Getting started

### File structure

Place your blog files in structure:

```yaml

# index.json mandatory file for every entity
blog:
  - index.json   

   # root page in different languages       
  - index_en.md         
  - index_ru.md      
  - index_ua.md       

  # Section with children posts
  - category1:          
    - index.json         
    - index.jpg          
    - post1:
      - index.json       
      - index_en.md      
      - index_ru.md      
      - index_ua.md      
      - index.jpg        
      - images:
        - image_01.jpg
        - image_02.jpg
        - image_03.jpg

  # Section that have post in itself and children posts
  - category2:          
    - index.json         
    - index.jpg          
    - index_en.md      
    - index_ru.md      
    - index_ua.md 
    - post2:
      - index.json       
      - index_en.md      
      - index_ru.md      
      - index_ua.md      
      - index.jpg        
      - images:
        - image_01.jpg
        - image_02.jpg
        - image_03.jpg

  # Post in the root of blog
  - post3:
    - index.json       
    - index_en.md      
    - index_ru.md      
    - index_ua.md      
    - index.jpg        
    - images:
      - image_01.jpg
      - image_02.jpg
      - image_03.jpg
```

##### index.json Schema

```json
  {
    "title": {
      "en": "string",
      "ru": "string",
      "ua": "string"
    },
    "post": "boolean", // true if have "index_{en, ru, ua}.md"
    "date": "string"
  }
```

### Building

#### Install dependencies

```sh
yarn
```

#### Starting up

For local startup use:

```sh
yarn dev 
```

#### Build application

You can use normal build

```sh
yarn build
```

Or if you are using [caprover](https://github.com/caprover/caprover), you can generate tar-archive with

```sh
yarn caprover:build
```

### Thanks

[Svelte](https://svelte.dev) [GitHub](https://github.com/sveltejs/svelte) - used for frontend.

[Carbon Components Svelte](https://carbon-components-svelte.onrender.com) [GitHub](https://github.com/carbon-design-system/carbon-components-svelte) - styling framework.

[Sharp](https://sharp.pixelplumbing.com) [GitHub](https://github.com/lovell/sharp) - awesome tool for image processing.

[Showdown](https://github.com/showdownjs/showdown) - library for translation markdown to html.
