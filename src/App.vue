<template>
  <body>
    <div id="app">
      <router-link class="link" tag="button" :to="'/game'">Game</router-link>
      <router-link class="link" tag="button" :to="'/redraw'">ReDraw</router-link>

      <router-view></router-view>
    </div>
  </body>
</template>

<script>
export default {
  name: "App",

  
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  background: rebeccapurple;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.link {
  color: #fff;
  background-color: rebeccapurple;
  padding: 0.3rem;
}
</style>
