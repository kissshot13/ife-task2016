/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
// var dat = new Date("2016-01-01");
// dat.setDate(dat.getDate() + 32);
// console.log(dat);
var wrap = document.getElementById('aqi-chart-wrap');
var cityselect = document.getElementById('city-select');
var maxwidth = window.innerHeight*0.8;

var colors = ['#ff3','#f96','#9c6','#6c6','#c9c','#033'];

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {
'2016-01-01':161,
'2016-01-02':85,
'2016-01-03':161,
'2016-01-04':85,
'2016-01-05':161,
'2016-01-06':85
};
var weekData = {};
var monthData = {};
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "beijing",
  nowGraTime: "day"
};
console.log(aqiSourceData);
// addcity();
function week() {
  for (var city in aqiSourceData)
  {
      var weekval = 0;
      var date = Object.keys(aqiSourceData[city]);
      var j = 0;
      var data = {};
      for (var i=0;i< date.length;i++)
      {
        weekval += aqiSourceData[city][date[i]];   
        if((i+1)%7===0)
        {
          data[j]=weekval;
          j++;
          weekval = 0;
        }
      }
      weekData[city] = data;
  }
}
week();
console.log(weekData);

function  addcity() {
  var option = '';
  for (var city in aqiSourceData)
  {
        option += "<option>"+city+"</option>";
  }
  cityselect.innerHTML = option;
}
// function 
/**
 * 渲染图表
 */
function renderChart() {

  var fieldset = document.createElement('fieldset');
  var legend = document.createElement('legend');
  legend.innerHTML = "城市:"+pageState['nowSelectCity'] + ":every"+pageState['nowGraTime']+"粒度";
  var len = Object.keys(chartData).length;
  var width = maxwidth/len;
  var span = '';
  for( var date in chartData)
  {
     var height = chartData[date];
     var bgcolor = colors[parseInt(Math.random()*6)];
     span += "<span class='columnar'"+"title= '时间："+date+"颗粒数:"+chartData[date]+"'"  
      + "style='width:"+width+"px"+";height:"+height+"px;background-color:"+bgcolor+";'></span>";
    
  }
  var sp = document.createElement('div');
  sp.innerHTML = span;
  fieldset.appendChild(legend);
  fieldset.appendChild(sp);
  wrap.appendChild(fieldset);
}
renderChart();
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();