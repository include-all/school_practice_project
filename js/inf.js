//textarea高度自适应
$(document).on("input propertychange", "textarea", function (e) {
    var target = e.target;
    //保存初始高度，之后需要重新设置一下初始高度，避免只能增高不能减低。           
        dh = $(target).attr('defaultHeight') || 0;
    if (!dh) {
        dh = target.clientHeight;
        $(target).attr('defaultHeight', dh);
    }
    

    //在高度减小时，先设置高度减少，然后clientHeight减少很多，然后scollhetght减少一点点，然后减少
    target.style.height = dh +'px';
    var clientHeight = target.clientHeight;
    var scrollHeight = target.scrollHeight;
    if (clientHeight !== scrollHeight) {
         target.style.height= scrollHeight + 10 + "px";
     }
});



// -------------------------------------------------------------------------
// 保存换行
function textareaTo(str){
    var reg=new RegExp("\n","g");
    
    str = str.replace(reg,"<br>");
    
    return str;
}



// ----------------------------------------------------------------------------



//ajax处理文章存储和显示
$(function() {  
    var inf_show = $("#inf_show");  
    $.getJSON("../php/inf_php/ajax.php", function(json) {  
        $.each(json, function(index, array) {  
            var txt = "<h3>" + array["article_title"] + "</h3>" + "<small>" + array["article_name"]+
                      "</small><small>" + array["article_time"] +"</small>" + "<blockquote>" + array["article_content"] + "</blockquote>" ;  
            inf_show.append(txt);  
        });  
    });  
   
});  



// 修改时间格式
function p(s) {
    return s < 10 ? '0' + s: s;
}


//添加文章
$("#add").click(function() {  
   var title = $("#article_title").val();  
   var txt = $("#article_content").val();  
   var inf_show = $("#inf_show");

   // =====================================
   var myDate = new Date();
   //获取当前年
   var year=myDate.getFullYear();
   //获取当前月
   var month=myDate.getMonth()+1;
   //获取当前日
   var date=myDate.getDate(); 
   var h=myDate.getHours();       //获取当前小时数(0-23)
   var m=myDate.getMinutes();     //获取当前分钟数(0-59)
   var s=myDate.getSeconds();   
   var now=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);

   var name = localStorage.getItem("name");

   // =====================================

   $.ajax({  
       type: "POST",  
       url: "../php/inf_php/add_inf.php",  
       data: "title=" + textareaTo(title) + "&txt=" + textareaTo(txt) + "&name=" + name + "&time=" + now,  
       success: function(msg) {  
           if (msg == 1) {  
               var str = "<h3>" + textareaTo(title) +"</h3>"+"<small>"+name+"</small><small>"+now+"</small>"+"<blockquote>" + textareaTo(txt) + "</blockquote>";  
               inf_show.append(str);  
               $("#message").show().html("发表成功！").fadeOut(1000);  
               $("#article_title").val(""); 
               $("#article_content").val(""); 

               $("textarea").css("height", dh +'px');
           } else {  
               $("#message").show().html(msg).fadeOut(10111000); 
           }  
        }  
    });  
});  


//编辑按钮
$("#edit").click(function(){
    $("#edit_content").toggleClass("delete_content");
});


//删除按钮
$("#delete").click(function(){
    var delete_title = $("#delete_title").val();
    var $inf_show = $("#inf_show");
    $.ajax({  
       type: "POST",  
       url: "../php/inf_php/delete.php",  
       data: "delete_title=" + delete_title,  
       success: function(msg) {  
           if (msg == 1) {
               //找到删除标题的那个元素h3，通过each()
               var $list = $("#inf_show>h3");
               $list.each(function(index, el) {
                
                  if ($(el).text() === delete_title) {
                    $(el).next("small").remove();
                    $(el).next("small").remove();
                    $(el).next("blockquote").remove();
                    $(el).remove();
                  }
               });

               $("#tips").show().html("删除成功！").fadeOut(1000);  
               $("#delete_title").val(""); 
               // window.location.reload(); 
           } else {  
               $("#tips").show().html(msg).fadeOut(1000);
           }  
        }  
    });  
});