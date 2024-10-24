<template>
  <div class="">
    <h3 style="margin: 20px; color: tomato;">Edit Post</h3>
    <el-main>
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="Title:" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="Description:" prop="description">
          <el-input v-model="form.description" type="textarea" ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">Update</el-button>
          <el-button @click="resetForm('form')">Cancel</el-button>
        </el-form-item>
      </el-form>

    </el-main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'EditPost',

  async fetch({ error, $axios, params, store }) {
    try {
      const { data } = await $axios.get(`/posts/${params.id}`)
      store.dispatch('setpost', data)
    } catch (err) {
      error({
        statusCode: 500,
        message: 'Ops an error occurred'
      })
    }
  },

  // inserting the value into the field
  created() {
    this.form.title = this.post.title
    this.form.description = this.post.description
  },

  data() {
    return {
      form: {
        title: '',
        description: ''
      },
      rules: {
        title: {
          required: true,
          message: 'Please enter post title',
          trigger: 'blur'
        },
        description: {
          required: true,
          message: 'Please enter post description',
          trigger: 'blur'
        }
      }
    }
  },

  computed: {
    ...mapState({
      post: state => state.post.singlePost
    })
  },

  methods: {
    // form validation
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('updatePost', {
            id: this.post.id,
            title: this.form.title,
            description: this.form.description
          })
          this.$router.push({ path: '/post/postlist' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
</style>
