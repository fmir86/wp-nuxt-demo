<template>
<div class="posts">
  <main>
    <h2>Posts</h2>
    <p v-if="$fetchState.pending">Loading posts...</p>
    <p v-else-if="error" class="error">{{ error }} Set the WP_API_URL environment variable to a WordPress site with a public REST API (see README).</p>
    <p v-else-if="!posts.length">No posts found.</p>
  <!-- here we loop through the posts -->
    <div class="post" v-for="post in posts" :key="post.id">
      <h3>
      <!-- for each one of them, we’ll render their title, and link off to the original article -->
        <a :href="post.link" target="_blank" rel="noopener">{{ post.title.rendered }}</a>
      </h3>
      <div v-html="post.excerpt.rendered"></div>
      <a :href="post.link" target="_blank" rel="noopener" class="readmore">Read more ⟶</a>
    </div>
  </main>
  </div>
</template>

<script>
  export default {

    computed: {
      posts() {
        return this.$store.state.posts;
      },
      error() {
        return this.$store.state.error;
      },
    },

    // Nuxt's fetch hook is awaited during server rendering and `nuxt generate`,
    // so the posts are in the HTML instead of appearing only after hydration.
    async fetch() {
      await this.$store.dispatch("getPosts");
    },
  };
</script>
