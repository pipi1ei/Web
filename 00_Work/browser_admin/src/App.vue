<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    beforeunloadHandler() {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    }
  },
  created() {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    // 页面刷新时将 vuex 中的数据保存到 sessionStorage 中
    window.addEventListener("beforeunload", this.beforeunloadHandler);
  },
  destroyed() {
    // 在 destroyed 生命周期注销事件，避免造成不必要的消耗
    window.removeEventListener("beforeunload", this.beforeunloadHandler);
  }
};
</script>

<style>
</style>
