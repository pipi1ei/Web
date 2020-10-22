// import './../css/select.css'


/**
 * 下拉单选框
 * @param el DOM元素
 * @param arr 数据  格式：[{id: "", name: ""}]
 * @param options {
 *     idProperty 字段值：一般传递传给后端用的
 *     textProperty 字段名：在页面上显示出来的
 *     defaultSelect 默认选择的项
 *     placeholder 输入框的 placeholder 属性
 * }
 * 
 * @example 
 * var options = {
 *    idProperty: "id",
 *    textProperty: "name",
 *    defaultSelect: [],
 *    placeholder: "请选择"
 * }
 * var arr = [{id: "1", name: "AAA"}, {id: "2", name: "BBB"}]
 * var selectObj = new select($('.elem'), arr, options)
 * 
 * 对象常用属性：
 * selectObj.dataSource  // 选项数据
 * selectObj.currentValue  // 所选项
 * 对象常用方法：
 * selectObj.callback = () => { do something }  // 选中选项之后的回调函数
 * selectObj.setCurrentValue([2])  // 设置选中项
 * selectObj.setDisabled(true)  // 设置不可编辑
 */
const data = Symbol("dataSource")
class Select {
  constructor(el, arr = [], options = {}){
    this.elem = el;
    this.options = $.extend({}, {
      idProperty: "id",
      textProperty: "name",
      defaultSelect: [],
      placeholder: ""
    }, options);

    // 代理 this.options 中的数据到 this 上
    // Object.keys(this.options).forEach(key => {
    //   this._proxy(key)
    // })

    this.idProperty = this.options.idProperty;
    this.textProperty = this.options.textProperty;
    this.placeholder = this.options.placeholder;
    // 默认可下拉
    this.disabled = false;  
    // 选项高度
    this.itemHeight = 26;
    // 下拉框高度
    this.selectListHeight = 184;
    // 选项最大显示数量
    this.showItem = this.selectListHeight / this.itemHeight;

    this.dataSource = arr;
    this.selectDataSource = [];

    // 给组件添加事件
    this.bindEvent();
    // 设置初始选中项
    this.setCurrentValue(this.options.defaultSelect);
  }

  _proxy(key){
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      set(newValue){
        this.options[key] = newValue
      },
      get(){
        return this.options[key]
      }
    })
  }

  set dataSource(arr){
    this[data] = arr;
    this.currentValue = "";
    this.elem.find("input").val("");
    this.initSelect();
  }

  get dataSource(){
    return this[data]
  }

  // 初始化组件：创建 html 并设置样式
  initSelect(){
    this.elem.css({display: "inline-block"});
    let selectBody = $(`<div class="select-body single-select"><input type="text" readonly><i class="select-input-icon"></i></div>`);
    let selectList = this.createSelectList(this.dataSource);
    selectList.addClass("hide");
    selectBody.append(selectList);
    this.elem.html(selectBody);
  }

  /**
   * 根据选项数据创建下拉选项的 html 
   * @param arr 选项数据
  */
  createSelectList(arr){
    let selectList = $(`<div class="select-list"></div>`);
    selectList.css({maxHeight: `${this.selectListHeight}px`});
    if(this.placeholder){
      let placeholderItem = $(`<span data-value="" class="placeholderItem">${this.placeholder}</span>`);
      placeholderItem.css({height: `${this.itemHeight}px`});
      selectList.append(placeholderItem);
    }

    arr.forEach(item => {
      let value = item[this.textProperty];
      if(typeof value === "string"){
        value = value.replace(/&nbsp/g, '&amp;nbsp');
        value = value.replace(/&lt/g, '&amp;lt');
        value = value.replace(/&gt/g, '&amp;gt');
      }

      let selectItem = $(`<span data-value="${item[this.idProperty]}" title="${value}" class="select-item"></span>`);
      selectItem.text(item[this.textProperty]);
      selectItem.css({height: `${this.itemHeight}px`});
      selectList.append(selectItem);
    })

    return selectList;
  }

  /**
   * 给组件绑定事件
   */
  bindEvent(){
    this.elem.on("click", "input, .select-input-icon", e => {
      if(this.disabled) return false;

      let curSelectListEl = this.elem.find(".select-list");
      let state = curSelectListEl.hasClass("hide");
      if(state) {
        // 展开下拉选项框
        curSelectListEl.removeClass("hide");
        if (this.dataSource.length > this.showItem){
          this.setScroll();
        }
        if (this.currentValue == "") {
          this.elem.find("input").addClass("placeHolder");
          this.elem.find("input").val("");
        }
      } else {
        // 关闭下拉选项框
        if (this.currentValue == "") {
          this.elem.find("input").addClass("placeHolder");
          this.elem.find("input").val(this.placeholder);
        }
      }

      e.stopPropagation();
    })

    this.componentEvent();
  }

  /**
   * 给组建内 html 添加事件
   */
  componentEvent(){
    $(document).on("click", () => {
      if(!this.elem.find(".select-list").hasClass("hide")) {
        this.elem.find(".select-list").addClass("hide")
      }

      if(this.currentValue == "") {
        this.elem.find("input").addClass("placeHolder").val(this.placeholder);
      }
    })

    this.elem.on("click", ".single-select .select-list span", e => {
      e.stopPropagation();
      if($(e.target).hasClass("placeholderItem")) {
        this.currentValue = "";
        this.elem.find(".select-item").removeClass("selected");
        this.elem.find("input").val("");
        this.setCurrentValue([]);
      } else {
        this.setCurrentValue([$(e.target).attr("data-value")]);
      }

      this.closePanel()
    })
  }

  /**
   * 关闭下拉选项框
   */
  closePanel(){
    this.elem.find(".select-list").addClass("hide");
    this.callback();
  }

  /**
   * 设置选中项
   * @param arr 选中项
   */
  setCurrentValue(arr){
    this.currentValue = arr.join(",");
    this.elem.find(".select-item").removeClass("selected");

    let _select = [],
        index = 0;
    this.selectDataSource = [];

    arr.forEach(i => {
      index = this.elem.find(`.select-list span[data-value=${i}]`).addClass("selected").index();
      _select.push(this.elem.find(`.select-list span[data-value=${i}]`).text());
      this.selectDataSource.push(this.dataSource[index]);
    })

    if(arr.length == 0) {
      this.elem.find("input").addClass("placeHolder").val(this.placeholder);
    } else {
      this.elem.find("input").removeClass("placeHolder").val(_select.join(",")).attr("title", _select.join(","));
    }
  }

  /**
   * 当选项数据大于下拉列表框中展示的最大数量时，设置滚动到当前选择的选项位置
   */
  setScroll(){
    if(this.currentValue){
      let selectItem = this.currentValue.split(",")[0];
      if(selectItem){
        let i = this.elem.find(`.select-list span[data-value=${selectItem}]`).index() - 1;
        this.elem.find(".select-list").scrollTop(i * this.itemHeight);
      }
    }
  }

  /**
   * 设置下拉框组件是否可用
   * @param {} state 
   */
  setDisabled(state){
    this.disabled = state ? true : false;
  }

  /**
   * 选中选项之后的回调函数
   */
  callback() {

  }
}

// 示例：会员类型下拉框
let memberTypeSelect = new Select($('#memberTypeSelect'), [
  {id: 'null', name: '全部'},
  {id: 1, name: '理事会员'},
  {id: 2, name: '副会长单位'},
  {id: 3, name: '普通会员'},
], {
  defaultSelect: ['null']
});

// 设置点击选项的回调函数
memberTypeSelect.callback = () => {
  // 查询表格数据
  tableObj.pagingSetting.current = 1;
  tableObj.refreshTable();
}


// export default Select;