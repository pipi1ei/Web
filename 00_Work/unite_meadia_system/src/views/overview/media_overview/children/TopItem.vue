<template>
  <div class="top-item">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div class="content">
      <div class="title">{{title}}</div>
      <div class="number">{{number}}</div>
      <div class="compare" v-show="showCompare">
        <!-- <span v-if="isIncre" class="top-arrow"></span>
        <span v-else class="bottom-arrow"></span> -->
        <span v-if="isIncre" class="value incre">+ {{getValue(value)}}%</span>
        <span v-else-if="isEqual" class="value">{{getValue(value)}}%</span>
        <span v-else class="value reduce">- {{getValue(value)}}%</span>
        <span class="desc">{{desc}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopItem',
  props: {
    // 标题
    title: {
      type: String
    },
    // 数据
    number: {
      type: String
    },
    // 是否显示比较数据
    showCompare: {
      type: Boolean,
      default: false
    },
    // 同比的值
    value: {
      type: String
    },
    // 比较数据的描述
    desc: {
      type: String
    }
  },
  computed: {
    isIncre(){
      return this.value > 0;
    },
    isEqual(){
      return this.value == 0;
    }
  },
  methods: {
    getValue(value){
      return Math.abs(parseInt(value));
    }
  },
}
</script>

<style lang="less" scoped>
.top-item{
  width: 100%;
  min-width: 240px;
  height: 110px;
  background-color: #fff;
  border: 1px solid rgba(235,235,235,1);
  border-radius: 4px;
  padding: 10px;
  padding-top: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  .icon{
    width: 56px;
    height: 56px;
    margin-right: 15px;

    img{
      display: block;
      width: 100%;
    }
  }

  .content{
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .title{
      font-size: 12px;
      color: #989898;
      margin-bottom: 5px;
    }

    .number{
      font-size: 28px;
      color: #000;
      margin-bottom: 5px;
    }

    .compare{
      display: flex;
      height: 15px;
      align-items: center;
      .top-arrow{
        position: relative;
        bottom: 2px;
        border-top: 5px solid transparent;
        border-bottom: 5px solid #418819;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
      }
      .bottom-arrow{
        position: relative;
        top: 3px;
        border-top: 5px solid #f04133;
        border-bottom: 5px solid transparent;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
      }
      .value{
        font-size: 13px;
        margin: 0 5px;
        font-weight: 700;
      }
      .desc{
        color: #989898;
        font-size: 12px;
      }
    }
  }
}

.incre{
  color: #418819;
}
.reduce{
  color: #CF0909;
}

</style>