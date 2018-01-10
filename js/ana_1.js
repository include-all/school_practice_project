// 获得表格所需的数据
$("#content_ana_1 .dropdown ul").find('li').click(function(event) {
    /* Act on the event */
    var $table_list = $("#ana_1_table tbody");
    $table_list.html("");
    var month = $(this).find("a").text();
    console.log(month);
    var flag = null;
    if(month == "2017年10月"){
        flag = "201710";
    }

    if(month == "2017年8月") {
        flag = "201708";
    }
    console.log(flag);
    $.ajax({
        url: '../php/ana_1_php/ajax.php',
        type: 'POST',
        dataType: 'json',
        data: "flag="+flag,
        success:function(data){
            $.each(data, function(index, array) {  
            var txt = "<tr>"+"<td>"+array["code"]+"</td>"+
                      "<td>"+array["name"]+"</td>"+
                      "<td>"+array["reason"]+"</td>"+
                      "<td>"+array["count"]+"</td>"+
                      "<td>"+array["rate1"]+"</td>"+
                      "<td>"+array["rate2"]+"</td>"+
                      "<td>"+array["money"]+"</td>"+
                      "<td>"+array["rate3"]+"</td>"+
                      "<td>"+array["rate4"]+"</td>"+
                      "</tr>"; 
            $table_list.append(txt);
            });  
        }
    })
    
});


//导出excel
$('#import_excel').click(function(){  
    $("#ana_1_table").table2excel({  
        exclude: ".noExl",  
        name: "Excel Document Name",  
        filename: "违规原因统计分析",  
        exclude_img: true,  
        exclude_links: true,  
        exclude_inputs: true  
    });  
})  


//生成柱状图
$("#table_to_chart").click(function(event) {
    /* Act on the event */
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
            if(arr[i] == arr[i+1]){
            arr.splice(i+1,1);
            }
        }
        // if(arr[i] == arr[i+1]){
        //     arr.splice(i+1,1);
        // }
    }


    var data_name = [];
    var data_count = [];
    for (let i in item) {
        data_name.push(i);
        // data_count.push(item[i].count);
    }

    // =================test================================

    for(var i = 0;i < data_name.length; i++){
        data_count[i] = 0;
        $list.each(function(index, el) {
            if(data_name[i] == $(el).children('td:eq(2)').text()){
                data_count[i] +=  parseInt($(el).children('td:eq(3)').text());
            }
        });
    }



    // ===============================================


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
});



// 根据表格任意字段排序
$("#ana_1_table tr:first").find('th').click(function(event) {
    /* Act on the event */
    if($("#ana_1_table").find('tr').length == 1){
        return;
    }

    var index = $("#ana_1_table tr:first>th").index($(this));
    console.log(index);
    var arr_row = [];
    var arr_td = [];
    $("#ana_1_table tr:gt(0)").each(function(index, el) {;
        $(el).find("td").each(function(index1, el1) {
            arr_td.push($(el1).text());
        });
        arr_row.push(arr_td);
        arr_td = [];
    });


    arr_row.sort(function(x,y){
        var x1 = x[index];
        var y1 = y[index];

        if(!isNaN(parseFloat(x1))){
            x1 = parseFloat(x1);
        }
        if (!isNaN(parseFloat(y1))) {
            y1 = parseFloat(y1)
        }


        if(x1 < y1){
            return -1;
        }
        else if (x1 > y1) {
            return 1;
        }
        else {
            return 0;
        }
    });

    var $table_list = $("#ana_1_table tbody");
    $table_list.html("");
    $.each(arr_row,function(index, array) {
         var txt = "<tr>"+"<td>"+array["0"]+"</td>"+
                      "<td>"+array["1"]+"</td>"+
                      "<td>"+array["2"]+"</td>"+
                      "<td>"+array["3"]+"</td>"+
                      "<td>"+array["4"]+"</td>"+
                      "<td>"+array["5"]+"</td>"+
                      "<td>"+array["6"]+"</td>"+
                      "<td>"+array["7"]+"</td>"+
                      "<td>"+array["8"]+"</td>"+
                      "</tr>"; 
        $table_list.append(txt);      
    });
});
