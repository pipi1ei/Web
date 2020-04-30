//埋点
var iData = {
    //埋点是不是测试环境，dev:开发环境，test：测试环境，online：生产发布环境
    environment: 'dev',

    //idata的收集信息地址，配置到专网省份需要额外配置，需要配置的地址为：http://log.iflytek.com，公网省份地址不需要配置
    collectUrl: 'http://log.iflytek.com',

    //idata的收集信息地址，配置到专网省份需要额外配置，需要配置的地址为：http://logconf.iflytek.com/entry.js，公网省份地址不需要配置
    configUrl: 'https://logconf.iflytek.com',

    // 用于埋点的渠道号，在哪个渠道上线，就写相应的属性值
    // fujianMobile     福建移动    
    // anhuiMobile      安徽移动
    // shandongMobile   山东移动
    // yunnanMobile     云南移动
    // guangdongRadio   广东广电
    // zhejiangMobile   浙江移动
    buryChannel: 'anhuiMobile',

    // 埋点码对应的版本号，以在iData官网上配置的为准
    version: '1.0.0'
}