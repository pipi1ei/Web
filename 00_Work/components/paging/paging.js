// import './paging.css';

/**
 * 分页组件
 * 
 * @param el jquery 元素
 * @param settings {
 *    pagesize: 页数，
 *    current：当前页，
 *    count：总数据量，
 *    prevTpl：上一页描述文字，
 *    nextTpl: 下一页描述文字,
      firstTpl: 第一页描述文字,
      lastTpl: 最后一页描述文字,
      ellipseTpl: 中间省略部分描述文字,
      showPageInfo：是否显示 当前页/总条数 信息
      toolbar：是否显示每页展示条数下拉框
      pageSizeList：下拉框的展示项
      callback：选择页数、每页展示条数时的回调
 * }
 * 
 * @example 
 * var settings = {
 *    pagesize: 10,
      current: 1,
      count: 72,
      prevTpl: "上一页",
      nextTpl: "下一页",
      firstTpl: "首页",
      lastTpl: "尾页",
      ellipseTpl: "...",
      showPageInfo: true,
      toolbar: true,
      pageSizeList: [10, 20, 30, 50],
      callback: (current, size, count) => {
        console.log("callback")
      }
 * }
 * var paging = new Paging($('#paging'), settings);    
 *  
 */
class Paging {
  constructor(el, settings) {
    this.elem = el;
    this.settings = $.extend({}, settings);
    if(this.settings.showPageInfo) {
      this.pageInfoContainer = $('<div class="ifind-paging-info-container"></div>');
      this.elem.append(this.pageInfoContainer);
    }

    this.container = $('<div class="ifind-paging-container"></div>');
    this.elem.append(this.container);
    this.render(this.settings);
    this.format();
    this.bindEvent();
  }

  /**
   * 设置组件当前页数、每页数据量、总页数、数据总数
   * @param ops 传递过来的分页配置项
   */
  render(ops) {
    typeof ops.count !== 'undefined' ? this.count = ops.count : this.count = this.settings.count;
    typeof ops.pagesize !== 'undefined' ? this.pagesize = ops.pagesize : this.pagesize = this.settings.pagesize;
    typeof ops.current !== 'undefined' ? this.current = ops.current : this.current = this.settings.current;
    this.pagecount = Math.ceil(this.count / this.pagesize);
    this.format()
  }

  /**
   * 创建分页组件的 html 结构
   */
  format(){
    let html = '<ul>';
    // 首页
    html += `<li class="ifind-page-first ifind-page-action ifind-pager">${this.settings.firstTpl}</li>`;
    // 上一页
    html += `<li class="ifind-page-prev ifind-page-action ifind-pager">${this.settings.prevTpl}</li>`;

    // 设置数字页部分
    if(this.pagecount > 6) {
      // 一定显示第一页
      html += `<li data-page="1" class="ifind-pager">1</li>`;
      if(this.current <= 2) {
        // 当前页数 < 2, 显示 1，2，3 页和省略部分
        html += `<li data-page="2" class="ifind-pager">2</li>`;
        html += `<li data-page="3" class="ifind-pager">3</li>`;
        html += `<li class="ifind-paging-ellipse">${this.settings.ellipseTpl}</li>`;
      } else if(this.current > 2 && this.current <= this.pagecount - 2) {
        // 当前页数 <= this.pagecount - 2, 显示省略部分和最后 3 页
        if(this.current > 3) {
          // 显示前省略部分
          html += `<li class="ifind-paging-ellipse">${this.settings.ellipseTpl}</li>`;
        }

        // 显示中间相邻 3 页页码
        html += `<li data-page="${this.current - 1}" class="ifind-pager">${this.current - 1}</li>`;
        html += `<li data-page="${this.current}" class="ifind-pager">${this.current}</li>`;
        html += `<li data-page="${this.current + 1}" class="ifind-pager">${this.current + 1}</li>`;

        if(this.current < this.pagecount - 2) {
          // 显示后省略部分
          html += `<li class="ifind-paging-ellipse">${this.settings.ellipseTpl}</li>`;
        }
      } else {
        // 当前页数在最后3页以内，显示前省略部分和最后3列
        html += `<li class="ifind-paging-ellipse">${this.settings.ellipseTpl}</li>`;
        for(let i = this.pagecount - 2; i < this.pagecount; i++) {
          html += `<li data-page="${i}" class="ifind-pager">${i}</li>`
        }
      }

      // 一定显示最后一页
      html += `<li data-page="${this.pagecount}" class="ifind-pager">${this.pagecount}</li>`;
    } else {
      // 页数不超过6页显示全部页数
      for(let i = 1; i <= this.pagecount; i++){
        html += `<li data-page="${i}" class="ifind-pager">${i}</li>`
      }
    }

    // 下一页
    html += `<li class="ifind-page-next ifind-page-action ifind-pager">${this.settings.nextTpl}</li>`;
    // 尾页
    html += `<li class="ifind-page-last ifind-page-action ifind-pager">${this.settings.lastTpl}</li>`;
    html += '</ul>';

    this.container.html(html);

    if(this.current <= 1) {
      // 设置首页和上一页不可点击
      $('.ifind-page-prev', this.container).addClass('ifind-pager-disabled');
      $('.ifind-page-first', this.container).addClass('ifind-pager-disabled');
    }
    if(this.current >= this.pagecount) {
      // 设置尾页和下一页不可点击
      $('.ifind-page-next', this.container).addClass('ifind-pager-disabled');
      $('.ifind-page-last', this.container).addClass('ifind-pager-disabled');
    }

    // 给当前页设置选中状态
    this.container.find(`li[data-page="${this.current}"]`).addClass('focus').siblings().removeClass('focus');

    if(this.settings.toolbar) {
      this.bindToolbar()
    }

    if(this.settings.showPageInfo && (this.pagecount || this.pagecount == 0)) {
      this.pageInfoContainer.html(`<div class="ifind-paging-info">共${this.pagecount}页/${this.count}条记录</div>`)
    }
  }

  /**
   * 设置每页展示数据可选下拉框
   */
  bindToolbar(){
    let _this = this;
    let html;
    if(this.settings.pageSizeList.length) {
      html = $(
        `<li class="ifind-paging-toobar">
          <select class="ifind-select-pagesize"></select>
          <input type="text" class="ifind-paging-count" />
          <a href="javascript:void(0)">确定</a>
        </li>`
      );
      let sel = $('.ifind-select-pagesize', html);
      let str = '';
      for(let i = 0, l = this.settings.pageSizeList.length; i < l; i++) {
        str += `<option value="${this.settings.pageSizeList[i]}">${this.settings.pageSizeList[i]}条/页</option>`;
      }
      sel.html(str);
      sel.val(this.pagesize);
      sel.change(function(){
        _this.changePagesize($(this).val(), function() {});
      })
    } else {
      html = $(
        `<li class="ifind-paging-toobar">
          <input type="text" class="ifind-paging-count" />
          <a href="javascript:void(0)">确定</a>
        </li>`
      );
    }

    $('input', html).val(this.current);
    $('input', html).click(function() {
      $(this).select();
    }).keydown(function(e) {
      if(e.keyCode == 13) {
        let val = parseInt($(this).val());
        if(val) {
          val = val > 0 ? val : 1;
        }
        let current = val;
        _this.go(current);
      }
    })

    this.container.children('ul').append(html);
  }

  /**
   * 给组件绑定事件
   */
  bindEvent() {
    let _this = this;
    this.container.on('click', 'li.ifind-page-action,li.ifind-pager', function(e) {
      if($(this).hasClass('ifind-page-disabled') || $(this).hasClass('focus')) {
        return false;
      }

      if($(this).hasClass('ifind-page-action')) {
        if($(this).hasClass('ifind-page-first')) {
          _this.current = 1;
        }
        if($(this).hasClass('ifind-page-prev')) {
          _this.current = Math.max(1, _this.current - 1);
        }
        if($(this).hasClass('ifind-page-next')) {
          _this.current = Math.min(_this.pagecount, _this.current + 1);
        }
        if($(this).hasClass('ifind-page-last')) {
          _this.current = _this.pagecount;
        }
      } else if($(this).data('page')) {
        _this.current = parseInt($(this).data('page'));
      }

      _this.go()
    })
  }

  /**
   * 每页展示数据改变
   * @param pagesize 每页展示条数 
   */
  changePagesize(pagesize){
    this.render({
      pagesize: parseInt(pagesize)
    });
    this.settings.callback && this.settings.callback(this.current, this.pagesize, this.pagecount);
  }

  /**
   * 跳转到第几页
   * @param currentPage 页数
   */
  go(currentPage) {
    let _this = this;
    this.current = currentPage || this.current;
    this.current = Math.max(1, _this.current);
    this.current = Math.min(_this.pagecount, _this.current);
    this.format();
    this.settings.callback && this.settings.callback(this.current, this.pagesize, this.pagecount);
  }
}

// export default Paging;