
//ajax处理文章存储和显示,在一打开网页时触法
$(function() {  
    var user_show = $("#content_manage>#user_inf");  
    $.getJSON("../php/user_manage_php/ajax.php", function(json) {  
        $.each(json, function(index, array) {  
            var txt = "<hr><p><span>用户名：</span><span>" + array["name"] + "</span><span>密码:</span><span>" + array["password"] + "</span>"+
            "<button type='button' class='btn btn-warning user_modify'>修改</button>"+
            "<button type='button' class='btn btn-success user_confirm'>确认修改</button>"+
            "<button type='button' class='btn btn-danger user_delete'>删除用户</button>"+"</p><hr>" ;  
            user_show.append(txt);  
        }); 
    });  
   
}); 


//添加用户
$("#content_manage>#user_add .user_add_button").click(function() {  
   var user_name = $("#add_user_name").val();  
   var user_password = $("#add_user_password").val();  
   var user_show = $("#user_inf");

   $.ajax({  
       type: "POST",  
       url: "../php/user_manage_php/add_user.php",  
       data: "user_name=" + textareaTo(user_name) + "&user_password=" + textareaTo(user_password),  
       success: function(msg) {  
           if (msg == 1) {  
               var str = "<hr><p><span>用户名：</span><span>" + textareaTo(user_name) + "</span><span>密码:</span><span>" + textareaTo(user_password) + "</span>"+
            	"<button type='button' class='btn btn-warning user_modify'>修改</button>"+
            	"<button type='button' class='btn btn-success user_confirm'>确认修改</button>"+
           		"<button type='button' class='btn btn-danger user_delete'>删除用户</button>"+"</p><hr>" ;   
               user_show.append(str);  
               $("#tip_message").show().html("增加成功").fadeOut(1000);  
               $("#add_user_name").val(""); 
               $("#add_user_password").val(""); 

           } else {  
               $("#tip_message").show().html(msg).fadeOut(1000); 
           }  
        }  
    });  
});



// 删除用户
$("#content_manage>#user_inf").on('click','.user_delete', function(event) {
	event.preventDefault();
	/* Act on the event */
	var delete_name = $(this).siblings('span:eq(1)').text();
	var $list = $(this);
	$.ajax({  
       type: "POST",  
       url: "../php/user_manage_php/delete_user.php",  
       data: "delete_name=" + delete_name,  
       success: function(msg) {  
           if (msg == 1) {
               //找到删除标题的那个元素h3，通过each()
               $list.parent("p").prev("hr").remove();
               $list.parent("p").next("hr").remove()
               $list.parent("p").remove();
               $("#tip_message").show().html("删除成功！").fadeOut(1000);  
               $("#delete_title").val(""); 
               // window.location.reload(); 
           } else {  
               $("#tip_message").show().html(msg).fadeOut(1000);
           }  
        }  
    });  
});

// 修改用户名或密码
$("#content_manage>#user_inf").on('click','.user_modify', function(event) {
	event.preventDefault();
	/* Act on the event */
	var $list = $(this);
	if($list.siblings('span').length == 4){
		if($list.parents("#user_inf").find('input').length !=0){
			return;
		}
		var $span_name = $list.siblings('span:eq(1)');
		var old_name = $span_name.text();
		var $span_password = $list.siblings('span:eq(3)');
		var old_password = $span_password.text();
		localStorage.setItem("old_name", old_name); 
		localStorage.setItem("old_password", old_password); 
		
		$span_name.after('<input class = \'form-control\'>');
		$span_name.next().val(old_name);
		$span_name.remove();

		$span_password.after('<input class = \'form-control\'>');
		$span_password.next().val(old_password);
		$span_password.remove()

		$list.next().show();

		$list.text('取消修改');
	}
	else{
		$list.next().hide();
		var $input_name = $list.siblings('input:eq(0)');
		var new_name = $input_name.val();
		var $input_password = $list.siblings('input:eq(1)');
		var new_password = $input_password.val();

		var old_name = localStorage.getItem("old_name");
		var old_password = localStorage.getItem("old_password");
		$input_name.before('<span>'+old_name+'<span>');
		$input_password.before('<span>'+old_password+'<span>');
		$input_name.remove();
		$input_password.remove();

		$list.next().hide();
		$list.text('修改');
	}

});

//确认修改按钮
$("#content_manage>#user_inf").on('click','.user_confirm', function(event) {
	event.preventDefault();
	/* Act on the event */
	var $list = $(this);
	var $input_name = $list.siblings('input:eq(0)');
	var new_name = $input_name.val();
	var $input_password = $list.siblings('input:eq(1)');
	var new_password = $input_password.val();
	var old_name = localStorage.getItem("old_name");

	if(new_name == ""||new_password == ""){
		 $("#tip_message").show().html("用户名或密码不可为空").fadeOut(1000); 
	}

	$.ajax({  
       type: "POST",  
       url: "../php/user_manage_php/modify_user.php",  
       data: "user_name=" + textareaTo(new_name) + "&user_password=" + textareaTo(new_password)+"&old_name="+textareaTo(old_name),  
       success: function(msg) {  
           if (msg == 1) {  
           	   $input_name.before('<span>'+new_name+'<span>');
			         $input_password.before('<span>'+new_password+'<span>');
			         $input_name.remove();
			         $input_password.remove();
	   
			         $list.next().hide();
			         $list.text('修改');
                console.log("1");
               $("#tip_message").show().html("修改成功").fadeOut(1000);  
            	

           } else {  
               $("#tip_message").show().html(msg).fadeOut(1000); 
           }
        }  
    });  

});