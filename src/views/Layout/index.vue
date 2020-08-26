<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'open']">
    <LayourHerder />
    <LayourMain />
    <LayourNav />
  </div>
</template>

<script>
import LayourHerder from "./Components/Header.vue";
import LayourMain from "./Components/Main.vue";
import LayourNav from "./Components/Nav.vue";
export default {
  name: "Layout",
  components: { LayourHerder, LayourMain, LayourNav },
  data() {
    return {};
  },
  // computed  监听
  computed: {
    menuStatus() {
      return this.$store.state.app.isCollapse;
    }
  }
};
</script>

<style lang="scss" scoped>
#layout {
  background: #f1f1f1;
}
</style>