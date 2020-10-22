// import './radio.css';

/**
 * 单选框组件
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
 * var radioObj = new Radio($('#radio'), arr, options);
 * 
 * 对象常用属性：
 * radioObj.data  选项数据
 * radioObj.checkData  选中数据
 * 
 * 对象常用方法
 * radioObj.checkEvent = () => { ... }  设置选中某个单选框之后的回调函数
 * radioObj.setCheck(2)  设置选中项
 * radioObj.setDisabled([1])  设置不可勾选项
 * radioObj.initRadioList()  初始化单选框组件  
 */
class Radio {
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

    // 被选中的数据
    this.checkedData;

    this.initRadioList();
    this.bindEvent();
    this.setCheck(this.options.defaultCheck[0]);
    this.setDisabled(this.options.defaultDisabled)
  }

  initRadioList() {
    this.elem.css({display: 'inline-block'});
    let radioList = $(`<div class="radio-list"></div>`);
    this.data.forEach(item => {
      let value = item[this.textProperty];
      if(typeof value === 'string') {
        value = value.replace(/&nbsp/g, '&amp;nbsp');
        value = value.replace(/&lt/g, '&amp;lt');
        value = value.replace(/&gt/g, '&amp;gt');
      }

      let _item = $(`<span class="radio" data-value="${item[this.idProperty]}">
        <i></i>
        <span class="item-text" title="${value}">${value}</span>
      </span>`);
      radioList.append(_item);
    });
    this.elem.append(radioList);
  }

  bindEvent() {
    let _this = this;
    this.elem.on('click', '.item-text, i', function(e) {
      e.stopPropagation();
      if(!$(this).parent().hasClass('disabled') && !$(this).parent().hasClass('selected')) {
        _this.setCheck($(this).parent().attr('data-value'));
      }
    })
  }

  // 设置被选中
  setCheck(id) {
    this.elem.find('.radio').removeClass('selected');
    let span = this.elem.find(`span[data-value=${id}]`)
    if(!span.hasClass('disabled')) {
      span.addClass('selected');
      this.checkedData = span.attr('data-value');
      this.checkEvent();
    }
  }

  // 设置不可选
  setDisabled(arr) {
    this.elem.find('span').removeClass('disabled');
    arr.forEach(item => {
      this.elem.find(`span[data-value=${item}]`).addClass('disabled');
    })
  }

  // 选中的回调
  checkEvent() {}

}