// 获得表格所需的数据
$("#content_ana_2 .dropdown ul").find('li').click(function(event) {
    /* Act on the event */
    var $table_list = $("#ana_2_table tbody");
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
        url: '../php/ana_2_php/ajax.php',
        type: 'POST',
        dataType: 'json',
        data: "flag="+flag,
        success:function(data){
            console.log(data);
            $.each(data, function(index, array) {  
            var txt = "<tr>"+"<td>"+array["code"]+"</td>"+
                      "<td>"+array["name"]+"</td>"+
                      "<td>"+array["amount"]+"</td>"+
                      "<td>"+array["rate1"]+"</td>"+
                      "<td>"+array["rate2"]+"</td>"+
                      "<td>"+array["total"]+"</td>"+
                      "<td>"+array["rate3"]+"</td>"+
                      "<td>"+array["rate4"]+"</td>"+
                      "<td>"+array["per"]+"</td>"+
                      "<td>"+array["rate5"]+"</td>"+
                      "<td>"+array["rate6"]+"</td>"+
                      "</tr>"; 
            $table_list.append(txt);
            });  
        }
    })
    
});


//导出excel
$('#import_excel_2').click(function(){  
    $("#ana_2_table").table2excel({  
        exclude: ".noExl",  
        name: "Excel Document Name",  
        filename: "医疗机构医保金额统计分析",  
        exclude_img: true,  
        exclude_links: true,  
        exclude_inputs: true  
    });  
}) 



// 根据表格任意字段排序
$("#ana_2_table tr:first").find('th').click(function(event) {
    /* Act on the event */
    if($("#ana_2_table").find('tr').length == 1){
        return;
    }

    var index = $("#ana_2_table tr:first>th").index($(this));
    console.log(index);
    var arr_row = [];
    var arr_td = [];
    $("#ana_2_table tr:gt(0)").each(function(index, el) {;
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

    var $table_list = $("#ana_2_table tbody");
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
                      "<td>"+array["9"]+"</td>"+
                      "<td>"+array["10"]+"</td>"+
                      "</tr>"; 
        $table_list.append(txt);      
    });
});
