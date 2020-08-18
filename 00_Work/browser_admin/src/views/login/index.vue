<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">电视之窗浏览器管理后台</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="账户名称或手机号"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入账户密码"
          name="password"
          tabindex="2"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="captcha">
        <span class="svg-container" style="position: relative; left: -3px">
          <svg-icon style="font-size: 20px;" icon-class="captcha" />
        </span>
        <el-input
          ref="captcha"
          v-model="loginForm.captcha"
          placeholder="请输入验证码"
          name="captcha"
          tabindex="3"
          @keyup.enter.native="handleLogin"
        />
        <span class="captcha" @click="generateCaptcha" title="点击更换验证码">
          {{ checkCode }}
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;font-size: 16px"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: "login",
  data() {
    const validateCaptcha = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空！"));
      }
      if(value.toLowerCase() !== this.checkCode.toLowerCase()){
        return callback(new Error("验证码错误！"));
      }
      callback();
    }
    return {
      loginForm: {
        username: "",
        password: "",
        captcha: ""
      },
      loginRules: {
        username: [{ required: true, trigger: "blur", message: '账号不能为空！' }],
        password: [{ required: true, trigger: "blur", message: '密码不能为空！' }],
        captcha: [{ required: true, trigger: "blur", validator: validateCaptcha }],
      },
      loading: false,
      passwordType: "password",
      checkCode: "",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    // toggle密码显示
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 生成验证码
    generateCaptcha(){
      let code = ''
      const codeLength = 4
      const random = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G','H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R','S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      for(let i = 0; i < codeLength; i++){
        let index = Math.floor(Math.random() * random.length)
        code += random[index]
      }
      this.checkCode = code
    },
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true;
          try{
            await this.$store.dispatch("user/login", this.loginForm)
            this.$router.push({ path: "/" })
            Message.success("登录成功")
            this.loading = false
          }catch(e){
            console.log("error submit");
            // Message.error(e || '登录失败')
            this.generateCaptcha()
            this.loading = false
            return false
          }
        }
      });
    }
  },
  created() {
    this.generateCaptcha()
  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (caret-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    margin-right: 5px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd,
  .captcha {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>