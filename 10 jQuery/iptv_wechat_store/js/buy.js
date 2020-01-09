/**
 * HTML文档加载完成，给省份和运营商的下拉框添加数据
 */
onload = function () {
    // 初始化埋点
    initBuryPoint(false,"","","");

    doAjaxRequest("xml/pro_oper.xml",getProvince);
    // document.getElementById("operator").innerHTML = "<optgroup label='选择宽带所属运营商'></optgroup>\n" +
    //     "<option disabled selected hidden>选择宽带所属运营商</option>";
    document.getElementById("operator").innerHTML = "<option disabled selected>选择宽带所属运营商</option>";
    /* 设置购买遥控器按钮不可用*/
    document.getElementById("button").setAttribute("disabled","true");

    

   /**取浏览器的url地址，判断是否是从其他页面返回的 */
    var source = findParamInUrl("source");
    onEvent("FT01001",{"extend":"购买页打开"},1,"",{"source":source});
    if(source != 'back'){
        var player = new SVGA.Player('#animate');
        player.setContentMode("AspectFit");
        var parser = new SVGA.Parser('#animate');
        const svgUrl = 'svga/launch.svga';
        parser.load(svgUrl, function(videoItem) {
            player.loops = 1;
            player.setVideoItem(videoItem);
            player.startAnimation();
            // 原svga动画大小为1080*1920，导致屏幕宽高小于该值时会出现空白，
            // 当动画大小超过div的边界时使用该方法进行裁剪，去除空白部分
            player.setClipsToBounds(true);
        });
        player.onFinished(function () {
            document.getElementById("animate").style.display = "none";
            document.getElementById("background").style.display = "block";
            onEvent("FT01002",{"extend":"启动页动画消失"},"1","","");
        });
    }else{
        document.getElementById("animate").style.display = "none";
        document.getElementById("background").style.display = "block";
    }
    
    forbbidenBack();

};

/**
 * ajax请求
 * @param url 请求的url
 * @param getData 请求成功后调用的方法
 */
function doAjaxRequest(url,getData) {
    var xhttp;
    if (window.XMLHttpRequest){
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            getData(this);
        }
    };
    xhttp.open("GET",url,true);
    xhttp.send();
}

/**
 * 获取省份信息
 * @param xhttp XMLHttpRequest对象
 */
function getProvince(xhttp) {
    var province = document.getElementById("province");
    var provinceItem = "<option selected disabled>选择宽带所属省份</option>";
    // var provinceItem = "<optgroup label='选择宽带所属省份'></optgroup>" +
    //     "<option selected='disabled' hidden>选择宽带所属省份</option>";
    var xmlDoc = xhttp.responseXML;
    var i;
    var elements = xmlDoc.getElementsByTagName("province");
    for (i = 0; i < elements.length; i++){
        provinceItem += "<option>" +
            elements[i].childNodes[0].nodeValue + "</option>";
    }
    province.innerHTML = provinceItem;
}

/**
 * 当下拉框中的值改变时执行该方法
 * @param value
 * @param url
 * @param onChange
 */
function change(value,url,onChange) {
    var btn_buy = document.getElementById("button");

    var xhttp;
    if (window.XMLHttpRequest){
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            onChange(this,value);
            if (judgeButtonAvailable()){
                btn_buy.removeAttribute("disabled");
                btn_buy.style.opacity = "1";
            }else {
                btn_buy.setAttribute("disabled","true");
                btn_buy.style.opacity = "0.5";
            }
        }
    };
    xhttp.open("GET",url,true);
    xhttp.send();
}

/**
 * 根据省份信息显示对应的运营商
 * @param xhttp XMLHttpRequest对象
 * @param value 省份
 */
function onProvinceChange(xhttp,value) {
    var xmlDoc = xhttp.responseXML;
    var element_operator = document.getElementById("operator");
    var value_operator = element_operator.value;

    // 获取pro_oper.xml文档中channel节点元素集合
    var channels = xmlDoc.getElementsByTagName("channel");
    var i;
    for (i = 0; i < channels.length; i++){
        // 获取每个channel节点的province子节点的值
        var province = channels[i].getElementsByTagName("province")[0]
            .childNodes[0].nodeValue;
        console.log("xml文档中的'province'节点值为：" + province);
        // 如果prvince值等于传过来的省份的值，则取出该省份对应的运营商的值并添加到运营商下拉框中
        if (value === province){
            var operators = channels[i].getElementsByTagName("operator")[0]
                .childNodes[0].nodeValue;
            console.log(province + "省对应的运营商为：" + operators);
            var operatorItems = operators.split("|");
            var operatorItem = "";
            if (operatorItems.length === 1){
                operatorItem = "<option>" + operatorItems[0] + "</option>";
            } else {
                var j;
                /*operatorItem = "<optgroup label='选择宽带所属运营商'></optgroup>" +
                    "<option disabled selected hidden>选择宽带所属运营商</option>";*/
                operatorItem = "<option disabled selected>选择宽带所属运营商</option>";

                for (j = 0; j < operatorItems.length; j++){
                    operatorItem += "<option>" + operatorItems[j] + "</option>";

                }
            }
            element_operator.innerHTML = operatorItem;
            break;
        }
    }
}

/**
 * 运营商的值变化是，设置按钮是否可用
 * */
function operatorChanged() {
    var btn_buy = document.getElementById("button");
    if (judgeButtonAvailable()){
        btn_buy.removeAttribute("disabled");
        btn_buy.style.opacity = "1";
    }else {
        btn_buy.setAttribute("disabled","true");
        btn_buy.style.opacity = "0.5";
    }
}

/**
 * 判断按钮是否可用
 */
function judgeButtonAvailable() {
    var element_province = document.getElementById("province");
    var element_operator = document.getElementById("operator");
    var proviceValue =element_province.value;
    var operatorValue = element_operator.value;
    console.log("proviceValue = " + proviceValue + ";operatorValue = " + operatorValue);
    if (proviceValue !== undefined && proviceValue != null && proviceValue !== "选择宽带所属省份"
        && operatorValue !== undefined && operatorValue != null && operatorValue !== "选择宽带所属运营商"){
        return true;
    }
    return false;

}

/**
 * 点击按钮事件，显示遮罩层，ajax请求获取商城
 */
function clickButton() {
    var element_province = document.getElementById("province");
    var element_operator = document.getElementById("operator");
    var provinceValue =element_province.value;
    var operatorValue = element_operator.value;
    localStorage.prvinceValue = provinceValue;
    localStorage.operatorValue = operatorValue;

    //IFlyCollector.onEvent('click_buy',{"province":provinceValue,"operator":operatorValue},1,2);
    onEvent("FT01003",{"extend":"点击购买按钮"},"1","",{"province":provinceValue,"operator":operatorValue});

    var element_cover = document.getElementById("cover");
    element_cover.style.display = "block";
    setTimeout(delayLoad,2000);

}

function delayLoad() {
    var element_province = document.getElementById("province");
    var element_operator = document.getElementById("operator");
    var proviceValue =element_province.value;
    var operatorValue = element_operator.value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            // 根据provinceValue 和 operatorValue 的值来判断是否有对应的网上商城，没有则到错误页面
            jumpToStore(this,proviceValue,operatorValue)
            document.getElementById("cover").style.display = "none";
        }
    };
    xhttp.open("GET","xml/store.xml",true);
    xhttp.send();
}

function jumpToStore(xml,proviceValue,operatorValue) {
    var xmlDoc = xml.responseXML;
    var channels = xmlDoc.getElementsByTagName("channel");
    var i;
    var store = "";
    for (i = 0; i < channels.length; i++) {
        // 获取每个channel节点的operator节点的值
        var province = channels[i].getElementsByTagName("province")[0]
            .childNodes[0].nodeValue;
        var operator = channels[i].getElementsByTagName("operator")[0]
            .childNodes[0].nodeValue;
        if (proviceValue === province && operatorValue === operator){
            store = channels[i].getElementsByTagName("store")[0]
                .childNodes[0].nodeValue;
        }
    }
    console.log("store = " + store);
    if (store !== ""){
        window.location.href = store;
        onEvent("FT01004",{"extend":"跳转到线上商城"},"1","","");
        // window.open(store);
        //window.history.back(-1);
    } else {
        window.location.href = "page_sorry.html";
        // window.open("page_sorry.html");
    }
}

function findParamInUrl(name) {
    var param,value;
    var str=location.href; //取得整个地址栏
    var num=str.indexOf("?")
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

    var arr=str.split("&"); //各个参数放到数组里
    for(var i=0;i < arr.length;i++){
        num=arr[i].indexOf("=");
        if(num>0){
            param=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            if(param == name){
                console.log("source="+value);
                return value;
            }
        }
    }
   
    return "";
}

/**
 * 禁止页面返回
 */
function forbbidenBack(){
    pushHistory();
    window.addEventListener("popstate", function(e) {
        // alert("捕获成功");
        this.history.go(0);
    });
}

/**
 * 设置页面的历史记录
 */
function pushHistory() {
    var state = {
        title: "myCenter",
        url: "#"
    };
    window.history.pushState(state, state.title, state.url);
}