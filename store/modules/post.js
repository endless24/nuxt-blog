const state = () => ({
  posts: [],
  singlePost: {}
})
const getters = {}

const mutations = {
  SET_POSTS(state, payload) {
    state.posts = payload
  },
  // singlepost
  SET_POST(state, payload) {
    state.singlePost = Object.assign({}, state.singlePost, payload)
  },

  // add new post
  NEW_POST(state, payload) {
    state.posts.push(payload)
  },

  // update post
  UPDATE_POST(state, payload) {
    const index = state.posts.findIndex(post => post.id === payload.id)
    state.posts[index].title = payload.title
    state.posts[index].description = payload.description
  },

  // delete post
  DELETE_POST(state, payload) {
    const index = state.posts.findIndex(post => post.id === payload.id)
    state.posts.splice(index, 1)
  }
}

const actions = {
  setposts({ commit }, payload) {
    commit('SET_POSTS', payload)
  },
  // singlepost
  setPost({ commit }, payload) {
    commit('SET_POST', payload)
  },

  // add new post
  async newPost({ commit }, payload) {
    const { data } = await this.$axios.post('/posts', payload)
    commit('NEW_POST', data)
  },

  // update post
  async updatePost({ commit }, payload) {
    const { data } = await this.$axios.patch(`/posts/${payload.id}`, payload)
    commit('UPDATE_POST', data)
  },

  // delete
  async deletePost({ commit }, payload) {
    await this.$axios.delete(`/posts/${payload.id}`)
    commit('DELETE_POST', payload)
  }
}

const postModule = {
  state,
  getters,
  mutations,
  actions
}
export default postModule
