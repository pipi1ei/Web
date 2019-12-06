<template>
<div class="details-item">
  <div class="d-title">
    <slot name="title"></slot>
  </div>
  <div class="d-content">
    <slot name="left"></slot>
    <slot name="right"></slot>
  </div>

  <slot name="introduction"></slot>
</div>
</template>

<script>
  export default {
    name: "DetailsItem",
  };
</script>

<style lang="less">
  .details-item{
    width: 50%;
    height: 100%;
    padding: 10px;
    flex: 1;
    background-color: rgb(236, 230, 230);
  }

  .d-title{
    text-align: center;
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
    border-bottom: 2px solid rgb(44, 43, 43);
  }

  .d-content{
    width: 100%;
    height: 40%;
    display: flex;
    color: black;

    .left{
      width: 150px;
      // min-width: 150px;
      padding-right: 10px;
      margin: auto 0;
      position: relative;

      .left-content{
        width: 100%;
        height: 100%;
        position: relative;

        img{
          width: 100%;
          height: 100%;
        }

        .hot-value{
          position: absolute;
          top: 10px;
          left: 3px;
          font-size: 12px;
          z-index: 100;
          color: #fff;
          font-weight: 600;
        }

        .hot-style{
          position: absolute;
          top: 0;
          left: 0;
          width: 10px;
          height: 10px;
          border-top: 50px solid red;
          border-right: 60px solid transparent;
        }

        .grade{
          position: absolute;
          left: 0;
          bottom: 0;
          background-color: red;
          width: 40px;
          height: 20px;
          line-height: 20px;
          color: #fff;
          text-align: center;
        }
      }
    }

    .right{
      flex: 1;
      padding: 10px 0;
      display: flex;
      flex-direction: column;

      .item{
        flex: 1;
        padding: 5px;
        // border: 1px solid #ccc;
        font-size: 12px;
      }

      .slot{
        display: flex;

        .lan,
        .area{
          width: 50%;
        }
      }

      .name{
        text-align: center;
        font-size: 14px;
        font-weight: 600;
      }

    }
  }

  .introduction{
    width: 100%;
    height: 50%;
    padding: 10px;
    border: 1px solid #ccc;
    margin-top: 20px;
    color: black;
  }
</style>
