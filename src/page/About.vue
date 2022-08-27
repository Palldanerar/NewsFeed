<template>
  <div class="body">
    <div class="text">
      PALLDANERAR
    </div>
    <div class="text_two">
      Простота - залог надежности.
    </div>
    <div class="Links">
      <a href="https://vk.com/palldanerar">
        <img src="@/assets/VK_BW_Compact_Logo.png" title="Связаться со мной через Вконтакте">
      </a>
      <a href="https://t.me/Palldanerar" >
        <img src="@/assets/telegram.png" title="Связаться со мной через Telegram">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyAbout"
}
</script>

<style scoped>
.body {
  margin-top: -50px;
  color: white;
  text-align: center;
  font-family: Bahnschrift;
}

.text {
  font-size: 160px;
  margin-top: 340px;
  background-image: url("@/assets/Wavy Lines (1920x1080).jpg");
  color: transparent;
  -webkit-background-clip: text;
  animation: animate 10s infinite linear;
}

.text_two {
  font-size: 60px;
  margin-top: 10px;
  background-image: url("@/assets/Wavy Lines (1920x1080).jpg");
  color: transparent;
  -webkit-background-clip: text;
  animation: animate 10s infinite linear;
}

.Links {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

img {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

@keyframes animate {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 100% 100%;
  }

  100% {
    background-position: 0 0;
  }
}
</style>