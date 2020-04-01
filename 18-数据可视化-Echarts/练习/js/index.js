window.onload = function () {
  initTime();
  initEcharts();
}

/* 初始化时间 */
function initTime() {
  var t = null;
  t = setTimeout(time, 1000);
  function time() {
    clearTimeout(t);
    var dt = new Date();
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var day = dt.getDate();
    var hour = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
    document.querySelector('.show-time').innerHTML = `当前时间：${year}年${month}月${day}日-${hour}时${minutes}分${seconds}秒`;
    t = setTimeout(time, 1000);
  }
}

function initEcharts() {
  // 初始化左边柱形图
  initLeftBar();
  // 初始化右边柱形图
  initRightBar();
  // 初始化左边折线图
  initLeftLine();

  function initLeftBar() {
    var leftBar = echarts.init(document.querySelector('.left-bar .chart'));
    var option = {
      // 柱状图颜色
      color: ['#2f89cf'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '0%',
        right: '0%',
        top: '10px',
        bottom: '4%',
        containLabel: true
      },
      // x轴设置
      xAxis: [
        {
          type: 'category',
          data: ['旅游行业', '教育行业', '游戏行业', '医疗行业', '电商行业', '社交行业', '金融行业'],
          // x 轴刻度设置
          axisTick: {
            alignWithLabel: true,
          },
          // 坐标轴刻度标签的相关设置
          axisLabel: {
            color: 'rgba(255,255,255, .6)',
            fontSize: 12,
            interval: 0
          },
          // x 轴的线没设置
          axisLine: {
            show: false
          }
        }
      ],
      // y 轴设置
      yAxis: [
        {
          type: 'value',
          // 坐标轴刻度标签的相关设置
          axisLabel: {
            color: 'rgba(255,255,255, .6)',
            fontSize: 12
          },
          // y 轴线设置
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255, .1)'
            }
          },
          // 分割线设置
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255, .1)'
            }
          }
        }
      ],
      series: [
        {
          name: '从业人员',
          type: 'bar',
          barWidth: '35%',
          data: [200, 300, 300, 900, 1500, 1200, 600],
          itemStyle: {
            barBorderRadius: 5
          }
        }
      ]
    };
    leftBar.setOption(option);
    window.addEventListener('resize', function () {
      leftBar.resize();
    })
  }

  function initLeftLine() {
    var yearData = [
      {
        year: '2019',
        data: [
          [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
          [40, 64, 191, 234, 290, 330, 310, 213, 180, 200, 79, 180]
        ]
      },
      {
        year: '2020',
        data: [
          [123, 175, 112, 191, 127, 61, 98, 21, 43, 64, 76, 38],
          [143,131,165,123,178,21,82,64,43,60,19,34]
        ]
      }
    ]
    var leftLine = echarts.init(document.querySelector('.left-line .chart'));
    var option = {
      color: ['#00f2f1', '#ed3f35'],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        textStyle: {
          color: '#4c9bfd'
        },
        right: '10%'
      },
      grid: {
        left: '3%',
        right: '4%',
        top: '20%',
        bottom: '3%',
        show: true,  // 显示边框
        borderColor: '#012f4a',  //边框颜色
        containLabel: true  //包含刻度文字在内
      },
      xAxis: {
        type: 'category',
        boundaryGap: false, // 去除轴内间距
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月'],
        axisLine: {
          show: false
        },
        // 刻度去除
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#4c9bfd',
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        // 刻度去除
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#4c9bfd',
        },
        splitLine: {
          lineStyle: {
            color: '#012f4a'
          }
        }
      },
      series: [
        {
          name: '新增粉丝',
          type: 'line',
          // 让折线带有弧度
          smooth: true,
          data: yearData[0].data[0]
        },
        {
          name: '新增游客',
          type: 'line',
          smooth: true,
          data: yearData[0].data[1]
        }
      ]
    };

    leftLine.setOption(option);
    window.addEventListener('resize', function () {
      leftLine.resize();
    });

    // 点击切换效果
    $('.left-line h2').on('click', 'a', function () {  
      $(this).addClass('active').siblings().removeClass('active');
      var currentData = yearData[$(this).index()];
      option.series[0].data = currentData.data[0];
      option.series[1].data = currentData.data[1];
      leftLine.setOption(option); 
    })
  }

  function initRightBar() {
    // 第一组柱子的颜色
    var colorList = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6',]
    var rightBar = echarts.init(document.querySelector('.right-bar .chart'));
    option = {
      grid: {
        left: '22%',
        top: '10%',
        bottom: '10%',
        // containLabel: true
      },
      xAxis: {
        show: false
      },
      yAxis: [
        // y轴第一组数据
        {
          type: 'category',
          data: ['NODE', 'VUE', 'JavaScript', 'CSS3', 'HTML5'],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#fff'
          }
        },
        // y轴第二组数据
        {
          show: true,
          data: [644, 793, 610, 350, 702],
          // 不显示y轴线
          axisLine: {
            show: false
          },
          // 不显示刻度
          axisTick: {
            show: false
          },
          // 刻度标签样式
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: '#fff'
            }
          }
        }
      ],
      series: [
        {
          name: '条',
          type: 'bar',
          barWidth: 10,
          // 设置柱子之间的距离
          barCategoryGap: 50,
          data: [69, 78, 60, 34, 70],
          itemStyle: {
            barBorderRadius: 20,
            color: function (params) {
              // params 是柱子对象
              return colorList[params.dataIndex];
            }
          },
          // 显示柱子内的文字
          label: {
            show: true,
            position: 'inside',
            // {c} 会自动的解析为数据 data 里面的值
            formatter: '{c}%'
          },
          yAxisIndex: 0
        },
        {
          name: '框',
          type: 'bar',
          barWidth: 15,
          barCategoryGap: 50,
          data: [100, 100, 100, 100, 100],
          itemStyle: {
            color: 'none',
            borderColor: '#00c1de',
            borderWidth: 3,
            barBorderRadius: 15
          },
          yAxisIndex: 1
        }
      ]
    };
    rightBar.setOption(option);
    window.addEventListener('resize', function () {
      rightBar.resize();
    })
  }


}