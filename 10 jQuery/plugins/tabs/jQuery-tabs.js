(function($){

  /**
   * 给 $ 原型添加tabs方法，用于tab栏切换
   * @param option.tabHeads       需要注册是按的页签选择器
   * @param option.tabHeadsClass  触发事件的页面要添加的类
   * @param option.tabBodys       要显示页面的选择器
   * @param option.tabBodysClass  索引一直要显示的页面要添加的类
   */
  $.prototype.tabs = function (option) {  
    var that = this;
    that.find(option.tabHeads).on('click',function(){
      $(this).addClass(option.tabHeadsClass)
        .siblings().removeClass(option.tabHeadsClass);

      var index = $(this).index();
      that.find(option.tabBodys).eq(index).addClass(option.tabBodysClass)
        .siblings().removeClass(option.tabBodysClass)
    })
    return that;
  }
}(window.jQuery))