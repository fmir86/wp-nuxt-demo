/*
this is where we will eventually hold the data for all of our posts
*/
export const state = () => ({
    posts: [],
    error: null
})

/*
this will update the state with the posts
*/
export const mutations = {
    updatePosts: (state, posts) => {
        state.posts = posts
    },
    setError: (state, error) => {
        state.error = error
    }
}


/*
actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
    async getPosts({ state, commit }) {

      if (state.posts.length) return;

      // Base URL of the WordPress site, set through the WP_API_URL env var (see nuxt.config.js)
      const baseUrl = this.$config.wpApiUrl.replace(/\/+$/, '')
      const endpoint = `${baseUrl}/wp-json/wp/v2/posts?page=1&per_page=20&_embed=1`

      try {
        const res = await fetch(endpoint)
        if (!res.ok) {
          throw new Error(`${endpoint} answered with HTTP ${res.status}`)
        }
        let posts = await res.json()
        if (!Array.isArray(posts)) {
          throw new Error(`${endpoint} did not return a list of posts`)
        }

        posts = posts
          .filter(el => el.status === "publish")
          .map(({ id, slug, link, title, excerpt, date, tags, content }) => ({
            id,
            slug,
            link,
            title,
            excerpt,
            date,
            tags,
            content
          }))
        commit("setError", null)
        commit("updatePosts", posts)
      } catch (err) {
        console.error(err)
        commit("setError", `Could not load posts from ${baseUrl} (${err.message}).`)
      }
   }
}
