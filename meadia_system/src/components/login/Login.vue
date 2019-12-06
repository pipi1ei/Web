<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar-box">
        <img src="~assets/images/login/login_logo.png" alt />
      </div>
      <!-- 登录表单 -->
      <el-form
        ref="loginFormRef"
        :model="formData"
        :rules="loginRules"
        label-width="0px"
        class="login-form"
      >
        <!-- 用户名 -->
        <el-form-item prop="userName">
          <el-input v-model="formData.userName" placeholder="请输入用户名">
            <i slot="prefix" class="el-input__icon el-icon-s-custom"></i>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            type="password"
            @keyup.enter.native="handleLogin('loginFormRef')"
          >
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button style="margin: 0 30px;" type="primary" @click="handleLogin('loginFormRef')">登录</el-button>
          <el-button style="margin: 0 30px;" type="info" @click="resetForm('loginFormRef')">重置</el-button>
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
          { required: true, trigger: "blur", validator: validateUserName }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
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
            console.log(res)
            console.log(res.data.provideId)
            this.$store.commit('updateProvideId',res.data.provideId)
            window.sessionStorage.setItem('provideId', res.data.provideId)
            this.$router.push('/home')
            this.$Message.success('登录成功')
          })
          .catch(err => {
            console.log(err)
          })

          // that.$router.push("/home");
        }
      });
    },
    /* 重置表单 */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
}

// 登录盒子
.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  // 头像样式
  .avatar-box {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #ddd;
    padding: 5px;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login-form {
  position: absolute;
  bottom: 25px;
  width: 100%;
  padding: 0 30px;
}

.btns {
  display: flex;
  justify-content: center;
}
</style>