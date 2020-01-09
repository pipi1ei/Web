onload = function () {
    setTimeout(delayLoad,2000);
};

function delayLoad() {
    var proviceValue =localStorage.prvinceValue;
    var operatorValue = localStorage.operatorValue;
    console.log("proviceValue = " + proviceValue + ";operatorValue = " + operatorValue);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            // 根据provinceValue 和 operatorValue 的值来判断是否有对应的网上商城，没有则到错误页面
            jumpToStore(this,proviceValue,operatorValue)
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
        //window.location.href = store;
        window.open(store);
        window.close();
    } else {
        //window.location.href = "page_sorry.html";
        window.open("page_sorry.html");
        window.close();
    }
}