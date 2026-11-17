# wp-nuxt-demo

A small Nuxt 2 demo (2021) that uses WordPress as a headless CMS. It reads the latest 20 posts from a WordPress site through the WordPress REST API (`/wp-json/wp/v2/posts`), keeps them in a Vuex store and renders a list of titles and excerpts that link to the original articles. The page is server rendered, and `nuxt generate` bakes the posts into static HTML.

## Requirements

- Node.js 20 or newer (verified on Node 20.20, 22.23 and 24.21)
- npm 9 or newer

Nuxt 2 is end of life. This project stays on its last release (2.18.1), which builds on current Node versions without `NODE_OPTIONS=--openssl-legacy-provider`.

## Configuration

| Variable     | Default                  | Description |
| :----------- | :----------------------- | :---------- |
| `WP_API_URL` | `https://wordpress.org/news` | Base URL of the WordPress site to read posts from. Its REST API must allow anonymous reads. |

The demo originally read from css-tricks.com, which no longer allows anonymous REST API access, so the default is now the WordPress.org news blog. Point `WP_API_URL` at any WordPress site with a public REST API, for example:

```bash
export WP_API_URL=https://wordpress.org/news
```

The value is read when the dev server starts or when `npm run generate` runs, so set it before running either command.

## Install

```bash
npm ci
```

## Run

```bash
# dev server with hot reload at http://localhost:3000
WP_API_URL=https://wordpress.org/news npm run dev

# build, then generate the static site into dist/
npm run build
WP_API_URL=https://wordpress.org/news npm run generate

# serve the generated dist/ folder at http://localhost:3000
npm run start
```

## Project structure

```text
pages/index.vue   post list, loading and error states
store/index.js    Vuex store; the getPosts action calls the WordPress REST API
nuxt.config.js    Nuxt config, including the WP_API_URL runtime setting
```
