<template>
  <div id="app">
    <h2>info: {{ $store.state.info }}</h2>
    <button @click="updateInfo">修改信息</button>

    <h2>{{ $store.state.counter }}</h2>
    <button @click="add">+</button>
    <button @click="sub">-</button>

    <h2>counter平方：{{$store.getters.powCounter}}</h2>
    <h2>年龄大于20的人： {{ $store.getters.ageHeigh20 }}</h2>
    <h2>年龄大于20的人的数量： {{ $store.getters.ageHeigh20Counts }}</h2>


    <h2>年龄大于18的人： {{ $store.getters.ageHigh(18) }}</h2>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    add(){
      this.$store.commit('increment',1)
    },
    sub(){
      this.$store.commit('decrement',1)
    },
    updateInfo(){
      // this.$store.commit({
      //   type:'updateInfo'
      // })

      this.$store.dispatch('aUpdateInfo','我是携带的参数')
        .then(res => console.log(res))
    }
  }
}
</script>

<style>

</style>
