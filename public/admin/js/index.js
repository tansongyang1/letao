$(function () {

  var echarts1 = echarts.init(document.querySelector('.echarts_1'));

  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '9102年注册人数'
    },
    tooltip: {},
    legend: {
      data: ['人数']
    },
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000, 1500, 4000, 1400, 1800, 3000]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts1.setOption(option);
  //饼状图
  var echarts2 = echarts.init(document.querySelector('.echarts_2'));
  option = {
    title: {
      text: '热门品牌销售',
      subtext: '9102年6月',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克', '阿迪达斯', '哈根达斯', '新百伦', 'GXG']
    },
    series: [{
      name: '品牌',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [{
          value: 335,
          name: '耐克'
        },
        {
          value: 310,
          name: '阿迪达斯'
        },
        {
          value: 234,
          name: '哈根达斯'
        },
        {
          value: 135,
          name: '新百伦'
        },
        {
          value: 1548,
          name: 'GXG'
        }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
  echarts2.setOption(option);
})