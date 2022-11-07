# Markdown Blog by katsu

Lightweight blog engine based on markdown files.

Created using: [Svelte](https://github.com/sveltejs/svelte) and [Showdown](https://github.com/showdownjs/showdown).

You can try example on [katsu.moe](https://www.katsu.moe).

## Getting started

### File structure

Place your blog files in structure:

```
public
  └─blog
  | └─section_01
  | |   └─post_01
  | |   |   | index.md
  | |   |   | image01.jpg
  | |   |   | image02.jpg
  | |   |   | image03.jpg
  | |   |
  | |   └─post_02
  | |       | index.md
  | |       | image01.jpg
  | |       | image02.jpg
  | |       | image03.jpg
  | |
  | └─section_02
  |     └─post_03
  |     |   | index.md
  |     |   | image01.jpg
  |     |   | image02.jpg
  |     |   | image03.jpg
  |     |
  |     └─ post_04
  |         | index.md
  |         | image01.jpg
  |         | image02.jpg
  |         | image03.jpg
  └─page
    | index.md  <-- mandatory page
    | some_intresting_page_01.md
    | some_intresting_page_02.md
    | some_intresting_page_03.md
```

You can have some markdown pages, that are not blog posts. Place them in **public/page**.
Also, you must create **public/page/index.md**. (Will be fixed soon)

### Building

#### Install dependencies

```sh
npm install
```

or

```sh
yarn install
```

#### Starting up

Application configured to have best results with docker.
Best way for starting up is:

```sh
yarn start:docker
```

Also, if you changed docker configuration, you can ran:

```sh
yarn start:docker:recreate
```

#### Build application

You can use normal build

```sh
yarn build
```

Or if you are using [caprover](https://github.com/caprover/caprover), you can generate tar-archive with

```sh
yarn build:prod
```
