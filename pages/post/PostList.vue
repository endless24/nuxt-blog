<template>
  <div class="">
    <el-main>
      <el-card class="box-card" v-for="post in posts" :key="post.id" style="margin-bottom:10px">
        <div slot="header" class="clearfix">
          <span>
            <h3 style="color: tomato;">{{post.title}}</h3>
          </span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="viewDetails(post.id)" >View Details</el-button>
        </div>
        <p>{{post.description.substr(0,180)}}</p>
      </el-card>
    </el-main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PostList',

  async fetch({ store, $axios, error }) {
    try {
      const { data } = await $axios.get('/posts')
      store.dispatch('setposts', data)
    } catch (err) {
      error({
        statusCode: 500,
        message: 'Ops An error occurred while fetching data'
      })
    }
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts
    })
  },
  methods: {
    // routing Programmatic
    viewDetails(postId) {
      this.$router.push({ path: `/post/${postId}/postDetails` })
    }
  }
}
</script>

<style>
</style>
