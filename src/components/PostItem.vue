<template>
  <div class="post">
    <div>
      <div><strong>Название: </strong>{{post.title}}</div>
      <div><strong>Описание: </strong>{{post.body}}</div>
    </div>
    <div>
      <my-button @click="$emit('remove', post)">Удалить</my-button>
    </div>
  </div>

</template>

<script>
export default {
  name: "PostItem.vue",
  props: ['post'],
  methods: {

  }
}
</script>

<style scoped>

.post {
  padding: 15px;
  border: 3px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


</style>