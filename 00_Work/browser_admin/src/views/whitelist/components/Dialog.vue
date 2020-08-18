<template>
  <div>
    <el-dialog
      :title="dialogSetting.title"
      :visible.sync="dialogSetting.visible"
      width="500px"
      @close="closeDialog"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="白名单" :label-width="formLabelWidth" prop="whitelist">
          <el-input v-model="form.whitelist" placeholder="请输入白名单网址"></el-input>
          <span v-show="whitelistIsAvailable" class="show-true">
            <svg-icon icon-class="true" />
          </span>
        </el-form-item>
        <div class="tips">
          1、支持精确匹配。例如：www.baidu.com
          <br />2、支持模糊匹配，可用*代替需要模糊匹配的字段。
          <br />例如：http://*.baidu.com/、https://www.*.com/*
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getWhitelist } from "network/whitelist";

export default {
  name: "WhitelistDialog",
  props: {
    dialogSetting: {
      type: Object,
      default() {
        return {
          title: "白名单配置",
          visible: false
        };
      }
    }
  },
  data() {
    const validateWhitelist = async (rules, value, callback) => {
      if (!value) {
        new callback(new Error("请输入白名单网址"));
        this.whitelistIsAvailable = false;
      } else {
        // 调用后台接口校验网址是否唯一
        try {
          const { data } = await getWhitelist({urlWhite: value});
          if (data.urlWhiteCount > 0) {
            callback(new Error("该网址已有白名单！"));
            this.whitelistIsAvailable = false;
          } else {
            callback();
            this.whitelistIsAvailable = true;
          }
        } catch (e) {
          console.log("validateUrl: error => ", e);
          callback(new Error("白名单网址校验出错，请稍后重试"));
          this.whitelistIsAvailable = false;
        }
      }
    };
    return {
      // form 表单
      form: {
        whitelist: "",
      },
      formLabelWidth: "80px",
      // 表单校验
      rules: {
        whitelist: [{ required: true, trigger: "blur", validator: validateWhitelist }]
      },

      whitelistIsAvailable: false,
    };
  },
  methods: {
    // 关闭对话框
    closeDialog() {
      this.dialogSetting.visible = false;
      this.form = {
        whitelist: "",
      };
      this.whitelistIsAvailable = false;
      this.$refs.form.resetFields();
    },
    handleConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("handleConfirm", this.form);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.generate-params {
  margin-left: 80px;
  cursor: pointer;
  color: #409eff;
}

.show-true {
  position: absolute;
  right: 10px;
  top: 0px;
  font-size: 20px;
  user-select: none;
}

.tips {
  font-size: 12px;
  color: #aaa;
  padding-left: 80px;
  margin-bottom: 5px;
}
</style>