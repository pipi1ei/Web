// 获取语音专区内容
var AI_LIVINGROOM_CONTENT_URL = "http://iptv-test.ihou.com:5053/demo/IPTV-Interfaces-plus/aiArea/queryData";

// AI客厅地址
var BASE_URL = "http://172.31.4.31/H5/dev/AI_LivingRoom";

var BASE_IMG_URL = "http://182.92.245.103:9080/province-admin-ddxt1.6-xw/resources/upload/AI/";
// 嘟嘟学堂BASE_URL地址
var DDXT_BASE_URL = "http://10.1.171.56:8082/hd/";
var DDXT_IMG_BASE_URL = "http://36.7.172.18:5011/province-admin-ddxt1.6/";

// 获取鉴权token地址
var getTokenUrl = "http://iptv-test.ihou.com:5053/demo/IPTV-Auth/v1/openAuth";

var getOpenValid = "http://iptv-test.ihou.com:5053/demo/IPTV-Auth/v1/openAuth";

// AI客厅一级菜单跳转到第三方应用时，AI客厅在后台停留时间，默认1分钟
var getWebBackgroundLiveMillis = 0;

var DATA_CACHE_TIME = 30 * 60 * 1000;

var ENABLE_ANIMATE_SCROLL = true;

var HELP_NEXT_KEYWORDS = [
    ['声音大一点', '中央一套', '我要看周星驰的电影', '声音小一点', '快进1分钟', '快退1分钟', '暂停', '播放', '昨天的新闻联播', '从第20分钟开始播放', '我要看奥特曼'],
    ['周星驰的电影', '古装宫斗剧', '最新上线影视', '我想听陈奕迅的歌', '宝贝爱看动画片', '跑男最新一期', '我要看奥特曼'],
    ['我要和超级飞侠环游世界', '我要玩语音斗地主', '10分钟后提醒我做法', '打开星座运势', '1美元等于多少人民币', '打开看图猜成语', '我要看奥特曼']
];

var GAME_LIST = ["看图猜成语", "垃圾分类大作战", "尖叫大冒险", "姆姆跳跳", "Parkou", "Rolling", "奇妙南瓜夜", "识字打地鼠", "数字拼图大挑战", "果园接水果", "欢乐海钓", {
    main: "声动情侠斗地主",
    alias: ["斗地主"]
}, "疯狂猜猜猜", "拆楼大作战", "球球向前冲", "海底总动员", "小兔过河", "马里奥蛋糕店", "全民捕鱼", "穿越火线", "节奏大师", "熊熊打靶", "熊熊钓鱼", "熊熊滑板", "垃圾分类大作战"];

var VIDEO_LIST = [
    "加菲猫第三季",
    "超级飞侠第二季",
    "大耳朵图图第五季",
    "up喵植物科普2",
    "百变布鲁可第三季",
    "百变动物盒",
    "钢铁飞龙2",
    "可可小爱公益剧2",
    "快乐摩登",
    "萌宝国学故事汇第一季",
    "萌鸡小学堂",
    "迷你特工队",
    "迷你特工队X",
    "睡衣小英雄",
    "小伴龙海洋百科",
    "小伴龙好习惯培养",
    "小伴龙快乐学英语",
    "小伴龙昆虫百科",
    "小伴龙识字",
    "小伴龙数学思维",
    "小鸡彩虹音乐MV第二季",
    "小猪佩奇第六季",
    "熊猫博士和托托",
    "亚历克斯的发现",
    "宇宙护卫队"
];