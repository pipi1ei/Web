window.onload = function() {
  this.initSwiper()
};


/* 初始化轮播图 */
function initSwiper() {
  // 1.获取dom元素
  var $banner =  document.getElementById('banner');  // 轮播图容器
  var $swiper = $banner.querySelector('.swiper')  // 图片盒子
  var $liList = $banner.querySelector('.indicator').querySelectorAll('li')  //指示器集合
  
  // 2.图片无缝轮播
  const bannerWidth = $banner.offsetWidth;

  // 添加过渡方法
  function addTransition(dom){
    dom.style.transition = 'all 0.3s';
    dom.style.webkitTransition = 'all 0.3s';
  }

  // 移除过渡方法
  function removeTransition(dom){
    dom.style.transition = 'none';
    dom.style.webkitTransition = 'none';
  }

  // 设置X轴方向位移
  function setTranslateX(dom, distance){
    dom.style.transform = 'translateX('+ distance +'px)'
  }

  let index = 1
  var timer = setInterval(function(){
    index++
    addTransition($swiper)
    setTranslateX($swiper, -index*bannerWidth)
  }, 2000)

  // 添加过渡结束事件
  $swiper.addEventListener('transitionend', function(){
    if(index == 4){
      index = 1
      removeTransition($swiper)
      setTranslateX($swiper, -index*bannerWidth)
    }else if(index == 0){
      index = 3
      removeTransition($swiper)
      setTranslateX($swiper, -index*bannerWidth)
    }
    setIndicator()
  })

  // 指示器对应改变
  const liListLength = $liList.length
  // for(let i = 0; i < liListLength; i++){
  //   $liList[i].firstElementChild.addEventListener('mouseover',function(){
  //     console.log('mouseover')
  //     setIndicator()
  //   })
  // }
  function setIndicator(){
    for(let i = 0; i < liListLength; i++){
      $liList[i].firstElementChild.classList.remove('active')
    }
    $liList[index-1].firstElementChild.classList.add('active')
  }

  // 左右控制
  const $right = $banner.querySelector('.right').firstElementChild
  const $left = $banner.querySelector('.left').firstElementChild
  $right.addEventListener('click',next)
  $left.addEventListener('click',previous)

  function next(){
    index ++
    clearInterval(timer)
    addTransition($swiper)
    setTranslateX($swiper, -index*bannerWidth)
    timer = setInterval(function(){
      index++
      addTransition($swiper)
      setTranslateX($swiper, -index*bannerWidth)
    }, 2000)
  }

  function previous(){
    index --
    clearInterval(timer)
    addTransition($swiper)
    setTranslateX($swiper, -index*bannerWidth)
    timer = setInterval(function(){
      index++
      addTransition($swiper)
      setTranslateX($swiper, -index*bannerWidth)
    }, 2000)
  }
}