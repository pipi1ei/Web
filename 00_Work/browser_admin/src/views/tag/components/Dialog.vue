<template>
  <div>
    <el-dialog
      :title="dialogSetting.title"
      :visible.sync="dialogSetting.visible"
      width="500px"
      @close="closeDialog"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="白名单" :label-width="formLabelWidth" prop="urlWhite">
          <el-input v-model="form.urlWhite" placeholder="请输入白名单网址"></el-input>
        </el-form-item>
        <div class="tips">
          1、支持精确匹配。例如：www.baidu.com
          <br />2、支持模糊匹配，可用*代替需要模糊匹配的字段。
          <br />例如：http://*.baidu.com/、https://www.*.com/*
        </div>
        <el-form-item label="打开页" :label-width="formLabelWidth" prop="tagUrl">
          <el-input v-model="form.tagUrl" placeholder="请输入想要打开的页面网址"></el-input>
          <span v-show="tagUrlIsAvailable" class="show-true">
            <svg-icon icon-class="true" />
          </span>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth" prop="tagName">
          <el-input ref="tagName" v-model="form.tagName" placeholder="英文、英文+数字格式"></el-input>
          <span v-show="tagNameIsAvaliable" class="show-true">
            <svg-icon icon-class="true" />
          </span>
        </el-form-item>
        <span class="generate-params" @click.prevent="generateParams">自动生成</span>
        <el-form-item label="说明" :label-width="formLabelWidth" prop="info">
          <el-input v-model="form.info" type="textarea" placeholder="请输入说明信息"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTagList } from "network/tag";

export default {
  name: "TagtDialog",
  props: {
    dialogSetting: {
      type: Object,
      default() {
        return {
          title: "标签配置",
          visible: false
        };
      }
    }
  },
  data() {
    const validateTagUrl = async (rules, value, callback) => {
      if (!value) {
        new callback(new Error("请输入打开页网址"));
        this.tagUrlIsAvailable = false;
      } else {
        // 调用后台接口校验网址是否唯一
        try {
          const { data } = await getTagList({tagUrl: value});
          if (data.tagCount > 0) {
            callback(new Error("已有该网址"));
            this.tagUrlIsAvailable = false;
          } else {
            callback();
            this.tagUrlIsAvailable = true;
          }
        } catch (e) {
          console.log("validateUrl: error => ", e);
          callback(new Error("网址校验出错，请稍后重试"));
          this.tagUrlIsAvailable = false;
        }
      }
    };
    const validateTagName = async (rules, value, callback) => {
      const isNum = /^[0-9]+$/.test(value);                 //校验数字
      const isLetter = /^[a-zA-Z]+$/.test(value);           //校验英文
      const isNumOrLetter = /^[0-9a-zA-Z]+$/.test(value);   //校验数字或英文
      if (!value) {
        new callback(new Error("请输入标签"));
      } else if ((!isNum && isLetter) || (!isNum && isNumOrLetter)) {
        // 调用后台接口校验参数是否唯一
        try {
          const { data } = await getTagList({tagName: value});
          if (data.tagCount > 0) {
            callback(new Error("已有参数，请更换！"));
            this.tagNameIsAvaliable = false;
          } else {
            callback();
            this.tagNameIsAvaliable = true;
          }
        } catch (e) {
          console.log("validateUrl: error => ", e);
          callback(new Error("参数校验出错，请稍后重试"));
        }
      } else {
        new callback(new Error("请输入英文、英文+数字格式"));
      }
    };
    return {
      // form 表单
      form: {
        urlWhite: "",
        tagUrl: "",
        tagName: "",
        info: ""
      },
      formLabelWidth: "80px",
      // 表单校验
      rules: {
        urlWhite: [{ required: true, trigger: "blur", message: "请输入白名单网址" }],
        tagUrl: [
          { required: true, trigger: "blur", validator: validateTagUrl }
        ],
        tagName: [{ required: true, trigger: "blur", validator: validateTagName }]
      },

      tagUrlIsAvailable: false,
      tagNameIsAvaliable: false
    };
  },
  computed: {
    status: {
      get() {
        return this.form.status === "1" ? "可用" : "不可用";
      },
      set(val) {
        this.form.status = val === "可用" ? "1" : "0";
      }
    }
  },
  methods: {
    // 生成网址参数
    async generateParams() {
      let params = "";
      const paramLength = 16;
      const random = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];
      for (let i = 0; i < paramLength; i++) {
        let index = Math.floor(Math.random() * random.length);
        params += random[index];
      }

      // 校验生成的参数名是否唯一
      try {
        const { data } = await getTagList({tagName: params});
        if (data.tagCount > 0) {
          this.generateParams();
        } else {
          this.form.tagName = params;
          this.$nextTick(() => {
          this.$refs.tagName.focus();
        });
        }
      } catch (e) {
        console.log("validateUrl: error => ", e);
      }
    },
    // 关闭对话框
    closeDialog() {
      this.dialogSetting.visible = false;
      this.form = {
        urlWhite: "",
        tagUrl: "",
        tagName: "",
        info: ""
      };
      this.tagUrlIsAvailable = false;
      this.tagNameIsAvaliable = false;
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
  display: inline-block;
  margin-left: 80px;
  cursor: pointer;
  color: #409eff;
  margin-bottom: 5px;
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