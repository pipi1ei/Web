/*!
 * Distpicker v1.0.4
 * https://github.com/fengyuanchen/distpicker
 *
 * Copyright (c) 2014-2016 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2016-06-01T15:05:52.606Z
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery', 'ChineseDistricts'], factory);
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    factory(require('jquery'), require('ChineseDistricts'));
  } else {
    // Browser globals.
    factory(jQuery, ChineseDistricts);
  }
})(function ($, ChineseDistricts) {

  'use strict';

  if (typeof ChineseDistricts === 'undefined') {
    throw new Error('The file "distpicker.data.js" must be included first!');
  }

  var NAMESPACE = 'distpicker';
  var EVENT_CHANGE = 'click.' + NAMESPACE;
  var PROVINCE = 'province';
  var CIRY = 'city';
  var DISTRICT = 'district';

  function Distpicker(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Distpicker.DEFAULTS, $.isPlainObject(options) && options);
    this.placeholders = $.extend({}, Distpicker.DEFAULTS);
    this.active = false;
    this.init();
  }

  Distpicker.prototype = {
    constructor: Distpicker,

    init: function () {
      var options = this.options;
      var $select = this.$element.find('ul');
      var length = $select.length;
      var data = {};

      $select.each(function () {
        $.extend(data, $(this).data());
      });

      $.each([PROVINCE, CIRY, DISTRICT], $.proxy(function (i, type) {
        if (data[type]) {
          options[type] = data[type];
          this['$' + type] = $select.filter('[data-' + type + ']');
        } else {
          this['$' + type] = length > i ? $select.eq(i) : null;
        }
      }, this));

      this.bind();

      // Reset all the selects (after event binding)
      this.reset(options.echoDisplay);
      this.active = true;
    },

    bind: function () {
      var _this=this;
      if (this.$province) {
        this.$province.on(EVENT_CHANGE, (this._changeProvince = $.proxy(function (e) {
          e.stopPropagation();
          if($(e.target).attr('type')=='text'){
				
          }else{
          	this.$province.children('li').removeAttr('selected');
          	$(e.target).attr('selected','selected');
          	this.$province.siblings('p').text($(e.target).attr("value"));
          	this.$province.siblings('p').attr('title',$(e.target).attr("value"));
          	this.$province.siblings('input').val($(e.target).attr("value"));
          	this.$province.css("display","none");
          	this.$province.siblings('p').removeClass('open');
          	this.$province.find('li').removeClass('selected');
          	this.output(CIRY);
          	this.output(DISTRICT);
          }
        }, this)));
      }

      if (this.$city) {
        this.$city.on(EVENT_CHANGE, (this._changeCity = $.proxy(function (e) {
          e.stopPropagation();
          if($(e.target).attr('type')=='text'){
          	return;
          }
          e.stopPropagation();
          this.$city.children('li').removeAttr('selected');
          $(e.target).attr('selected','selected');
          this.$city.siblings('p').text($(e.target).attr("value"));
          this.$city.siblings('p').attr('title',$(e.target).attr("value"));
          this.$city.siblings('input').val($(e.target).attr("value"));
          this.$city.css("display","none");
          this.$city.siblings('p').removeClass('open');
          this.$city.find('li').removeClass('selected');
          this.output(DISTRICT);
        }, this)));
      }
      
      if (this.$district) {
        this.$district.on(EVENT_CHANGE, (this._changeCity = $.proxy(function (e) {
          e.stopPropagation();
          if($(e.target).attr('type')=='text'){
          	return;
          }
          this.$district.children('li').removeAttr('selected');
          $(e.target).attr('selected','selected');
          this.$district.siblings('p').text($(e.target).attr("value"));
          this.$district.siblings('p').attr('title',$(e.target).attr("value"));
          this.$district.siblings('input').val($(e.target).attr("value"));
          this.$district.css("display","none");
          this.$district.siblings('p').removeClass('open');
          this.$district.find('li').removeClass('selected');
        }, this)));
      }
    },

    unbind: function () {
      if (this.$province) {
        this.$province.off(EVENT_CHANGE, this._changeProvince);
      }

      if (this.$city) {
        this.$city.off(EVENT_CHANGE, this._changeCity);
      }
      
      if (this.$district) {
        this.$district.off(EVENT_CHANGE, this._changeCity);
      }
    },

    output: function (type,deep,obj) {
      var options = this.options;
      var placeholders = this.placeholders;
      var $select = this['$' + type];
      var districts = {};
      var data = [];
      var code;
      var matched;
      var value;
      var _this=this;
      if(options.echoDisplay&&obj){
		  options.province=obj.province
		  options.city=obj.city
		  options.district=obj.district     	
      }
      if (!$select || !$select.length) {
        return;
      }
      value = options[type];
      code = (
        type === PROVINCE ? 86 :
        type === CIRY ? this.$province && this.$province.find('li[selected]').data('code') :
        type === DISTRICT ? this.$city && this.$city.find('li[selected]').data('code') : code
      );
      districts = $.isNumeric(code) ? ChineseDistricts[code] : null;

      if ($.isPlainObject(districts)) {
        $.each(districts, function (code, address) {
          var selected = address === value;

          if (selected) {
            matched = true;
          }
          data.push({
            code: code,
            address: address,
            selected: selected
          });
        });
      }

      if (!matched) {
        if (data.length && (options.autoSelect || options.autoselect)) {
          data[0].selected = true;
        }

        // Save the unmatched value as a placeholder at the first output
        if (!this.active && value) {
          placeholders[type] = value;
        }
      }

      // Add placeholder option
      if (options.placeholder) {
        data.unshift({
          code: '',
          address: placeholders[type],
          selected: false
        });
      }
      if(data.length==1&&deep){
	 	  if(data[0].address=="—— 市 ——"||data[0].address=="—— 区 ——"){
		  	data[0].selected="selected"
		  }
      }
      if(!options.autoSelect&&deep){
	 	  if(data[0].address=="—— 省 ——"){
		  	data[0].selected="selected"
		  }   
      }
      $select.html(this.getList(data));
      $select.prepend("<input type='text' />");
      $select.siblings('p').text($select.find('li[selected]').attr("value"));
      $select.siblings('p').attr("title",$select.find('li[selected]').attr("value"));
      $select.siblings('input').val($select.find('li[selected]').attr("value"));
      $select.siblings('p').off().on('click',function(e){
      	e.stopPropagation();
      	if($(this).hasClass('open')){
      		$(this).removeClass('open')
      	}else{
      		$(this).addClass('open')
      	}
      	$(this).siblings('ul').toggle();
      })
      $(document).off().on("click",function(e){
      	if($(e.target).closest('.topNet-form-control').length==0){
      		_this.$element.find('ul').css('display','none');
      		_this.$element.find('p').removeClass('open')
      	}
      })
      $select.find('input').off().on('keyup',function(){
      	if(type=='province'){
      		_this.searchProvince($(this).val());	
      	}
      	if(type=='city'){
      		_this.searchCity($(this).val());
      	}
      	if(type=='district'){
      		_this.searchDistrict($(this).val());
      	}
      });
    },

    getList: function (data) {
      var list = [];
      $.each(data, function (i, n) {
        list.push(
          '<li' +
          ' value="' + (n.address && n.code ? n.address : n.address) + '"' +
          ' data-code="' + (n.code || '') + '"' +
          (n.selected ? ' selected' : '') +
          ' title="' + (n.address && n.code ? n.address : n.address) + '"' +
          '>' +
            (n.address || '') +
          '</li>'
        );
      });

      return list.join('');
    },
	searchProvince:function(string){
		if(string.length==0){
			this.$province.find('li').removeClass('selected');
			return
		}
		var provinces=this.$element.find('#province').children("li");
		var _this=this;
		_this.$province.find('li').removeClass('selected');
		provinces.each(function(index,item){
			if(provinces.eq(index).attr('value').indexOf(string)!=-1){
//				_this.$province.find('li:eq('+index+')').attr('selected', 'selected').trigger(EVENT_CHANGE);
				_this.$province.find('li:eq('+index+')').addClass('selected')
				_this.$province.scrollTop(index*30-30);
			}
		})
	},
	searchCity:function(string){
		if(string.length==0){
			this.$city.find('li').removeClass('selected');
			return
		}
		var city=this.$element.find('#city').children("li");
		var _this=this;
		_this.$city.find('li').removeClass('selected');
		city.each(function(index,item){
			if(city.eq(index).attr('value').indexOf(string)!=-1){
//				_this.$city.find('li:eq('+index+')').attr('selected', 'selected').trigger(EVENT_CHANGE);
				_this.$city.find('li:eq('+index+')').addClass('selected')
				_this.$city.scrollTop(index*30-30);
			}
		})
	},
	searchDistrict:function(string){
		if(string.length==0){
			this.$district.find('li').removeClass('selected');
			return
		}
		var district=this.$element.find('#district').children("li");
		var _this=this;
		_this.$district.find('li').removeClass('selected');
		district.each(function(index,item){
			if(district.eq(index).attr('value').indexOf(string)!=-1){
//				_this.$district.find('li:eq('+index+')').attr('selected', 'selected').trigger(EVENT_CHANGE);
				_this.$district.find('li:eq('+index+')').addClass('selected')
				_this.$district.scrollTop(index*30-30);
			}
		})
	},
	getVal:function(cb){
		var obj={}
		this.$province.find('li').each(function(index,item){
			if($(this).attr('selected')){
				obj.province=$(this).attr('value')
			}
		});
		this.$city.find('li').each(function(index,item){
			if($(this).attr('selected')){
				obj.city=$(this).attr('value')
			}
		})
		this.$district.find('li').each(function(index,item){
			if($(this).attr('selected')){
				obj.district=$(this).attr('value')
			}
		})
		cb(obj)
	},
    reset: function (deep,obj) {
      if (deep) {
        this.output(PROVINCE,deep);
        this.output(CIRY,deep);
        this.output(DISTRICT,deep);
        return;
      }
      if(this.options.echoDisplay){
      	this.output(PROVINCE,deep,obj);
        this.output(CIRY,deep,obj);
        this.output(DISTRICT,deep,obj);
        return;
      }
      if (this.$province) {
        this.$province.find('li').eq(1).attr('selected', 'selected').trigger(EVENT_CHANGE);
      }
    },

    destroy: function () {
      this.unbind();
      this.$element.removeData(NAMESPACE);
    }
  };

  Distpicker.DEFAULTS = {
    autoSelect: true,
    placeholder: true,
    echoDisplay:true,
    province: '—— 省 ——',
    city: '—— 市 ——',
    district: '—— 区 ——'
  };

  Distpicker.setDefaults = function (options) {
    $.extend(Distpicker.DEFAULTS, options);
  };

  // Save the other distpicker
  Distpicker.other = $.fn.distpicker;

  // Register as jQuery plugin
  $.fn.distpicker = function (option) {
    var args = [].slice.call(arguments, 1);

    return this.each(function () {
      var $this = $(this);
      var data = $this.data(NAMESPACE);
      var options;
      var fn;

      if (!data) {
        if (/destroy/.test(option)) {
          return;
        }

        options = $.extend({}, $this.data(), $.isPlainObject(option) && option);
        $this.data(NAMESPACE, (data = new Distpicker(this, options)));
      }

      if (typeof option === 'string' && $.isFunction(fn = data[option])) {
        fn.apply(data, args);
      }
    });
  };

  $.fn.distpicker.Constructor = Distpicker;
  $.fn.distpicker.setDefaults = Distpicker.setDefaults;

  // No conflict
  $.fn.distpicker.noConflict = function () {
    $.fn.distpicker = Distpicker.other;
  };

  $(function () {
    $('[data-toggle="distpicker"]').distpicker();
  });
});
