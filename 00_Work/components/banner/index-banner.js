// import './index-banner.css';

/**
 * 轮播图组件
 * 
 * @param options {
 *    id 组件的 id
 *    data: 数据源
 *    width: 组件宽度
 *    height: 组件高度
 *    interval: 自动轮播的间隔，单位 ms
 * }
 * 
 * @param option.data [
 *    {
 *      imgUrl: 图片的 url，
 *      bannerLink: 图片的跳转链接
 *      desc：图片的描述信息
 *    }
 * ]
 */
class Banner {
  constructor(options) {
    this.id = options.id;
    this.data = options.data ? options.data : [];
    this.showIndex = -1;
    this.interval = options.interval || 5000;
    this.container = $('#' + this.id);

    this.realWidth = options.width || this.container.width();
    this.realHeight = options.height || this.container.height();
    this.count = this.data.length;

    this.init();
  }

  init() {
    this.build();
    this.initCss();
    this.goBanner(0);

    if(this.count >= 2) {
      this.setClock();
    }
  }

  build() {
    let bannerList = [],
        pageList = [],
        descList = [];

    let prevNext = this.data.length > 1 ? `<span class="btn-item left"></span><span class="btn-item right"></span>` : ``;

    for(let i = 0; i < this.data.length; i++) {
      bannerList.push(`<div class="banner" style="background-image: url(${this.data[i].imgUrl}); width: ${this.realWidth}px; height: ${this.realHeight}px;" data-link="${this.data[i].bannerLink}"></div>`);

      descList.push(`<div class="desc-item" title="${this.data[i].desc}">${this.data[i].desc}</div>`);

      pageList.push(`<div class="progress-item"><span></span></div>`);
    }

    let html = `${prevNext}
      <div class="banner-show">
        ${bannerList.join('')}
      </div>
      <div class="banner-desc-wrapper">
        <div class="banner-desc">${descList.join('')}</div>
        <div class="progress">${pageList.join('')}</div>
      </div>
    `;

    this.container.html(html).addClass('index-banner');
  }

  initCss() {
    let that = this;

    // 点击轮播图片跳转链接
    $('#' + this.id + ' .banner').on('click', function() {
      let link = $(this).attr('data-link');
      if(link) {
        window.open(link);
      }
    })

    if(this.count >= 2) {
      // 鼠标移到轮播图上停止轮播，离开继续轮播
      this.container.hover(function() {
        that.stopClock();
      }, function() {
        that.setClock();
      })

      // 点击轮播图中的指示器显示对应 index 的图片
      $('#' + this.id + ' .progress .progress-item').on('click', function() {
        if(!$(this).hasClass('active')) {
          let index = $(this).index();
          that.goBanner(index);
        }
      })

      // 点击左右轮播
      $('#' + this.id + ' .btn-item').on('click', function() {
        let index = that.showIndex;
        if(index == -1) {
          index = 0;
        }

        if($(this).hasClass('left')) {
          if(index == 0) {
            index = that.count - 1;
          } else {
            index --;
          }
        } else if($(this).hasClass('right')) {
          if((index + 1) >= that.count) {
            index = 0;
          } else {
            index++;
          }
        }

        that.goBanner(index);
      })

    }
  }

  // 显示对应 index 的图片，index 从 0 开始
  goBanner(index) {
    // 修正一下 index 数据
    if(index == -1 || index > this.count -1) {
      index = 0;
    }

    this.showIndex = index;
    let left = index * this.realWidth;
    left = left == 0 ? (left + 'px') : ('-' + left + 'px');
    $('#' + this.id + ' .banner-show').css('margin-left', left);
    this.progress();
  }

  // 设置轮播
  setClock() {
    let that = this;

    this.timer = setTimeout(function() {
      let index = that.showIndex;
      if(index == -1 || (index + 1) == that.count) {
        index = 0;
      } else {
        index++;
      }

      that.goBanner(index);
      clearTimeout(that.timer);
      that.setClock();
    }, this.interval)
  }

  // 停止轮播
  stopClock() {
    clearTimeout(this.timer);
  }

  // 显示当前显示的图片的指示器和描述
  progress() {
    $('#' + this.id + ' .progress .progress-item').removeClass('active');
    $('#' + this.id + ' .banner-desc-wrapper .banner-desc .desc-item').removeClass('active');
    $('#' + this.id + ' .progress .progress-item').eq(this.showIndex).addClass('active');
    $('#' + this.id + ' .banner-desc-wrapper .banner-desc .desc-item').eq(this.showIndex).addClass('active')
  }
}

// export default Banner;