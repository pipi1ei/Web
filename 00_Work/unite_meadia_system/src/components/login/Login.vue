<template>
  <div class="login-container">
    <img src="~assets/images/login/login-bg.jpg" class="bg">
    <div class="login-box">
      <h1 class="title">安徽移动媒资管理后台</h1>
      <!-- 登录表单 -->
      <el-form
        ref="loginFormRef"
        :model="formData"
        :rules="loginRules"
        label-width="0px"
        class="login-form"
      >
        <!-- 用户名 -->
        <el-form-item prop="userName" style="margin-bottom: 27px">
          <!-- <i class="login-icon icon-user"></i> -->
          <el-input prefix-icon="el-icon-user" v-model="formData.userName" placeholder="请输入账号" style="height: 100%">
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" style="margin-bottom: 47px">
          <!-- <i class="login-icon icon-password"></i> -->
          <el-input
            prefix-icon="el-icon-lock"
            v-model="formData.password"
            placeholder="请输入密码"
            type="password"
            style="height: 100%"
            @keyup.enter.native="handleLogin('loginFormRef')"
          >
          </el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button round style="margin: 0 30px;" type="primary" @click="handleLogin('loginFormRef')">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "network/login.js";

export default {
  name: "Login",
  data() {
    const validateUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      callback();
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      callback();
    };
    return {
      // 登录表单数据
      formData: {
        userName: "",
        password: ""
      },
      // 表单验证规则
      loginRules: {
        userName: [
          { required: true, trigger: "change", validator: validateUserName }
        ],
        password: [
          { required: true, trigger: "change", validator: validatePassword }
        ]
      }
    };
  },
  methods: {
    handleLogin(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 表单验证通过，发起 axios 请求
          login(this.formData.userName, this.formData.password).then(res => {
            log('登录验证：',res);
            this.$store.commit('updateUserInfo',res.data);
            window.sessionStorage.setItem('userInfo', res.data);
            this.$router.push('/layout');
            this.$Message.success('登录成功');
          })
          .catch(err => {
            console.log('登录错误：err =>',err);
          })
        }
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  height: 100%;
  overflow-y: hidden;
}

.login-container .bg{
  width: 100%;
  display: block;
}

/* 登录盒子 */
.login-box {
  width: 30.94%;
  width: 396px;
  height: 65.74%;
  height: 473px;
  border-radius: 10px;
  position: absolute;
  right: 7.81%;
  top: 13.89%;
  background:rgba(255,255,255,1);
   box-shadow:0px 0px 24px 0px rgba(0,82,149,0.2);
}

/* 标题 */
.login-box .title{
  text-align: center;
  position: absolute;
  top: 14.79%;
  left: 0;
  right: 0;
  font-size: 2em;
  font-weight:bold;
  color: #001529;
  line-height: 1;
}

.login-form {
  position: absolute;
  top: 30.28%;
  width: 100%;
  padding: 0 30px;
}

.login-form .login-icon{
  width: 30px;
  height: 30px;
  position: absolute;
  left: 15px;
  top: 13px;
  z-index: 10000;
}

.login-form >>> .el-input__icon{
  /* width: 30px;
  height: 30px;
  position: absolute;
  left: 15px;
  top: 13px;
  z-index: 10000; */
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form >>> .el-input__icon::before{
  font-size: 20px;
}

.login-form .icon-user{
  background: url("../../assets/images/login/icon-user.png") no-repeat;
  background-size: 100% 100%;
}

.login-form .icon-password{
  background: url("../../assets/images/login/icon-password.png") no-repeat;
  background-size: 100% 100%;
}

.login-form >>> .el-form-item__content{
  height: 55px;
}

.login-form >>> .el-input__inner{
  height: 100%;
  padding: 0 40px;
  font-size: 18px;
}

.btns >>> .el-form-item__content{
  width: 100%;
  display: flex;
  justify-content: center;
}

.btns >>> .el-button{
  width: 50.17%;
  height: 100%;
  border-radius: 27px;
  font-size: 18px;
  box-shadow: 0px 0px 17px 0px rgba(0,82,149,0.2);
}
</style>