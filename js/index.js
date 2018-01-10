//index.js



//一进入就会触发的函数
$(function(){
  var name = localStorage.getItem("name");
  $("#navbar>ul>li:eq(1)>a").text(name);
  if(name != "manager"){
    $("#content_manage").html("<hr><h1>非管理员不得进入用户管理</h1>");
    // 如果不是管理员，不得删除信息
    $("#edit").hide();
  }

  $("#navbar>ul>li:eq(3)>a").click(function(event) {
    /* Act on the event */
    window.location.href='../html/login.html';
  });
});







//左侧菜单栏统计分析的下拉菜单
$("#menu_ana").click(function(event){

    /*切换折叠指示图标*/
    $(this).find("span:last").toggleClass("glyphicon-chevron-down");
    $(this).find("span:last").toggleClass("glyphicon-chevron-up");
    $(this).next("#down_menu").toggleClass('change_display');

 });


 //顶部标签页点击切换
$(".main .nav-tabs").find("li").click(function(event){

  $(this).addClass("active")
  .siblings('li').removeClass("active");

  var index = $(".tab_ul li").index(this);
  $(".main>#content>div").eq(index).show()
  .siblings("div").hide();

});


 //标签页的关闭
$(".main").find("span").click(function(event) {

  var $tab_li = $(this).parent().parent("li");
  $tab_li.hide();
  
  if($tab_li.hasClass('active')){
    $tab_li.removeClass("active");
    var $tab_li_left = $tab_li.prev();
    
    //display是css样式，不能用attr()方法，只能用css()
    while($tab_li_left.css('display') == "none"){
      $tab_li_left = $tab_li_left.prev();
    }

    $tab_li_left.addClass('active');
    var index = $(".tab_ul li").index($tab_li_left);
    $(".main>#content>div").eq(index).show()
    .siblings("div").hide();
  }

  //阻止事件冒泡很关键，不然会触发切换标签栏的点击事件
  event.stopPropagation();

});


 //点击左侧出现标签页
$(".sidebar").find('li[data-index]').click(function(event) {

   var index = $(".sidebar li[data-index]").index(this);
    
   $(".tab_ul li").eq(index).show().addClass('active')
   .siblings('li').removeClass('active');

   $(".main>#content>div").eq(index).show()
   .siblings("div").hide();

});



 // 点击加号出现模态框，添加或删除自定义导航栏
$("#add_my_nav").click(function(event) {
   /* Act on the event */
   $('#myModal').modal({
     keyboard: true
   })

});



// 首页管理的js代码，主要操作每个用户的flag1和flag2两个数据

//首先ajax函数，在一开始的时候加载不同的首页
$(function() {  
    var user_name = localStorage.getItem("name"); 
    $.ajax({  
       type: "POST",  
       url: "../php/label_manage_php/ajax.php",  
       data: "user_name=" + textareaTo(user_name),  
       success: function(array) {  
          var arr = JSON.parse(array);
          var flag1 = arr[0]["flag1"];   
          var flag2 = arr[0]["flag2"];  
          if(flag1 == 1){
            $("#nav_ana_1").show();
          }
          if(flag2 == 1){
            $("#nav_ana_2").show();
          }
        }  
    });  
   
});

//增加首页管理标签
$("#modal_add").click(function(event) {
  /* Act on the event */
  var name = localStorage.getItem("name"); 
  var $list = $("#myModal .modal-body input");
  var flag1 = 0;
  var flag2 = 0;
  if($list[0].checked){
    flag1 = 1;
    $list[0].checked = false;
  }

  if($list[1].checked){
    flag2 = 1;
    $list[1].checked = false;
  }

  $.ajax({  
       type: "POST",  
       url: "../php/label_manage_php/add_label.php",  
       data: "name=" + name + "&flag1=" + flag1 + "&flag2=" + flag2,  
       success: function(msg) { 
         if(msg == 1){ 
           if (flag1 == 1) {
            $("#nav_ana_1").show();
           }
           if (flag2 == 1) {
            $("#nav_ana_2").show();
           }
         }
      }
  });  
});


//删除首页管理标签
$("#modal_delete").click(function(event) {
  /* Act on the event */
  var name = localStorage.getItem("name"); 
  var $list = $("#myModal .modal-body input");
  var flag1 = 1;
  var flag2 = 1;
  if($list[0].checked){
    flag1 = 0;
    $list[0].checked = false;
  }

  if($list[1].checked){
    flag2 = 0;
    $list[1].checked = false;
  }

  $.ajax({  
       type: "POST",  
       url: "../php/label_manage_php/delete_label.php",  
       data: "name=" + name + "&flag1=" + flag1 + "&flag2=" + flag2,  
       success: function(msg) { 
         if(msg == 1){ 
           if (flag1 == 0) {
            $("#nav_ana_1").hide();
           }
           if (flag2 == 0) {
            $("#nav_ana_2").hide();
           }
         }
      }
  });  
});



// 两个标签的点击
$("#nav_ana_1").click(function(event) {
  /* Act on the event */    
   $(".tab_ul li").eq(1).show().addClass('active')
   .siblings('li').removeClass('active');

   $(".main>#content>div").eq(1).show()
   .siblings("div").hide();
});

$("#nav_ana_2").click(function(event) {
  /* Act on the event */    
   $(".tab_ul li").eq(2).show().addClass('active')
   .siblings('li').removeClass('active');

   $(".main>#content>div").eq(2).show()
   .siblings("div").hide();
});