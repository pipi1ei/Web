### 为什么使用懒加载
+ 当我们进入到某个页面的时候，会有许多图片，有些图片可能在下面，当我们点进页面但没有滑动全部展示时，其实下面的图片是没有作用的，这个时候如果加载了也相当于白加载，而且还降低了网页的加载速度。
+ 懒加载就是只有滚动到可视区域时才加载当前的图片，也就是说不是一次性加载所有的图片，从而在一定程度上减少服务器的请求及带宽

### 懒加载实现原理
+ 图片的加载是由 src 的值引起的，当对 src 赋值时，浏览器会请求图片资源，基于这个，可以利用 html5 的属性 data-xxx 来保存图片路径，当我们需要加载图片的时候才将 data-xxx 的值赋予 src，就能实现图片的按需加载，也就是懒加载了。
+ <img data-src='图片路径' src='默认的图片'>

### 懒加载的优点
+ 提高前端性能，图片在需要的时候才加载，减轻服务的负担，提高页面的加载速度，能够减少带宽

### 实现方式
+ 使用 jQuery 和 jQuery 的 lazyload 插件
```javascript
$(function(){
  var pageNo = 1,
      pageSize = 10;

  // 调用后台接口获取图片数据，并渲染到页面中
  imgShow(pageNo)

  // 监听页面滚动
  $(window).scroll(function(){
    // 文档高度
    var totalH = $(document).height;

    // 可视区域高度
    var _h = Math.ceil($(this).height())

    // 滚动条与顶部的高度
    var scrollH = Math.ceil($(this).scrollTop())

    // 实现上拉加载更多图片
    if(scrollH + _h >= totalH){
      imgShow(++pageNo)
    }
  })

  function imgShow(pageNo){
    $.ajax({
      type: 'get',
      url: 'xxx',
      dataType: 'json',
      success(res){
        $.each(res, function(index, item){
          // 渲染页面
        })
      },
      error(err){

      }
    })
  }
})

```