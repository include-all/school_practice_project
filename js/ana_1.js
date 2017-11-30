//导出excel
$(function(){
	$("#ana_1_table").tableExport({formats:["xlsx"]});
})



//获得柱状图所需的数据
var $list = $("#ana_1_table tbody tr");
var arr = []; 
$list.each(function(index, el) {
	arr.push($(el).children("td:eq(2)").text());
});



var item = {};
arr.sort(function(x,y){return x - y;});
for(var i = 0; i < arr.length; i +=1){
    var key = arr[i], obj = {};
    
    if(item[key]){
        item[key].count++;
    }else{
        obj.value = arr[i];
        obj.count = arr[i] == arr[i+1]? 2: 1;
        item[key] = obj;
    }
    if(arr[i] == arr[i+1]){
        arr.splice(i+1,1);
    }
}


var data_name = [];
var data_count = [];
for (let i in item) {
	data_name.push(i);
	data_count.push(item[i].count);
}
console.log(data_name);
console.log(data_count);



// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('ana_1_chart'));

// 指定图表的配置项和数据
var option = {
    title: {
        text: '违规原因统计分析柱状图'
    },
    tooltip: {},
    legend: {
        data:['个数']
    },
    xAxis: {
        data: data_name
    },
    yAxis: {},
    series: [{
        name: '个数',
        type: 'bar',
        data: data_count
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);