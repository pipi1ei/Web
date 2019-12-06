<template>
  <div class="search">
    <search-header @searchMedia='searchMedia'></search-header>

    <search-content ref="content" class="content"></search-content>
  </div>
</template>

<script>
import SearchHeader from 'components/search/children/Header.vue'
import SearchContent from 'components/search/children/Content.vue'

export default {
  name: "search",
  components: {
    SearchHeader,
    SearchContent
  },
  methods: {
    /* 按媒资名称搜索 */
    searchMedia(inputValue){
      const content = this.$refs.content
      content.currentPage = 1
      content.searchName = inputValue
      content.search(content.currentPage,content.pageSize,inputValue)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.search {
  position: relative;
  padding: 20px 50px;
  width: 100%;
  height: 100%;
  // display: flex;
  // flex-direction: column;
  
  display:-webkit-box;
	-webkit-box-orient:vertical;
}
</style>
