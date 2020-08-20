<template>
  <el-main>
    <el-table :data="tableData" style="width: 100%;" class="table">
      <el-table-column prop="prop" label="属性" width="240" align="center"></el-table-column>
      <el-table-column label="值" show-overflow-tooltip>
         <template slot-scope="scope">
          <img v-if="showtTumbnails(scope.row)" class="thumbnails" :src="scope.row.value" alt="">
          <span v-else>{{scope.row.value}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否完整" width="240" align="center">
        <template slot-scope="scope">
          <img v-if="scope.row.completeness" src="~/assets/images/manage/true.png" alt="">
          <img v-else src="~/assets/images/manage/false.png" alt="">
        </template>
      </el-table-column>
      <el-table-column label="是否有效" width="240" align="center">
        <template slot-scope="scope">
          <img v-if="scope.row.effectiveness" src="~/assets/images/manage/true.png" alt="">
          <img v-else src="~/assets/images/manage/false.png" alt="">
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import {arr2string} from 'utils/utils';

export default {
  name: "MediaDetailsContent",
  props: {
    contentData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    getDate(strDate) {
      if (strDate) {
        let date = strDate.split(".");
        return date[0];
      }
      return "空";
    },
    contain(filed, filed2) {
      return filed.indexOf(filed2) == -1;
    },
    showtTumbnails(row){
      return row.prop=='海报' && row.value!='空' && row.value!='';
    }
  },
  computed: {
    tableData() {
      let data = this.contentData;
      let tableData = [
        {
          prop: "名称",
          value: data.name,
          completeness: this.contain(data.noCompleField, "name"),
          effectiveness: this.contain(data.noEfficField, "name")
        },
        {
          prop: "类型",
          value: arr2string(data.category),
          completeness: this.contain(data.noCompleField, "category"),
          effectiveness: this.contain(data.noEfficField, "category")
        },
        {
          prop: "导演",
          value: arr2string(data.director),
          completeness: this.contain(data.noCompleField, "director"),
          effectiveness: this.contain(data.noEfficField, "director")
        },
        {
          prop: "演员",
          value: arr2string(data.actor),
          completeness: this.contain(data.noCompleField, "actor"),
          effectiveness: this.contain(data.noEfficField, "actor")
        },
        {
          prop: "上映时间",
          value: this.getDate(data.releaseDate),
          completeness: this.contain(data.noCompleField, "releaseDate"),
          effectiveness: this.contain(data.noEfficField, "releaseDate")
        },
        {
          prop: "语言",
          value: arr2string(data.language),
          completeness: this.contain(data.noCompleField, "language"),
          effectiveness: this.contain(data.noEfficField, "language")
        },
        {
          prop: "分类",
          value: arr2string(data.type),
          completeness: this.contain(data.noCompleField, "type"),
          effectiveness: this.contain(data.noEfficField, "type")
        },
        {
          prop: "评分",
          value: data.grade || '空',
          completeness: this.contain(data.noCompleField, "grade"),
          effectiveness: this.contain(data.noEfficField, "grade")
        },
        {
          prop: "地区",
          value: arr2string(data.region),
          completeness: this.contain(data.noCompleField, "region"),
          effectiveness: this.contain(data.noEfficField, "region")
        },
        {
          prop: "海报",
          value: data.thumbnails || '空',
          completeness: this.contain(data.noCompleField, "thumbnails"),
          effectiveness: this.contain(data.noEfficField, "thumbnails")
        },
      ];
      return tableData;
    },
  }
};
</script>

<style scoped>
.grid-content {
  height: 100%;
}
.el-main {
  padding: 10px 10px 30px 10px;
  background-color: rgba(240, 242, 245, 1);
}
.el-table {
  width: 100%;
}
.el-table >>> .cell {
  color: black;
}
.el-row {
  margin: 0 !important;
  display: flex;
  padding: 20px 0;
  align-items: center;
}

.thumbnails{
  display: inline-block;
  width: 60px;
  height: 80px;
}
</style>