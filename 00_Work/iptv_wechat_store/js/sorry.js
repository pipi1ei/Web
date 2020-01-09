onload = function () {
    initBuryPoint(false,"","");
    onEvent("FT02001",{"extend":"抱歉页打开"},"1","","");
    // console.log("运营商：" + localStorage.operatorValue);
    showTel();
};
/* 根据运营商更改联系电话*/
function showTel() {
    var tel = document.getElementById("tel");
    var province = localStorage.prvinceValue;
    var operator = localStorage.operatorValue;
    if (operator === "移动"){
        tel.innerHTML = "热线电话：10086";
    } else if (operator === "联通"){
        tel.innerHTML = "热线电话：10010";
    } else if (operator === "电信"){
        tel.innerHTML = "热线电话：10000";
    } else if (operator === "广电"){
        if (province === "广东"){
            tel.innerHTML = "热线电话：020-96956";
        } else {
            tel.innerHTML = "热线电话：96956";
        }
    }
}

function jumpTo() {
    onEvent("FT02002",{"extend":"抱歉页点击了解更多按钮"},"1","","");
    window.location.href = "page_video.html";
}
