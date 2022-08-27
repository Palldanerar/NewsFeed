<template>
  <h3>{{heading}}</h3>
  <transition-group name="post-list">
    <post-item
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @editor="$emit('editor', post)"
        @remove="$emit('remove', post)"
    ></post-item>
  </transition-group>
</template>

<script>
import postItem from "@/components/PostItem";

export default {
  name: "PostList.vue",
  props: ['posts', 'heading'],
  components: {postItem},
}
</script>

<style scoped>

.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-move {
  transition: transform 0.4s ease;
}
</style>