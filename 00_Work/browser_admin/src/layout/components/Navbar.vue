<template>
  <div class="navbar">
    <!-- 菜单折叠按钮 -->
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- 面包屑导航 -->
    <breadcrumb class="breadcrumb-container" />

    <!-- 右侧下拉菜单那 -->
    <div class="right-menu">
      <el-dropdown class="name-container">
        <div class="name-wrapper">
          {{ name }}，你好
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item v-if="roles && roles.includes('1')" @click.native="manageAccount">
            <span style="display:block;">账号管理</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="openDialog">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="dialog">
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px" @close="closeDialog">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldPassword">
            <el-input v-model="form.oldPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
            <el-input v-model="form.newPassword" type="password"></el-input>
          </el-form-item>
          <div class="password-tips">
            长度为8-14个字符
            <br />字母、数字、标点符号至少包含两种
            <br />不允许有空格、中文
          </div>
          <el-form-item label="确认密码" :label-width="formLabelWidth" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="updatePassword">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

import { Message } from "element-ui";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    const validateOldPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("旧密码不能为空！"));
      } else if (this.$md5(value) !== this.password) {
        return callback(new Error("旧密码错误！"));
      }
      callback();
    };
    const validateNewPassword = (rule, value, callback) => {
      const validateLength = value.length >= 8 && value.length <= 14;
      if (!value) {
        return callback(new Error("新密码不能为空！"));
      } else if (value === this.password) {
        return callback(new Error("新密码不能和旧密码相同！"));
      } else if (!validateLength) {
        return callback(new Error("长度要为8-14个字符！"));
      } else if (/^[0-9]{8,14}$/.test(value)) {
        return callback(new Error("密码不能全为数字！"));
      } else if (/^[a-zA-Z]{8,14}$/.test(value)) {
        return callback(new Error("密码不能全为字母！"));
      } else if (/^[^0-9a-zA-Z]{8,14}$/.test(value)) {
        return callback(new Error("密码不能全为特殊符号！"));
      } else if (/[\u4E00-\u9FA5\s]/g.test(value)) {
        return callback(new Error("密码包含空格或中文！"));
      }
      callback();
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.form.newPassword) {
        return callback(new Error("两次输入密码不一致！"));
      }
      callback();
    };
    return {
      dialogFormVisible: false,
      form: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      formLabelWidth: "80px",
      rules: {
        oldPassword: [
          { required: true, trigger: "blur", validator: validateOldPassword }
        ],
        newPassword: [
          { required: true, trigger: "blur", validator: validateNewPassword }
        ],
        confirmPassword: [
          {
            required: true,
            trigger: "blur",
            validator: validateConfirmPassword
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["sidebar", "name", "password", "roles", "userId"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    // 账号管理
    manageAccount() {
      this.$router.push(`/account`);
    },
    // 打开修改密码对话框
    openDialog() {
      this.dialogFormVisible = true;
    },
    // 退出登录
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.replace(`/login?redirect=${this.$route.fullPath}`);
    },
    // 修改密码
    updatePassword() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 修改密码
          try {
            await this.$store.dispatch("user/updatePassword", {
              userId: this.userId,
              password: this.password,
              newPassword: this.form.newPassword
            });
            Message.success("密码修改成功，请重新登录");
            this.closeDialog();
            setTimeout(() => {
              const loading = this.$loading({
                lock: true,
                text: "",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
              });
              setTimeout(async () => {
                await this.$store.dispatch("user/logout");
                this.$router.replace(`/login?redirect=${this.$route.fullPath}`);
                loading.close();
              }, 1000);
            }, 1000);
          } catch (e) {
            Message.error(e || "修改密码失败!");
          }
        }
      });
    },
    /* 关闭弹出框 */
    closeDialog() {
      this.dialogFormVisible = false;
      this.form = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      };
      this.$refs.form.resetFields()
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .name-container {
      margin-right: 30px;
      cursor: pointer;
      .name-wrapper {
        position: relative;
      }
    }
  }

  .password-tips {
    color: #aaa;
    padding-left: 80px;
    margin-bottom: 5px;
  }
}
</style>