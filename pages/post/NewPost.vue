<template>
  <div class="">
    <h3 style="margin: 20px; color: tomato;">New Post</h3>
    <el-main>
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="Title:" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="Description:" prop="description">
          <el-input v-model="form.description" type="textarea" ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">Create</el-button>
          <el-button @click="resetForm('form')">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
import { rules } from 'eslint-config-prettier'

export default {
  name: 'NewPost',
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
  methods: {
    // form validation
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('newPost', {
            id: Date.now().toString(),
            title: this.form.title,
            description: this.form.description
          })
          console.log('submited!')
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
