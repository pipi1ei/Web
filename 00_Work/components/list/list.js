// import './list.css';
// import '../paging/paging';

/**
 * 列表组件
 * @param el DOM 元素
 * @param itemsOptions 列表单元数据
 * @param dataServer 后台接口地址
 * @param options {
 *    isPaging: 是否分页（true: 分页， false: 不分页）
 *    pagingSetting {  分页参数
 *      pageSize: 每页展示数据量
 *      current: 当前页数
 *      count: 数据总量
 *      prevTpl: 上一页显示的文字（eg：上一页，前一页）
 *      nextTpl: 下一页显示的文字（eg：下一页，后一页）
 *      firstTpl: 第一页显示的文字（eg：首页，第一页）
 *      lastTpl: 最后一页显示的文字（eg：尾页，最后一页）
 *      ellipseTpl: 省略部分显示的文字（eg：...）
 *      showPageInfo: 是否在左侧显示页数/总数信息
 *      toolbar：是否显示工具条（选中每页展示条数，跳转到x页）
 *      pageSizeList: 可选的每页显示的条数（eg：[10, 20, 30]）
 *      callback: 页数改变/每页显示条数改变的回掉函数
 *    } 
 *    type: 请求类型
 * }
 *
 * @example
 * var itemOptions = [
 *    {name: 'title', width: 750, algin: -1},
 *    {name: 'time', width: 140, algin: 1},
 * ];
 * var options = {
 *    isPaging: true,
 *    type: 'POST',
 *    pagingSetting: {}
 * }
 * var listObj = new List($('.elem'), itemOptions, '/api/data/page', options);
 * 
 * listObj.init();
 * 
 * 对象常用属性：
 * listObj.dataSource  // 列表的数据
 * 
 * 对象常用方法
 * listObj.init()  // 列表初始化
 * listObj.refreshList()  // 刷新列表展示内容
 * 
 * listObj.itemsFormat = (item, data) => {
 *    列表单元格渲染完成后，某些单元格需要绑定事件或者需要进行翻译等特殊处理
 *    item.find("div[data-name=title]").on("click", "a", function(){
 *      window.location.href = data.url
 *    })
 * }
 * 
 * listObj.renderListAfter = () => {
 *    表格渲染完成之后的回调
 * }
 * 
 * listObj.renderListBefore = res => {
 *    请求接口成功，数据渲染之前的回调，必须有返回值（true：渲染数据， false：不渲染数 据）
 *    return true
 * }
 * 
 * listObj.setParams = params = > {
 *    设置后台接口传参
 *    params.page = listObj.pagingSetting.current;
 *    params.size = listObj.pagingSetting.pagesize;
 * }
 * 
 * 静态属性、方法
 * List.beforeSend = () => {
 *    发送请求之前
 * }
 * 
 * List.error = (response, opts) => {
 *    请求出错回调
 * }
 * 
 * List.complete = () => {
 *    请求完成回调
 * }
 * 
 * 字号
 * List.size = 15
 * 
 * 列表项高度
 * List.listHeight = 40
 */
class List {
  static beforeSend() {}

  static error(response, opts) {}

  static complete() {}

  constructor(el, itemsOptions, dataServer, options = {}) {
    this.elem = el;
    this.options = $.extend({}, {
      isPaging: true,
      type: 'POST',
      pagingSetting: {}
    }, options);
    this.type = this.options.type;
    this.pagingSetting = $.extend({
      pagesize: 10,
      current: 1,
      prevTpl: "上一页",
      nextTpl: "下一页",
      firstTpl: "首页",
      lastTpl: "尾页",
      ellipseTpl: "...",
      showPageInfo: true,
      toolbar: true,
      pageSizeList: [10, 20, 30, 50],
      callback: (current, size, count) => {
        this.pagingSetting.current = current;
        this.pagingSetting.size = size;
        this.pagingSetting.count = count;
        this.getListData()
      }
    }, this.options.pagingSetting);
    this.dataServer = dataServer;
    this.dataSource = [];
    this.isPaging = this.options.isPaging;
    this.listHeader = {
      data: itemsOptions,
      leafNodes: itemsOptions
    };
    this.list = [];

    this.itemsFormat = (item, data) => {
      // 单元格渲染后，某些单元格需要绑定事件或数据需要进行翻译等特殊处理
    };

    this.renderListAfter = () => {
      // 表格渲染完成后
    };

    this.renderListBefore = res => {
      // 请求成功，数据渲染前
      return true;
    };

    this.setParams = params => {
      // 设置表格传参
    }
  }

  /**
   * 初始化列表
   */
  init(){
    let listHtml = `
      <div class="iList">
        <div class="iList-content">
          <div class="iList-content"></div>
          <div class="noData">暂无数据</div>
        </div>
        <div class="listPaging"></div>
      </div>`;

    this.elem.append(listHtml);

    if(this.isPaging) {
      this.paging = new Paging(this.elem.find('.listPaging'), this.pagingSetting);
    }

    this.dataServer ? this.getListData() : this.listInit();
  }

  /**
   * 发起 ajax 请求获取列表数据
   */
  getListData() {
    let params = {};
    this.setParams(params);

    $.ajax({
      url: this.dataServer,
      contentType: 'application/x-www-form-urlencoded',
      dataType: 'json',
      type: this.type,
      cache: false,
      beforeSend: () => {
        List.beforeSend();
      },
      complete: () => {
        List.complete();
      },
      success: res => {
        if(res.code == 1 &&　this.renderListAfter(res)) {
          let rows, arr;

          if(this.paging) {
            rows = res.data;
            arr = rows.recordList;
            this.pagingSetting.current = rows.currentPage;
            this.pagingSetting.count = rows.totalCount;
            this.pagingSetting.pagesize = rows.numPerPage;
            this.paging.render({
              count: rows.totalCount,
              pagesize: rows.numPerPage,
              current: rows.currentPage,
            });
          } else {
            arr = res.data;
          }

          arr.forEach(data => {
            for(let key in data) {
              if(data[key] === null || data[key] === '') {
                data[key] == '--';
              }
            }
          });

          this.dataSource = arr ? arr : [];
          this.list = [];
          this.createList();
          this.listInit();
        }
      },
      error: (response, opts) => {
        List.error(response, opts);
      }
    })
  }

  /**
   * 根据获取到的表格数据创建对于的 html
   */
  createList() {
    let start = 0;
    let leafNodes = this.listHeader.leafNodes;
    this.dataSource.forEach(item => {
      start++;
      let td = '';
      for(let i = 0; i < leafNodes.length; i++) {
        let value = (item[leafNodes[i].name] || item[leafNodes[i].name] == 0) ? item[leafNodes[i].name] : '';
        if(typeof value === 'string') {
          value = value.replace(/&nbsp/g, '&amp;nbsp');
          value = value.replace(/&lt/g, '&amp;lt');
          value = value.replace(/&gt/g, '&amp;gt');
        }
        let align = leafNodes[i].align ? (leafNodes[i].align === -1 ? 'left' : 'right') : 'center';
        td += `<div title="${value}" data-name="${leafNodes[i].name}" style="width:${leafNodes[i].width}px; text-align="${align}; float="left">${value}</div>`;
      }
      this.list.push(`<li data-index=${start}>${td}</li>`)
    })
  }

  /**
   * 初始化列表内容
   */
  listInit() {
    if(this.dataSource && this.dataSource.length) {
      this.elem.find('.iList-content .noData').hide();
      let ulContent = $('<ul></ul>')
      this.elem.find('.iList-content').html(ulContent);
      this.showNum = this.dataSource.length;
      this.renderList(0, this.showNum);
    } else {
      this.elem.find('.iList-content').find('ul').remove();
      this.elem.find('.iList-content .noData').show();
    }
    this.renderListAfter();
  }

  /**
   * 将数据渲染到表格中
   * @param start 开始索引
   * @param end 结束索引
   */
  renderList(start, end){
    let list = this.elem.find('.iList-content ul');
    let listNum = this.list.length;
    for(let i = start; i < end && i < listNum && this.list[i]; i++) {
      list.append(this.list[i]);
      this.renderItemsAfter(this.elem.find('.iList-content ul li:last-child'), this.dataSource[i]);
    }
  }

  /**
   * 列表单元渲染完成
   */
  renderItemsAfter(){
    this.itemsFormat();
  }

  /**
   * 刷新表格
   */
  refreshList() {
    this.getListData();
  }
 
}

// 字号
List.size = 15;

// 单元格高度
List.listHeight = 40;

// export default List;



// 其他方法

// 前端解码
function htmlEncode(str) {
  if(typeof str === 'object') {
    str = JSON.stringify(str);
  }

  str = str.replace(/&quot;/g, '\\"');
  str = htmlStrDecode(str);
  str = JSON.parse(str);
  return str;
}

// 标签字符串 decode
function htmlStrDecode(str) {
  var temp = document.createElement('div');
  temp.innerHTML = str;
  var outputStr = temp.innerText || temp.textContent;
  temp = null;
  return outputStr;
}