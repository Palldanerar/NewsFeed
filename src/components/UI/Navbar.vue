<template>
  <div class="navbar">
    <div @click="$router.push('/')" style="cursor: pointer">
      <img src="@/assets/logo.png" alt="Vue 3" class="img">
    </div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/post')">Статьи</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/about')">Обратная связь</my-button>
    </div>

  </div>
</template>

<script>
export default {
  name: "MyNavbar",
  components: {}

}
</script>

<style scoped>

.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin-bottom: 20px;
}

.navbar__btns {
  margin-left: auto;
}

.img {
  width: 50px;
  height: 50px;
  margin-top: 5px;
}
</style>