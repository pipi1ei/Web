// import './checkbox.css';

/**
 * 复选框组件
 * 
 * @param el jquery元素
 * @param arr 数据，格式：[{id: '', name: ''}]
 * @param options {
 *    idProperty 字段值
 *    textProperty 字段名
 *    defaultCheck 默认被勾选的项
 *    defaultDisabled 默认不可选的项
 * }
 * 
 * @example
 * var options = {
 *    idProperty: 'id',
      textProperty: 'name',
      defaultCheck: [],
      defaultDisabled: []
 * };
 * 
 * var arr = [{name: 'aaa', id: 1}, {name: 'bbb', id: 2}, {name: 'ccc', id: 3}]
 * 
 * var checkboxObj = new Checkbox($('#checkbox'), arr, options);
 * 
 * 对象常用属性：
 * checkboxObj.data  选项数据
 * 
 * 对象常用方法
 * checkboxObj.checkEvent = () => { ... }  设置选中某个复选框之后的回调函数
 * checkboxObj.getChecked()  获取被选中项，返回数组类型
 * checkboxObj.setDisabled([1])  设置不可勾选项
 * checkboxObj.initCheckboxList()  初始化复选框组件  
 */
class Checkbox {
  constructor(el, arr = [], options = {}) {
    this.elem = el;
    this.data = arr;
    this.options = $.extend({}, {
      idProperty: 'id',
      textProperty: 'name',
      defaultCheck: [],
      defaultDisabled: []
    }, options);

    this.idProperty = this.options.idProperty;
    this.textProperty = this.options.textProperty;

    this.initCheckboxList();
    this.bindEvent();

    this.setCheck(this.options.defaultCheck);
    this.setDisabled(this.options.defaultDisabled);
  }

  initCheckboxList() {
    this.elem.css({display: 'inline-block'});
    let checkboxList = $(`<div class="select-content checkbox-list"></div>`);
    this.data.forEach(item => {
      let value = item[this.textProperty];
      if(typeof value === 'string') {
        value = value.replace(/&nbsp/g, '&amp;nbsp');
        value = value.replace(/&lt/g, '&amp;lt');
        value = value.replace(/&gt/g, '&amp;gt');
      }

      let _item =$(`<span class="checkbox" data-value="${item[this.idProperty]}">
        <i></i>
        <span class="item-text" title="${value}">${value}</span>
      </span>`);

      checkboxList.append(_item);
    });
    this.elem.html(checkboxList);
  }

  bindEvent() {
    let _this = this;
    this.elem.on('click', '.checkbox .item-text, i', function(e) {
      e.stopPropagation();
      if(!$(this).parent().hasClass('disabled')) {
        $(this).parent().toggleClass('selected');
        _this.checkEvent();
      }
    });
  }

  // 设置复选框被选中
  setCheck(arr) {
    this.elem.find('.checkbox').removeClass('selected');
    arr.forEach(item => {
      if(!this.elem.find(`span[data-value=${item}]`).hasClass('disabled')) {
        this.elem.find(`span[data-value=${item}]`).addClass('selected');
        this.checkEvent();
      }
    })
  }

  // 设置复选框不可选
  setDisabled(arr) {
    this.elem.find('span').removeClass('disabled');
    arr.forEach(item => {
      this.elem.find(`span[data-value=${item}]`).addClass('disabled');
    })
  }

  /**
   * 设置选中或取消某一个复选框
   * @param {*} arr 选项数据
   * @param {*} check 是否要选中 
   */
  setChecked(arr = [], check = true) {
    arr.forEach(item => {
      let span = this.elem.find(`span[data-value=${item}]`);
      if(!span.hasClass('disabled')) {
        if(check) {
          span.addClass('selected');
        } else {
          span.removeClass('selected');
        }
      }
    });
  }

  getChecked() {
    let checkList = this.elem.find('.selected');
    let box = []
    for(let i = 0; i < checkList.length; i++) {
      box.push(checkList.eq(i).attr('data-value'));
    }
    return box
  }
 
  // 勾选事件的回调
  checkEvent(){}

}