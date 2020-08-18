<template>
  <div class="view-container">
    <div class="add-user clearfix">
      <el-button type="primary" @click.native.prevent="openDialog(false)">新增账户</el-button>
    </div>

    <!-- 表格部分 -->
    <div class="table-box">
      <div class="table-container">
        <el-table height="100%" :data="tableData" stripe border style="width: 100%" align="center">
          <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
          <el-table-column prop="userName" label="账户名称" align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
          <el-table-column prop="createTime" label="注册时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="280">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="initPassword(scope.row)">初始密码</el-button>
              <el-button size="mini" type="primary" @click="openDialog(true, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteAccount(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paging.pageNum"
        :page-sizes="[10, 20, 30]"
        :page-size="paging.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.total"
      ></el-pagination>
    </div>

    <!-- dialog -->
    <div class="dialog-container">
      <el-dialog
        :title="dialogSetting.title"
        :visible.sync="dialogSetting.visible"
        width="500px"
        @close="closeDialog"
      >
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="账户名称" :label-width="formLabelWidth" prop="userName">
            <el-input v-model="form.userName" autocomplete="off"></el-input>
            <span v-show="accountIsAvailable" class="show-true">
              <svg-icon icon-class="true" />
            </span>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
            <span v-show="phoneNumberIsAvailable" class="show-true">
              <svg-icon icon-class="true" />
            </span>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// mock 数据
// import { tableData } from "./mock";

export default {
  name: "AccountManage",
  data() {
    // 校验账户名
    const validateName = async (rules, value, callback) => {
      if (!value) {
        callback(new Error("请输入账户名称！"));
      } else {
        if (this.dialogSetting.isEdit) {
          //编辑
          callback();
        } else {
          // 调用后台接口判断账户是否唯一
          const data = await this.$store.dispatch(
            "account/checkUserName",
            value
          );
          if (data) {
            callback();
            this.accountIsAvailable = true;
          } else {
            callback(new Error("该名称已注册！"));
            this.accountIsAvailable = false;
          }
        }
      }
    };
    // 校验手机号
    const validatePhoneNumber = async (rules, value, callback) => {
      const phoneNumberReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!value) {
        callback(new Error("请输入手机号！"));
      } else if (!phoneNumberReg.test(value)) {
        new callback(new Error("手机号格式错误！"));
      } else {
        if (this.dialogSetting.isEdit) {
          //编辑
          callback();
        } else {
          // 新增
          // 调用后台接口判断手机号是否唯一
          const data = await this.$store.dispatch(
            "account/checkPhoneNumber",
            value
          );
          if (data) {
            callback();
            this.phoneNumberIsAvailable = true;
          } else {
            callback(new Error("该手机号已注册！"));
            this.phoneNumberIsAvailable = false;
          }
        }
      }
    };
    return {
      // 表格数据
      tableData: [],
      // 分页
      paging: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      // 对话框
      dialogSetting: {
        title: "新增账户",
        visible: false,
        isEdit: false
      },
      // form 表单
      form: {
        userName: "",
        phone: "",
        password: "123456",
        userId: ""
      },
      formLabelWidth: "80px",
      // 表单校验
      rules: {
        userName: [
          { required: true, trigger: "blur", validator: validateName }
        ],
        phone: [
          { required: true, trigger: "blur", validator: validatePhoneNumber }
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }]
      },

      // 账户和手机号是否可用标志
      accountIsAvailable: false,
      phoneNumberIsAvailable: false
    };
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    }
  },
  methods: {
    // 获取账户信息
    async getAccountInfo() {
      const paging = { ...this.paging };

      const { userCount, sysUsers } = await this.$store.dispatch(
        "account/getAccountInfo",
        paging
      );
      this.tableData = sysUsers;
      this.paging.total = userCount;
    },
    // 新增账户
    async newAccount() {
      try {
        await this.$store.dispatch("account/newAccount", this.form);
        this.$message.success("新增成功");
        this.closeDialog();
        this.getAccountInfo();
      } catch (e) {
        this.$message.error("新增失败");
      }
    },
    // 初始化账户密码
    async initPassword(accountInfo) {
      const { userId } = accountInfo;
      this.$confirm("是否初始化密码？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await this.$store.dispatch("account/initPassword", userId);
            this.$message.success(
              this.userId === userId
                ? "密码初始化成功，请重新登录"
                : "密码初始化成功"
            );
            this.getAccountInfo();
            if (this.userId === userId) {
              setTimeout(() => {
                const loading = this.$loading({
                  lock: true,
                  text: "",
                  spinner: "el-icon-loading",
                  background: "rgba(0, 0, 0, 0.7)"
                });
                setTimeout(async () => {
                  await this.$store.dispatch("user/logout");
                  this.$router.replace(
                    `/login?redirect=${this.$route.fullPath}`
                  );
                  loading.close();
                }, 1000);
              }, 1000);
            }
          } catch (e) {
            this.$message.error("初始化密码失败");
          }
        })
        .catch(e => {
          log("取消初始化密码");
        });
    },
    // 编辑账户
    async updateAccount() {
      try {
        const accountInfo = { ...this.form };
        log(accountInfo);
        const { userId } = accountInfo;
        await this.$store.dispatch("account/updateAccount", accountInfo);
        this.$message.success(
          this.userId === userId ? "当前账户信息已更改，请重新登录" : "编辑成功"
        );
        this.closeDialog();
        this.getAccountInfo();
        if (this.userId === userId) {
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
        }
      } catch (e) {
        this.$message.error("编辑失败");
      }
    },
    // 删除账户
    deleteAccount(accountInfo) {
      const { userId } = accountInfo;
      this.$confirm("确认删除？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await this.$store.dispatch("account/deleteAccount", userId);
            this.getAccountInfo();
            this.$message.success("删除成功");
          } catch (err) {
            console.log("删除失败");
            this.$message.error("删除失败！");
          }
        })
        .catch(e => {
          log("取消删除");
        });
    },
    // 每页展示数量改变
    handleSizeChange(pageSize) {
      this.paging.pageSize = pageSize;
      this.getAccountInfo();
    },
    // 页数改变
    handleCurrentChange(pageNum) {
      this.paging.pageNum = pageNum;
      this.getAccountInfo();
    },
    // 打开对话框
    openDialog(isEdit, accountInfo) {
      log(accountInfo);
      this.dialogSetting.isEdit = isEdit;
      if (isEdit) {
        this.dialogSetting.title = "编辑";
        const keys = Object.keys(this.form);
        for (let key of keys) {
          this.form[key] = accountInfo[key];
        }
        this.form.password = "";
      } else {
        this.dialogSetting.title = "新增账户";
      }
      this.dialogSetting.visible = true;
    },
    // 关闭对话框
    closeDialog() {
      this.dialogSetting.visible = false;
      this.form = {
        userName: "",
        phone: "",
        password: "123456",
        userId: ""
      };
      this.accountIsAvailable = false;
      this.phoneNumberIsAvailable = false;
      this.$refs.form.resetFields();
    },
    // 点击 dialog 保存按钮
    handleConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const isEdit = this.dialogSetting.isEdit;
          if (isEdit) {
            // 编辑账户
            this.updateAccount();
          } else {
            // 新增账户
            this.newAccount();
          }
        }
      });
    }
  },
  created() {
    this.getAccountInfo();
  }
};
</script>

<style lang="scss" scoped>
.view-container {
  .add-user {
    margin-bottom: 10px;

    .el-button {
      float: right;
      margin-right: 20px;
    }
  }

  .table-box {
    height: calc(100% - 82px);
  }
}

.show-true {
  position: absolute;
  right: 10px;
  top: 0px;
  font-size: 20px;
  user-select: none;
}
</style>
