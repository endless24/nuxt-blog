<template>
  <div>
    <h1 style="margin-top:20px; margin-left:19px; color: tomato;">Details post</h1>
    <div class="">
    <el-main>
      <el-card class="box-card" style="margin-bottom:10px">
        <div slot="header" class="clearfix">
          <span>
            <h3 style="color: tomato;">{{post.title}}</h3>
          </span>
          <el-button style="float: right; padding: 3px 0  " type="text" @click="editPost(post.id)" >
          <button>  Edit</button>
          </el-button>
          <el-button style="float: right; padding: 3px 0;margin-right:10px" type="text" @click="deletePost(post)" >
           <button > Delete</button>
          </el-button>
        </div>
        <p>{{post.description}}</p>
      </el-card>
    </el-main>
  </div>
  </div>
  
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PostDetails',
  // fettching single post details
  async fetch({ store, params, error, $axios }) {
    try {
      const { data } = await $axios.get(`/posts/${params.id}`)
      store.dispatch('setPost', data)
    } catch (err) {
      error({
        statusCode: 500,
        message: "Ops product details can't be viewed right now try again later"
      })
    }
  },
  computed: {
    ...mapState({
      post: state => state.post.singlePost
    })
  },
  // edit post
  methods: {
    editPost(postId) {
      this.$router.push({ path: `/post/${postId}/editpost` })
    },

    // delete post
    deletePost(post) {
      this.$store.dispatch('deletePost', post)
      this.$router.push({ path: `/post/postlist` })
    }
  }
}
</script>

<style>
</style>
