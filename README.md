# Markdown Blog by katsu

Lightweight blog engine based on markdown files.

You can try example on [katsu.moe](https://www.katsu.moe).

## Getting started

### File structure

Place your blog files in structure:

```yaml
blog:
  - category1:
    - index.json         # mandatory
    - index.jpg          # optional, image for card
    - post1:
      - index.json       # mandatory
      - index.md         # mandatory, fallback, often it's english version
      - index_ru.md      # optional
      - index_ua.md      # optional
      - index.jpg        # optional, image for card
      - images:
        - image_01.jpg
        - image_02.jpg
        - image_03.jpg
    - post2:
      - index.json       
      - index.md         
      - index_ru.md
      - index_ua.md
      - index.jpg
      - images:
        - image_01.jpg
        - image_02.jpg
        - image_03.jpg
  - category2:
    - index.json          
    - index.jpg
    - post3:
      - index.json       
      - index.md
      - index_ru.md
      - index_ua.md
      - index.jpg
      - images:
        - image_01.jpg
        - image_02.jpg
        - image_03.jpg
    - post4:
      - index.json       
      - index.md         
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
    "title": "string, mandatory",
    "title_ru": "string, optional",
    "title_ua": "string, optional",
    "date": "string, optional"
  }
```

### Building

#### Install dependencies

```sh
npm install

# OR

yarn install
```

#### Starting up

Application configured to have best results with docker.
Best way for starting up is:

```sh
./blog run
```

Also, if you changed docker configuration, you can ran:

```sh
./blog run recreate
```

#### Build application

You can use normal build

```sh
./blog build
```

Or if you are using [caprover](https://github.com/caprover/caprover), you can generate tar-archive with

```sh
./blog build prod
```


### Thanks

[Svelte](https://github.com/sveltejs/svelte) - used for frontend.

[Showdown](https://github.com/showdownjs/showdown) - library for translation markdown to html.

[Habr link](https://habr.com/ru/companies/ruvds/articles/499278/) - article about assets compression.

[Github link](https://github.com/IshIvan/shakal) - scripts for assets compression.
