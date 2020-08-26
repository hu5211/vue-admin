<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#main-wrap {
  height: 100vh;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 20;
  padding-right: 20px;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.open {
  .main-content {
    padding-left: $NavMenu + 20;
  }
}
.close {
  .main-content {
    padding-left: $NavMenuMin + 20;
  }
}
.content {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0 20px;
  background-color: #fff;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
</style>