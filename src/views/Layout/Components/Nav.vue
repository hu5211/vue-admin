<template>
  <div id="nav-wrap">
    <img src="@/assets/logo.png" alt="logo" />
    <el-menu
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item,index ) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <!-- 一级菜单 -->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span>{{ item.meta.name}}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
          >{{ subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  name: "Nav",
  data() {
    return {
      routers: this.$router.options.routes
    };
  },
  // computed  监听
  // computed: {
  //   ...mapGetters(["isCollapse"])
  // }
  computed: {
    isCollapse() {
      return this.$store.state.app.isCollapse;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $NavMenu;
  height: 100%;
  background-color: #344a5f;
  @include webkit(transition, all 0.3s ease 0s);
  svg {
    font-size: 16px;
    margin-right: 10px;
  }
  .el-menu {
    width: $NavMenu;
  }
  img {
    margin: 20px auto 25px;
    width: 60px;
    height: 60px;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
.open {
  #nav-wrap {
    width: $NavMenu;
  }
}
.close {
  #nav-wrap {
    overflow: hidden;
    width: $NavMenuMin;
    .el-submenu {
      width: $NavMenuMin;
    }
    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>