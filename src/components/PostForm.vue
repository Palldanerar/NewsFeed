<template>
  <form @submit.prevent>
    <h3>Опубликовать статью</h3>
    <my-input placeholder="Название статьи..." v-model="post.title"></my-input>
    <my-input placeholder="Описание статьи..." v-model="post.body"></my-input>
    <p class="danger" v-if="emptyField">Поля не могут быть пустыми!</p>
    <my-button style="align-self: flex-end; margin-top: 15px; margin-bottom: 20px;" class="btn" @click="createPost">Опубликовать статью</my-button>
  </form>
</template>

<script>
export default {
  name: "PostForm.vue",
  data() {
    return {
      post: {
        title: '',
        body: ''
      },
      emptyField: false
    }
  },
  methods: {
    createPost() {
      if (this.post.title.length !== 0 && this.post.body.length !== 0) {
        this.post.id = Date.now()
        this.$emit('create', this.post)
        this.emptyField = false
        this.post = {
          title: '',
          body: ''
        }
      } else {
        this.emptyField = true
      }
    }
  }
}
</script>

<style scoped>

.danger {
  font-size: 17px;
  margin-top: 10px;
  color: red;
}
form {
  display: flex;
  flex-direction: column;
}

</style>