<template>
  <el-dialog
    class="upgrade-dialog"
    :title="dialogSetting.title"
    :visible.sync="dialogSetting.visible"
    width="500px"
    @close="closeDialog"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="策略类型" :label-width="formLabelWidth" prop="strategyType">
        <el-select v-model="form.strategyType" placeholder="请选择策略类型" disabled clearable>
          <el-option v-for="item in strategyList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="策略值" :label-width="formLabelWidth" prop="strategyValue">
        <el-input v-model="form.strategyValue" placeholder="请输入策略值"></el-input>
      </el-form-item>
      <el-form-item label="升级信息" :label-width="formLabelWidth" prop="upgradeInfo">
        <el-input v-model="form.upgradeInfo" type="textarea" placeholder="请输入JSON格式的升级信息"></el-input>
      </el-form-item>
      <el-form-item label="描述信息" :label-width="formLabelWidth" prop="description">
        <el-input v-model="form.description" type="textarea" placeholder="请输入描述信息"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "SingleDialog",
  props: {
    dialogSetting: {
      type: Object,
      default() {
        return {
          title: "新增",
          visible: false,
          isEdit: false
        };
      }
    }
  },
  data() {
    const validateUpgradeInfo = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入升级信息"));
      }
      if (
        !Object.is(Number(value), NaN) ||
        value === "true" ||
        value === "false"
      ) {
        callback(new Error("输入的升级信息不是JSON格式"));
      }
      try {
        JSON.parse(value);
      } catch (e) {
        callback(new Error("输入的升级信息不是JSON格式"));
      }
      callback();
    };
    return {
      // form 表单
      form: {
        strategyType: "stbid",
        strategyValue: "",
        upgradeInfo: "",
        description: ""
      },
      strategyList: ["stbid"],
      formLabelWidth: "80px",
      // 表单校验
      rules: {
        strategyType: [
          { required: true, trigger: "blur", message: "请选择策略类型" }
        ],
        strategyValue: [
          { required: true, trigger: "blur", message: "请输入策略值" }
        ],
        upgradeInfo: [
          { required: true, trigger: "blur", validator: validateUpgradeInfo }
        ],
        description: [
          { required: true, trigger: "blur", message: "请选择描述信息" }
        ]
      }
    };
  },
  methods: {
    closeDialog() {
      this.dialogSetting.visible = false;
      this.form = {
        strategyType: "stbid",
        strategyValue: "",
        upgradeInfo: "",
        description: ""
      };
      this.$refs.form.resetFields();
    },
    handleConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("handleDialogConfirm", this.form);
        }
      });
    }
  }
};
</script>

<style scoped>
.upgrade-dialog >>> .el-select {
  width: 100%;
}
</style>