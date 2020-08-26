<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="menu" class="menu" />
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img src="@/assets/user.jpg" alt="logo" />
        <span>{{ username }}</span>
      </div>
      <div class="header-icon pull-right" @click="exit">
        <svg-icon iconClass="exit" class="exit" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  computed: {
    username() {
      return this.$store.state.app.username;
    }
  },
  methods: {
    navMenuState() {
      return this.$store.commit("app/SET_COLLAPSE");
    },
    exit() {
      this.$store.dispatch("app/exit").then(() => {
        this.$router.push({
          name: "login"
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  left: $NavMenu;
  right: 0;
  height: $layoutHeader;
  background-color: #fff;
  border-bottom: 1px #f7f7f7 solid;
  line-height: $layoutHeader;
  @include webkit(box-shadow, 0 0 16px 3px rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
}

.open {
  #header-wrap {
    left: $NavMenu;
  }
}
.close {
  #header-wrap {
    left: $NavMenuMin;
  }
}
.header-icon {
  padding: 0 24px;
  svg {
    margin-bottom: -7px;
    font-size: 20px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 24px;
  border-right: 1px #ededed solid;
  + .header-icon {
    padding: 0 24px;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    margin-top: -15px;
  }
  span {
    padding-left: 46px;
  }
}
</style>