<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :class="{'current' : item.current}"
          @click="toggleMent(item)"
          :key="item.id"
        >{{ item.txt }}</li>
      </ul>

      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label for="emalis">邮箱</label>
          <el-input id="emalis" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-show="model === 'register'">
          <label for="passwords">重复密码</label>
          <el-input
            id="passwords"
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label for="code">验证码</label>
          <el-row :gutter="10">
            <el-col :span="14">
              <el-input id="code" v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button
                type="success black"
                @click="getSms()"
                :disabled="codeButtonStatus.status"
              >{{ codeButtonStatus.text }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            class="login-btn black"
            @click="submitForm('ruleForm')"
            :disabled="loginButtonStatus"
          >{{ model==="login" ? "登陆" : "注册"}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from "js-sha1";
import { Message } from "element-ui";
import { GetSms, Register, Login } from "@/api/login.js";
import {
  stripscript,
  validateEmail,
  validatePass,
  validateVCode
} from "@/utils/validate.js";
export default {
  name: "Login",
  data() {
    // 验证用户名
    let validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (validateEmail(value)) {
        callback(new Error("邮箱格式有误"));
      } else {
        callback();
      }
    };
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6至20位数字+字母!"));
      } else {
        callback();
      }
    };

    // 验证重复密码
    let validatePasswords = (rule, value, callback) => {
      if (this.model === "login") {
        callback();
      }
      // 过滤后的数据
      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };

    // 验证验证码
    let validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validateVCode(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { txt: "登陆", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ],
      // 模块值
      model: "login",
      // 登录按钮禁用状态
      loginButtonStatus: true,
      // 验证码按钮状态
      codeButtonStatus: {
        status: false,
        text: "获取验证码"
      },
      // 表单数据
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    toggleMent(data) {
      this.menuTab.forEach(element => {
        element.current = false;
      });
      data.current = true;
      // 修改模块值
      this.model = data.type;
      // 清除表单数据
      this.$refs.ruleForm.resetFields(); // 3.0
    },
    /**
     * 更新按钮状态
     */
    updataButtonStatus(params) {
      this.codeButtonStatus.status = params.status;
      this.codeButtonStatus.text = params.text;
    },

    // 获取验证码
    getSms() {
      // 进行提示
      if (this.ruleForm.username == "") {
        this.$message.error("邮箱不能为空！！");
        return false;
      }
      if (validateEmail(this.ruleForm.username)) {
        this.$message.error("邮箱格式有误，请重新输入！！");
        return false;
      }
      // 获取验证码
      let requestData = {
        username: this.ruleForm.username,
        module: this.model
      };

      // 修改获取验证按钮状态
      this.updataButtonStatus({
        status: true,
        text: "发送中"
      });

      // 延时多长时间
      GetSms(requestData)
        .then(response => {
          let data = response.data;
          this.$message({
            message: data.message,
            type: "success",
            dangerouslyUseHTMLString: true
          });
          // 启用登录或注册按钮
          this.loginButtonStatus = false;
          // 调定时器，倒计时
          this.countDown(60);
        })
        .catch(error => {
          // 启用登录或注册按钮
          this.loginButtonStatus = false;
          this.updataButtonStatus({
            status: false,
            text: "再次获取"
          });
          console.log(error);
        });
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 表单验证通过
        if (valid) {
          // 三元运算
          this.model === "login" ? this.login() : this.register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 登录
     */
    login() {
      let repuestData = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code
      };
      this.$store
        .dispatch("app/login", repuestData)
        .then(response => {
          let data = response.data;
          this.$message({
            message: data.message,
            type: "success"
          });
          // 页面跳转
          this.$router.push({
            name: "Console"
          });
        })
        .catch(error => {});
    },
    /**
     * 注册
     */
    register() {
      let requestData = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code,
        module: "register"
      };
      // 注册接口
      Register(requestData)
        .then(response => {
          let data = response.data;
          this.$message({
            message: data.message,
            type: "success"
          });
          // 模拟注册成功
          this.toggleMenu(menuTab[0]);
          this.clearCountDown();
        })
        .catch(error => {
          // 失败时执行的代码
        });
    },
    /**
     * 倒计时
     */
    countDown(number) {
      // 60 和 0不见了，故意留BUG
      // setTimeout:clearTimeout(变量)  只执行一次
      // setInterval:clearInterval(变量))  不断的执行，需要条件才会停止
      // 判断定时器是否存在，存在则清除
      if (this.timer) {
        clearInterval(this.timer);
      }
      let time = number;
      this.timer = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(this.timer);
          this.updataButtonStatus({
            status: false,
            text: "再次获取"
          });
        } else {
          this.codeButtonStatus.text = `倒计时${time}秒`; // es5 '倒计时' + time + '秒'
        }
      }, 1000);
    },
    /**
     * 清除倒计时
     */
    clearCountDown() {
      // 还原验证码按钮默认状态
      this.updataButtonStatus({
        status: false,
        text: "获取验证码"
      });
      // 清除倒计时
      clearInterval(this.timer);
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  background-color: #212c3e;
  height: 100vh;
}
.login-wrap {
  width: 280px;
  margin: auto;
  padding-top: 80px;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 80px;
    color: #fff;
    padding: 8px 0;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 16px;
  label {
    display: block;
    margin-bottom: 2px;
    color: #fff;
    font-size: 12px;
  }
  .item-form {
    margin-bottom: 10px;
  }
  .black {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 14px;
  }
}
</style>
