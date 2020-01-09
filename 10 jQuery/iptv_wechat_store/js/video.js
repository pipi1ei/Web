onload = function () {
    initBuryPoint(false,"","");
    onEvent("FT03001",{"extend":"了解更多页面打开"},"1","","");
};

function onVideoPlay() {
    onEvent("FT03002",{"extend":"播放视频"},"1","","");
}